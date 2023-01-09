from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.viewsets import ModelViewSet, ViewSet, GenericViewSet
from rest_framework.mixins import RetrieveModelMixin, UpdateModelMixin
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from ...utils import EmailOTP, PhoneOTP
from django.contrib.auth import get_user_model
from home.api.v1.serializers import (
    SignupSerializer,
    UserProfileSerializer,
    UserSerializer,
    SignupAndLoginSerializer,
    SendEmailOTPSerializer,
    VerifyEmailOTPSerializer,
    ForgotPasswordVerifyEmailOTPSerializer,
    ChangePasswordSerializer,
    SendPhoneOTPSerializer,
    VerifyPhoneOTPSerializer,
    ForgotPasswordVerifyPhoneOTPSerializer,
    SettingsProfileScreenSerializer,
    DeleteAccountSerializer,
    UserDetailSerializer
)
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from users.models import UserProfile
from rest_auth.views import LogoutView, PasswordResetConfirmView
from rest_framework.views import APIView
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode
from django.shortcuts import get_object_or_404
from django.http import Http404

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
        serializer = SendEmailOTPSerializer(
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
                return Response({"message": "OTP verified successfully", "uid": urlsafe_base64_encode(force_bytes(user.pk)), "status": "success", "token": default_token_generator.make_token(user)}, status=status.HTTP_200_OK)
            return Response({"message": "OTP is not Valid or Expired. Please try again"}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'message': 'User Doesn\'t exists'}, status=status.HTTP_404_NOT_FOUND)


class ForgotPasswordSendPhoneOTPViewSet(ViewSet):
    """Forgot Password Send OTP Viewset"""

    http_method_names = ["post"]

    def create(self, request):
        serializer = SendPhoneOTPSerializer(
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
                return Response({"message": "OTP verified successfully", "uid": urlsafe_base64_encode(force_bytes(user_profile.user.id)), "status": "success", "token": default_token_generator.make_token(user_profile.user)}, status=status.HTTP_200_OK)
            return Response({"message": "OTP is not Valid or Expired. Please try again"}, status=status.HTTP_400_BAD_REQUEST)


class ForgotPasswordResetView(PasswordResetConfirmView):
    pass


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
    """The view set for sending phone verification OTP for endpoint send_phone_otp"""

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
    """The view set for verifying OTP for endpoint verify_phone_otp"""

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
    """Change Password viewset for Changing password for currently logged in user (using token)"""
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


class SettingsProfileScreenViewset(APIView):
    """Setting Profile Screen Viewset retrieving Username and Email fields for currently logged in user"""
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication,)
    http_method_names = ['get']

    def get(self, request, pk=None):
        try:
            user = User.objects.get(pk=request.user.id)
        except User.DoesNotExist:
            return Response({'error': 'Not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = SettingsProfileScreenSerializer(user)
        return Response(serializer.data)


class LogoutViewset(LogoutView):
    """LogoutViewset for Logging out currently logged in user required Authorization header"""
    http_method_names = ['post']
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication,)


class DeleteAccountViewset(ViewSet):
    """DeleteAccountViewset for Deleting account of currently logged in user required Authorization header and password for user verification"""
    http_method_names = ['delete']
    serializer_class = DeleteAccountSerializer
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication,)

    def destroy(self, request, *args, **kwargs):
        serializer = DeleteAccountSerializer(
            data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        try:
            request.user.delete()
            return Response({'message': 'Account deleted successfully'}, status=status.HTTP_200_OK)
        except:
            return Response({'message': 'Server error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UserProfileViewSet(GenericViewSet, RetrieveModelMixin, UpdateModelMixin):
    """This viewset is for updating user profile information"""
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication,)
    serializer_class = UserProfileSerializer
    http_method_names = ["get", "patch"]

    def get_object(self):
        return UserProfile.objects.get(user=self.request.user)


class UserDetailView(GenericViewSet, RetrieveModelMixin):
    """
    This viewset is for retrieving user details based on query parameters
        @params: email 
        @params: phone_number
        @params: public_address
    """
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication,)
    serializer_class = UserDetailSerializer
    http_method_names = ["get",]

    def get_object(self):
        public_address = self.request.query_params.get('public_address', None)
        email = self.request.query_params.get('email', None)
        phone_number = self.request.query_params.get('phone_number', None)
        if public_address:
            obj = User.objects.filter(
                user_wallet__public_address=public_address).first()
            if obj is None:
                raise Http404()
            return obj
        if phone_number:
            queryset = User.objects.filter(
                user_profile__phone_number=phone_number)
        if email:
            queryset = User.objects.filter(email=email)
        return get_object_or_404(queryset)
