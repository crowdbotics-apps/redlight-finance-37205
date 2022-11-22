from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.viewsets import ModelViewSet, ViewSet
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from ...utils import EmailOTP

from home.api.v1.serializers import (
    SignupSerializer,
    UserSerializer,
    SendEmailOTPSerializer,
    VerifyEmailOTPSerializer,
)


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


class SendEmailOTPViewSet(ViewSet):
    '''The view set for sending email verification OTP for endpoint send_email_otp'''

    def create(self, request):
        serializer = SendEmailOTPSerializer(data= request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        response = EmailOTP.send(serializer.validated_data['email'])
        return Response({"message": response.get('response')}, status=response.get('status'))



class VerifyEmailOTPViewSet(ViewSet):
    '''The view set for verifying OTP for endpoint verify_email_otp'''

    def create(self, request):
        serializer = VerifyEmailOTPSerializer(data= request.data, context= {'request': request})
        serializer.is_valid(raise_exception=True)
        verify = EmailOTP.verify(serializer.validated_data['email'], serializer.validated_data['otp'])
        return Response({"message": verify.get('response')}, status=verify.get('status'))
