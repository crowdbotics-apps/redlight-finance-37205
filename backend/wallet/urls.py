from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .viewsets import (
    WalletViewset,
    WalletQRCodeViewset,
    WalletSendTokenView,
    SendCreditViewSet,
    TransactionHistoryView,
    MoveCreditViewSet
)

router = DefaultRouter()
router.register("wallets", WalletViewset,
                basename="wallets")
urlpatterns = [
    path("", include(router.urls)),
    path("wallet_qr_code/<int:pk>/", WalletQRCodeViewset.as_view(),
         name="wallet_qr_code"),
    path("wallet_transaction_blockchain/<int:pk>/", WalletSendTokenView.as_view(),
         name="wallet_transaction_blockchain"),
    path("send_credit/", SendCreditViewSet.as_view({'post': 'create'}),
         name="send_credit"),
    path("transaction_history/", TransactionHistoryView.as_view(),
         name="transaction_history"),
    path("move_credit/", MoveCreditViewSet.as_view({'post': 'create'}),
         name="move_credit"),
]
