from .serializers import (
    WalletSerializer,
    WalletQRCodeSerializer
)
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from users.models import Wallet
from rest_framework.views import APIView
from .wallet_utils import WalletMixin
from .serializers import WalletSendTokenSerializer


class WalletViewset(ModelViewSet):
    """Wallet viewset for CRUD in wallet associated with user account"""
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication,)
    serializer_class = WalletSerializer

    def get_queryset(self):
        return Wallet.objects.filter(user=self.request.user)


class WalletQRCodeViewset(APIView):
    """Wallet QR Code by ID currently logged in user requires Auth token and wallet ID"""
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication,)
    http_method_names = ['get']

    def get(self, request, pk):
        try:
            wallet = Wallet.objects.get(pk=pk, user=request.user)
        except Wallet.DoesNotExist:
            return Response({'error': 'Not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = WalletQRCodeSerializer(wallet)
        return Response(serializer.data)


class WalletSendTokenView(APIView):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication,)
    http_method_names = ['post']

    def post(self, request, pk):
        serializer = WalletSendTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            wallet = Wallet.objects.get(pk=pk, user=request.user)
            sender_address = WalletMixin.get_wallet_address(wallet.private_key)
            receiver_address = serializer.validated_data.get('receiver_address')
            if sender_address.get('ethereum') == receiver_address:
                return Response({'error': 'receiver and sender address can\'t be same'}, status=status.HTTP_404_NOT_FOUND)
            sufficient_balance = WalletMixin.validate_wallet_balance(sender_address=sender_address.get(
                'ethereum'), transaction_amount=serializer.validated_data.get('transaction_amount'))
            if not sufficient_balance:
                return Response({'message': 'Insufficient funds'}, status=status.HTTP_400_BAD_REQUEST)
            transaction_id = WalletMixin.transaction(
                sender_address=sender_address.get('ethereum'), receiver_address=receiver_address, sender_private_key=wallet.private_key, transaction_amount=serializer.validated_data.get('transaction_amount'))
            return Response({'message': 'Transaction Successful', 'Transaction ID': transaction_id}, status=status.HTTP_200_OK)
        except Wallet.DoesNotExist:
            return Response({'error': 'Not found'}, status=status.HTTP_404_NOT_FOUND)
