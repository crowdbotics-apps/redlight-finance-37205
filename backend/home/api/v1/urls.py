from django.urls import path, include
from rest_framework.routers import DefaultRouter

from home.api.v1.viewsets import (
    SignupViewSet,
    LoginViewSet,
    SendEmailOTPViewSet,
    VerifyEmailOTPViewSet
)

router = DefaultRouter()
router.register("signup", SignupViewSet, basename="signup")
router.register("login", LoginViewSet, basename="login")
router.register("send_email_otp", SendEmailOTPViewSet, basename="send_email_otp")
router.register("verify_email_otp", VerifyEmailOTPViewSet, basename="verify_email_otp")
urlpatterns = [
    path("", include(router.urls)),
]
