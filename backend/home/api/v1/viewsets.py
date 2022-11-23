from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.viewsets import ModelViewSet, ViewSet
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from ...utils import EmailOTP
from django.contrib.auth import get_user_model
from home.api.v1.serializers import (
    SignupSerializer,
    UserSerializer,
    SignupAndLoginSerializer,
    SendEmailOTPSerializer,
    VerifyEmailOTPSerializer,
    ForgotPasswordSendOTPSerializer,
    ForgotPasswordVerifyOTPSerializer
)
from rest_framework import status


User = get_user_model()

class SignupViewSet(ModelViewSet):
    serializer_class = SignupSerializer
    http_method_names = ["post"]


class LoginViewSet(ViewSet):
    """Based on rest_framework.authtoken.views.ObtainAuthToken"""

    serializer_class = AuthTokenSerializer

    def create(self, request):
        serializer = self.serializer_class(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        token, created = Token.objects.get_or_create(user=user)
        user_serializer = UserSerializer(user)
        return Response({"token": token.key, "user": user_serializer.data})



class ForgotPasswordSendOTPViewSet(ViewSet):
    """Forgot Password Send OTP Viewset"""

    http_method_names = ["post"]

    def create(self, request):
        serializer = ForgotPasswordSendOTPSerializer(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        user = User.objects.filter(email=serializer.validated_data["email"], is_active=True).first()
        if user:
            response = EmailOTP.send(serializer.validated_data['email'])
            return Response("Password reset e-mail has been sent", status=response.get('status'))
        return Response("User Doesn't Exists", status=status.HTTP_403_FORBIDDEN)


class ForgotPasswordVerifyOTPViewSet(ViewSet):
    """Forgot Password Verification"""
    http_method_names=['post']
    def create(self, request):
        serializer = ForgotPasswordVerifyOTPSerializer(data= request.data, context= {'request': request})
        serializer.is_valid(raise_exception=True)
        user = User.objects.filter(email=serializer.validated_data["email"], is_active=True).first()
        if user:
            verify = EmailOTP.verify(serializer.validated_data['email'], serializer.validated_data['otp'])
            if verify.get('status') == status.HTTP_202_ACCEPTED:
                user.set_password(serializer.validated_data["password"])
                user.save()
                return Response("Password reset successfully", status=status.HTTP_200_OK)            
            return Response("OTP is not Valid or Expired. Please try again", status=status.HTTP_400_BAD_REQUEST)
    

class SignupAndLoginViewSet(ModelViewSet):
    """Signup and Login Viewset for signup_login endpoint takes signup parameters and returns key Token"""

    serializer_class = SignupAndLoginSerializer
    http_method_names = ["post"]

    def create(self, request):
        serializer = self.serializer_class(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token, created = Token.objects.get_or_create(user=user)
        user_serializer = UserSerializer(user)
        return Response({"token": token.key, "user": user_serializer.data})


class SendEmailOTPViewSet(ViewSet):
    """The view set for sending email verification OTP for endpoint send_email_otp"""

    http_method_names = ["post"]
    def create(self, request):
        serializer = SendEmailOTPSerializer(data= request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        response = EmailOTP.send(serializer.validated_data['email'])
        return Response({"message": response.get('response')}, status=response.get('status'))



class VerifyEmailOTPViewSet(ViewSet):
    """The view set for verifying OTP for endpoint verify_email_otp"""

    http_method_names = ["post"]
    def create(self, request):
        serializer = VerifyEmailOTPSerializer(data= request.data, context= {'request': request})
        serializer.is_valid(raise_exception=True)
        verify = EmailOTP.verify(serializer.validated_data['email'], serializer.validated_data['otp'])
        return Response({"message": verify.get('response')}, status=verify.get('status'))
