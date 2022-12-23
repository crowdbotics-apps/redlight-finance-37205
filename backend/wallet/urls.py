from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .viewsets import (
    WalletViewset,
    WalletQRCodeViewset,
    WalletSendTokenView
)

router = DefaultRouter()
router.register("wallets", WalletViewset,
                basename="wallets")
urlpatterns = [
    path("", include(router.urls)),
    path("wallet_qr_code/<int:pk>/", WalletQRCodeViewset.as_view(),
         name="wallet_qr_code"),
    path("wallet_transaction/<int:pk>/", WalletSendTokenView.as_view(),
         name="wallet_transaction"),
]
