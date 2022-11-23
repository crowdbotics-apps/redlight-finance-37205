from django.urls import path, include
from rest_framework.routers import DefaultRouter

from home.api.v1.viewsets import (
    SignupViewSet,
    LoginViewSet,
    SendEmailOTPViewSet,
    VerifyEmailOTPViewSet,
    SignupAndLoginViewSet,
    ForgotPasswordSendOTPViewSet,
    ForgotPasswordVerifyOTPViewSet
)

router = DefaultRouter()
router.register("signup", SignupViewSet, basename="signup")
router.register("signup_login", SignupAndLoginViewSet, basename="signup_login")
router.register("login", LoginViewSet, basename="login")
router.register("forgot_password_send_otp", ForgotPasswordSendOTPViewSet, basename="forgot_password_send_otp")
router.register("forgot_password_verify_otp", ForgotPasswordVerifyOTPViewSet, basename="forgot_password_verify_otp")
router.register("send_email_otp", SendEmailOTPViewSet, basename="send_email_otp")
router.register("verify_email_otp", VerifyEmailOTPViewSet, basename="verify_email_otp")
urlpatterns = [
    path("", include(router.urls)),
]
