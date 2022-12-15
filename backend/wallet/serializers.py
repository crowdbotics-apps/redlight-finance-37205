from django.contrib.auth import get_user_model
from django.http import HttpRequest
from django.utils.translation import ugettext_lazy as _
from users.models import Wallet
from wallet.wallet_utils import WalletMixin
from home.api.v1.serializers import UserSerializer
from rest_framework import serializers
from re import match

class WalletQRCodeSerializer(serializers.ModelSerializer):
    """Serializer for Wallet QR Code Screen"""
    user = UserSerializer(read_only=True)
    wallet_address = serializers.SerializerMethodField()

    class Meta:
        model = Wallet
        fields = ('subwallet_name', 'wallet_address', 'user', 'id')

    def get_wallet_address(self, obj):
        address = WalletMixin.get_wallet_address(obj.private_key)
        return address


class WalletSerializer(serializers.ModelSerializer):
    """Serializer for Wallets information associated with currently logged in user"""
    wallet_address = serializers.SerializerMethodField()

    class Meta:
        model = Wallet
        fields = ('id', 'subwallet_name',
                  'amount', 'is_default', 'currency', 'user', 'wallet_address',)
        extra_kwargs = {
            'amount': {
                'required': True
            },
            'subwallet_name': {
                'required': True
            },
            'is_default': {
                'required': True
            },
            'user': {
                'required': False,
                'read_only': True
            }
        }

    def _get_request(self):
        request = self.context.get('request')
        if request and not isinstance(request, HttpRequest) and hasattr(request, '_request'):
            request = request._request
        return request

    def get_wallet_address(self, obj):
        address = WalletMixin.get_wallet_address(obj.private_key)
        return address

    def create(self, validated_data):
        request = self._get_request()
        if validated_data.get('is_default', None) is not None and validated_data.get('is_default') == True:
            Wallet.objects.filter(
                user=request.user, is_default=True).update(is_default=False)
        wallet = Wallet(**validated_data)
        wallet.user = request.user
        wallet.private_key = WalletMixin.get_wallet_private_key()
        wallet.save()
        return wallet

    def _update_wallet_is_default(self):
        """To set is_default=True for the very first wallet only if all the other wallets are not set as default"""
        request = self._get_request()
        update_wallet = Wallet.objects.filter(user=request.user).order_by(
            'created_at').first()
        update_wallet.is_default = True
        update_wallet.save()

    def update(self, instance, validated_data):
        request = self._get_request()
        # there can only be one default wallet
        # if user updates the wallet (is_default) to True, then update all the other wallets (is_default) to False
        if validated_data.get('is_default', None) is not None and validated_data.get('is_default'):
            Wallet.objects.filter(
                user=request.user, is_default=True).update(is_default=False)
        # if the user is updating the current default wallet to False, then update the very first wallet (is_default) to True
        if validated_data.get('is_default', None) is not None and not validated_data.get('is_default') and instance.is_default:
            # then fetching the very first wallet and setting the is_default to True
            self._update_wallet_is_default()
        instance.subwallet_name = validated_data.get(
            'subwallet_name', instance.subwallet_name)
        instance.amount = validated_data.get('amount', instance.amount)
        instance.is_default = validated_data.get(
            'is_default', instance.is_default)
        instance.currency = validated_data.get('currency', instance.currency)
        instance.save()
        if Wallet.objects.filter(user=request.user, is_default=True).count() == 0:
            self._update_wallet_is_default()
        return instance


class WalletSendTokenSerializer(serializers.Serializer):
    receiver_address = serializers.CharField(required=True)
    transaction_amount = serializers.DecimalField(required=True, max_digits=19, decimal_places=10)

    def validate_receiver_address(self, receiver_address):
        if match('^0x[a-fA-F0-9]{40}$', receiver_address):
            return receiver_address
        raise serializers.ValidationError('Address is not valid')

    
        