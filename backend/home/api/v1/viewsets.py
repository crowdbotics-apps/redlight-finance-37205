from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.viewsets import ModelViewSet, ViewSet
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from ...utils import EmailOTP, PhoneOTP
from django.contrib.auth import get_user_model
from home.api.v1.serializers import (
    SignupSerializer,
    UserSerializer,
    SignupAndLoginSerializer,
    SendEmailOTPSerializer,
    VerifyEmailOTPSerializer,
    ForgotPasswordSendEmailOTPSerializer,
    ForgotPasswordVerifyEmailOTPSerializer,
    ChangePasswordSerializer,
    SendPhoneOTPSerializer,
    VerifyPhoneOTPSerializer,
    ForgotPasswordSendPhoneOTPSerializer,
    ForgotPasswordVerifyPhoneOTPSerializer
)
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from users.models import UserProfile

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


class ForgotPasswordSendEmailOTPViewSet(ViewSet):
    """Forgot Password Send OTP Viewset"""

    http_method_names = ["post"]

    def create(self, request):
        serializer = ForgotPasswordSendEmailOTPSerializer(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        user = User.objects.filter(
            email=serializer.validated_data["email"], is_active=True).first()
        if user:
            response = EmailOTP.send(serializer.validated_data['email'])
            return Response({"message": "Password reset e-mail has been sent"}, status=response.get('status'))
        return Response({"message": "User Doesn't Exists"}, status=status.HTTP_403_FORBIDDEN)


class ForgotPasswordVerifyEmailOTPViewSet(ViewSet):
    """Forgot Password Verification"""
    http_method_names = ['post']

    def create(self, request):
        serializer = ForgotPasswordVerifyEmailOTPSerializer(
            data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = User.objects.filter(
            email=serializer.validated_data["email"], is_active=True).first()
        if user:
            verify = EmailOTP.verify(
                serializer.validated_data['email'], serializer.validated_data['otp'])
            if verify.get('status') == status.HTTP_202_ACCEPTED:
                user.set_password(serializer.validated_data["password"])
                user.save()
                return Response({"message": "Password reset successfully"}, status=status.HTTP_200_OK)
            return Response({"message": "OTP is not Valid or Expired. Please try again"}, status=status.HTTP_400_BAD_REQUEST)


class ForgotPasswordSendPhoneOTPViewSet(ViewSet):
    """Forgot Password Send OTP Viewset"""

    http_method_names = ["post"]

    def create(self, request):
        serializer = ForgotPasswordSendPhoneOTPSerializer(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        phone = serializer.validated_data['country_code'] + \
            serializer.validated_data['phone_number']
        user = UserProfile.objects.filter(
            phone_number=phone).first()
        if user:
            response = PhoneOTP.send(phone)
            return Response({"message": response.get('response')}, status=response.get('status'))
        return Response({"message": f"User with {phone} Doesn't Exists"}, status=status.HTTP_403_FORBIDDEN)


class ForgotPasswordVerifyPhoneOTPViewSet(ViewSet):
    """Forgot Password Verification"""
    http_method_names = ['post']

    def create(self, request):
        serializer = ForgotPasswordVerifyPhoneOTPSerializer(
            data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        phone = serializer.validated_data['country_code'] + \
            serializer.validated_data['phone_number']
        user_profile = UserProfile.objects.filter(
            phone_number=phone).first()
        if user_profile:
            verify = PhoneOTP.verify(
                phone, serializer.validated_data['otp'])
            if verify.get('status') == status.HTTP_202_ACCEPTED:
                user_profile.user.set_password(
                    serializer.validated_data["password"])
                user_profile.user.save()
                return Response({"message": "Password reset successfully"}, status=status.HTTP_200_OK)
            return Response({"message": "OTP is not Valid or Expired. Please try again"}, status=status.HTTP_400_BAD_REQUEST)


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
        serializer = SendEmailOTPSerializer(
            data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        response = EmailOTP.send(serializer.validated_data['email'])
        return Response({"message": response.get('response')}, status=response.get('status'))


class VerifyEmailOTPViewSet(ViewSet):
    """The view set for verifying OTP for endpoint verify_email_otp"""

    http_method_names = ["post"]

    def create(self, request):
        serializer = VerifyEmailOTPSerializer(
            data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        verify = EmailOTP.verify(
            serializer.validated_data['email'], serializer.validated_data['otp'])
        return Response({"message": verify.get('response')}, status=verify.get('status'))


class SendPhoneOTPViewSet(ViewSet):
    """The view set for sending email verification OTP for endpoint send_email_otp"""

    http_method_names = ["post"]

    def create(self, request):
        serializer = SendPhoneOTPSerializer(
            data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        phone = serializer.validated_data['country_code'] + \
            serializer.validated_data['phone_number']
        response = PhoneOTP.send(phone)
        return Response({"message": response.get('response')}, status=response.get('status'))


class VerifyPhoneOTPViewSet(ViewSet):
    """The view set for verifying OTP for endpoint verify_email_otp"""

    http_method_names = ["post"]

    def create(self, request):
        serializer = VerifyPhoneOTPSerializer(
            data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        phone = serializer.validated_data['country_code'] + \
            serializer.validated_data['phone_number']
        verify = PhoneOTP.verify(phone, serializer.validated_data['otp'])
        return Response({"message": verify.get('response')}, status=verify.get('status'))


class ChangePasswordViewset(ViewSet):
    """Change Password viewset for Changing password for cuurently logged in user (using token)"""
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication,)
    http_method_names = ['put']

    def update(self, request, *args, **kwargs):
        serializer = ChangePasswordSerializer(
            data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        # if using drf authtoken, create a new token
        if hasattr(user, 'auth_token'):
            user.auth_token.delete()
        token, created = Token.objects.get_or_create(user=user)
        # return new token
        return Response({'token': token.key, 'message': 'Password Changed'}, status=status.HTTP_200_OK)
