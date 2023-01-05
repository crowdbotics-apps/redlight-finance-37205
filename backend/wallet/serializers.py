from django.contrib.auth import get_user_model
from django.http import HttpRequest
from django.utils.translation import ugettext_lazy as _
from users.models import Wallet, Transaction
from wallet.wallet_utils import WalletMixin
from home.api.v1.serializers import UserSerializer
from rest_framework import serializers
from re import match
from home.constants import FIAT, BLOCKCHAIN
from django.core.exceptions import ObjectDoesNotExist


class WalletQRCodeSerializer(serializers.ModelSerializer):
    """Serializer for Wallet QR Code Screen"""
    user = UserSerializer(read_only=True)

    class Meta:
        model = Wallet
        fields = ('wallet_name', 'public_address',
                  'user', 'id', 'wallet_balance',)


class WalletSerializer(serializers.ModelSerializer):
    """Serializer for Wallets information associated with currently logged in user"""

    class Meta:
        model = Wallet
        fields = ('id', 'wallet_name',
                  'wallet_balance', 'is_default', 'currency', 'user', 'public_address', 'wallet_type', 'is_subwallet')
        extra_kwargs = {
            'wallet_balance': {
                'required': False,
                'read_only': True
            },
            'wallet_name': {
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

    def create(self, validated_data):
        request = self._get_request()
        if validated_data.get('is_default', None) is not None and validated_data.get('is_default') == True:
            Wallet.objects.filter(
                user=request.user, is_default=True).update(is_default=False)
        wallet = Wallet(**validated_data)
        wallet.user = request.user
        private_key = WalletMixin.get_wallet_private_key()
        wallet.private_key = private_key
        wallet.public_address = WalletMixin.get_wallet_address(
            private_key=private_key).get('ethereum')
        wallet.is_subwallet = True
        wallet.save()
        return wallet

    def _update_wallet_is_default(self):
        """To set is_default=True for the very first wallet only if all the other wallets are not set as default"""
        request = self._get_request()
        update_wallet = Wallet.objects.filter(user=request.user, wallet_type=FIAT).order_by(
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
        instance.wallet_name = validated_data.get(
            'wallet_name', instance.wallet_name)
        instance.is_default = validated_data.get(
            'is_default', instance.is_default)
        instance.currency = validated_data.get('currency', instance.currency)
        instance.save()
        if Wallet.objects.filter(user=request.user, is_default=True).count() == 0:
            self._update_wallet_is_default()
        return instance


class WalletSendTokenSerializer(serializers.Serializer):
    """
    Serializer for Send Tokens on Blockchain
    outside App Level (currently supporting only REDLC)
    """
    receiver_address = serializers.CharField(required=True)
    transaction_amount = serializers.DecimalField(
        required=True, max_digits=19, decimal_places=10)

    def validate_receiver_address(self, receiver_address):
        if match('^0x[a-fA-F0-9]{40}$', receiver_address):
            return receiver_address
        raise serializers.ValidationError('Address is not valid')


class SendCreditSerializer(serializers.Serializer):
    """
    Send Credit between users registered on APP
    APP level exchange of Credits between Blockchain and FIAT wallets
    """
    receiver_address = serializers.CharField(required=True)
    transaction_amount = serializers.DecimalField(
        required=True, max_digits=19, decimal_places=10)
    wallet_id = serializers.IntegerField(required=True)
    wallet_type = serializers.IntegerField(required=True)

    def validate_receiver_address(self, receiver_address):
        if match('^0x[a-fA-F0-9]{40}$', receiver_address) or match('^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}$', receiver_address):
            return receiver_address
        raise serializers.ValidationError('Address is not valid')

    def validate(self, attrs):
        wallet_id = attrs.get('wallet_id', None)
        receiver_address = attrs.get('receiver_address', None)
        user = self.context['request'].user
        transaction_amount = attrs.get('transaction_amount', None)
        wallet_type = attrs.get('wallet_type', None)
        try:
            wallet = Wallet.objects.get(
                pk=wallet_id, user=user, wallet_type=wallet_type)
        except ObjectDoesNotExist:
            raise serializers.ValidationError('Invalid wallet parameters')
        if wallet.public_address == receiver_address:
            raise serializers.ValidationError(
                'sender and receiver can\'t be same.')
        if wallet.wallet_balance < transaction_amount:
            raise serializers.ValidationError('Insufficient funds')
        return attrs

    def create(self, validated_data):
        receiver_address = validated_data.get('receiver_address', None)
        transaction_amount = validated_data.get('transaction_amount', None)
        wallet_type = validated_data.get('wallet_type', None)
        wallet_id = validated_data.get('wallet_id', None)
        try:
            crypto_type = None
            sender_wallet = Wallet.objects.get(
                pk=wallet_id, wallet_type=wallet_type)
            if wallet_type == BLOCKCHAIN:
                crypto_type = sender_wallet.crypto_type
            receiver_wallet = Wallet.objects.get(
                public_address=receiver_address, wallet_type=wallet_type, crypto_type=crypto_type)
        except ObjectDoesNotExist:
            raise serializers.ValidationError('Invalid wallet parameters')
        sender_wallet.wallet_balance -= transaction_amount
        receiver_wallet.wallet_balance += transaction_amount
        sender_wallet.save()
        receiver_wallet.save()
        transaction = Transaction(receiver=receiver_wallet.user, wallet=sender_wallet, sender=sender_wallet.user,
                                  transaction_amount=transaction_amount, remaining_balance=sender_wallet.wallet_balance)
        transaction.save()
        return transaction


class TransactionSerializer(serializers.ModelSerializer):
    """Serializer for Transactions"""
    sender_name = serializers.ReadOnlyField(source='sender.name')
    receiver_name = serializers.ReadOnlyField(source='receiver.name')
    wallet_type = serializers.ReadOnlyField(source='wallet.wallet_type')

    class Meta:
        model = Transaction
        exclude = ('sender', 'receiver',)


class MoveCreditSerializer(serializers.Serializer):
    """Serializer for MoveCredit between same user different FIAT wallets"""
    send_wallet_id = serializers.IntegerField(required=True)
    receive_wallet_id = serializers.IntegerField(required=True)
    transaction_amount = serializers.DecimalField(
        required=True, max_digits=19, decimal_places=10)

    def validate(self, attrs):
        send_wallet_id = attrs.get('send_wallet_id', None)
        receive_wallet_id = attrs.get('receive_wallet_id', None)
        transaction_amount = attrs.get('transaction_amount', None)
        user = self.context['request'].user
        if send_wallet_id == receive_wallet_id:
            raise serializers.ValidationError(
                'You can\'t transfer to same wallet')
        try:
            send_wallet = Wallet.objects.get(
                user=user, pk=send_wallet_id, wallet_type=FIAT)
        except ObjectDoesNotExist:
            raise serializers.ValidationError('Invalid wallet parameters')
        if send_wallet.wallet_balance < transaction_amount:
            raise serializers.ValidationError('Insufficient funds')
        return attrs

    def create(self, validated_data):
        send_wallet_id = validated_data.get('send_wallet_id', None)
        transaction_amount = validated_data.get('transaction_amount', None)
        receive_wallet_id = validated_data.get('receive_wallet_id', None)
        user = self.context['request'].user
        try:
            sender_wallet = Wallet.objects.get(
                pk=send_wallet_id, wallet_type=FIAT, user=user)
            receiver_wallet = Wallet.objects.get(
                pk=receive_wallet_id, wallet_type=FIAT, user=user)
        except ObjectDoesNotExist:
            print("Hello Receive")
            raise serializers.ValidationError('Invalid wallet parameters')
        sender_wallet.wallet_balance -= transaction_amount
        receiver_wallet.wallet_balance += transaction_amount
        sender_wallet.save()
        receiver_wallet.save()
        transaction = Transaction(sender=user, receiver=user, transaction_amount=transaction_amount,
                                  wallet=sender_wallet, remaining_balance=sender_wallet.wallet_balance)
        transaction.save()
        return transaction
