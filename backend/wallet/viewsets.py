from .serializers import (
    WalletSerializer,
    WalletQRCodeSerializer,
    SendCreditSerializer,
    TransactionSerializer,
    MoveCreditSerializer,
    ExternalDepositTransactionSerializer
)
from rest_framework.viewsets import ModelViewSet, ViewSet
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authentication import TokenAuthentication
from users.models import Wallet, Transaction
from rest_framework.views import APIView
from .wallet_utils import WalletMixin
from django_filters.rest_framework import DjangoFilterBackend
from .serializers import WalletSendTokenSerializer
from rest_framework.generics import ListAPIView
from django.db.models import Q


class WalletViewset(ModelViewSet):
    """Wallet viewset for CRUD in wallet associated with user account"""
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication,)
    serializer_class = WalletSerializer
    filter_backends = (DjangoFilterBackend,)
    filterset_fields = ['wallet_type', 'is_subwallet',
                        'public_address', 'crypto_type']

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
    """Wallet to send token on Blockchain, currently supports only REDLC token"""
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication,)
    http_method_names = ['post']

    def post(self, request, pk):
        serializer = WalletSendTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            wallet = Wallet.objects.get(pk=pk, user=request.user)
            sender_address = WalletMixin.get_wallet_address(wallet.private_key)
            receiver_address = serializer.validated_data.get(
                'receiver_address')
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


class SendCreditViewSet(ViewSet):
    """
    Send credit viewset to send token at app level between different users
    both Blockchain and Fiat wallets supported
    """
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication,)
    http_method_names = ['post']
    serializer_class = SendCreditSerializer

    def create(self, request):
        serializer = self.serializer_class(
            data=self.request.data, context={"request": request})
        serializer.is_valid(raise_exception=True)
        transaction = serializer.save()
        transaction_serializer = TransactionSerializer(
            transaction, context={"request": request})
        return Response({'status': 'success', 'transaction': transaction_serializer.data, 'message': 'Transaction Successful'}, status=status.HTTP_200_OK)


class TransactionHistoryView(ListAPIView):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication,)
    http_method_names = ['get']
    serializer_class = TransactionSerializer

    def get_queryset(self):
        return Transaction.objects.filter(Q(sender=self.request.user) | Q(receiver=self.request.user)).order_by('-created_at')


class MoveCreditViewSet(ViewSet):
    """Viewset for moving credit between same user's FIAT wallet/sub-wallets"""
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication,)
    http_method_names = ['post']
    serializer_class = MoveCreditSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            data=self.request.data, context={"request": request})
        serializer.is_valid(raise_exception=True)
        transaction = serializer.save()
        transaction_serializer = TransactionSerializer(transaction)
        return Response({'status': 'success', 'transaction': transaction_serializer.data, 'message': 'Transaction Successful'}, status=status.HTTP_200_OK)


class ExternalDepositTransactionViewSet(ViewSet):
    permission_classes = (AllowAny,)
    http_method_names = ['post']
    serializer_class = ExternalDepositTransactionSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            data=request.data,)
        serializer.is_valid(raise_exception=True)
        transaction = serializer.save()
        transaction_serializer = TransactionSerializer(transaction)
        return Response({'status': 'success', 'transaction': transaction_serializer.data, 'message': 'Transaction Successful'}, status=status.HTTP_200_OK)
