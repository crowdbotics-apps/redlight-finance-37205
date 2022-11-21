from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.viewsets import ModelViewSet, ViewSet
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from ...utils import EmailOTP
from rest_framework import status

from home.api.v1.serializers import (
    SignupSerializer,
    UserSerializer,
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
    def create(self, request):
        try:
            email = request.data.get('email', None)
            if email is None:
                return Response({"email":"please enter a valid email address"}, status=status.HTTP_400_BAD_REQUEST)
            res = EmailOTP.send(request)
            return Response({"message": res.get('response')}, status=res.get('status'))
        except Exception as e:
            return Response({"message": str(e)}, status=res.get('status'))
    
class VerifyEmailOTPViewSet(ViewSet):
    def create(self, request):
        try:
            email = request.data.get('email', None)
            otp = request.data.get('otp', None)
            if email is None:
                return Response({"email":"please enter a valid email address"}, status=status.HTTP_400_BAD_REQUEST)
            if otp is None:
                return Response({"otp":"OTP is required for verification"}, status=status.HTTP_400_BAD_REQUEST)
            verify = EmailOTP.verify(request)
            return Response({"message": verify.get('response')}, status=verify.get('status'))
        except Exception as e:
            return Response({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)
