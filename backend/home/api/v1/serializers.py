from django.contrib.auth import get_user_model, password_validation
from django.http import HttpRequest
from django.utils.translation import ugettext_lazy as _
from allauth.account import app_settings as allauth_settings
from allauth.account.forms import ResetPasswordForm
from allauth.utils import email_address_exists, generate_unique_username
from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email
from rest_framework import serializers
from rest_auth.serializers import PasswordResetSerializer
from users.models import UserProfile

User = get_user_model()


class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'name', 'email', 'password',)
        extra_kwargs = {
            'password': {
                'write_only': True,
                'style': {
                    'input_type': 'password'
                }
            },
            'email': {
                'required': True,
                'allow_blank': False,
            },
        }

    def _get_request(self):
        request = self.context.get('request')
        if request and not isinstance(request, HttpRequest) and hasattr(request, '_request'):
            request = request._request
        return request

    def validate_email(self, email):
        email = get_adapter().clean_email(email)
        if allauth_settings.UNIQUE_EMAIL:
            if email and email_address_exists(email):
                raise serializers.ValidationError(
                    _("A user is already registered with this e-mail address."))
        return email


    def create(self, validated_data):
        user = User(
            email=validated_data.get('email'),
            name=validated_data.get('name'),
            username=generate_unique_username([
                validated_data.get('name'),
                validated_data.get('email'),
                'user'
            ])
        )
        user.set_password(validated_data.get('password'))
        user.save()
        request = self._get_request()
        setup_user_email(request, user, [])
        return user

    def save(self, request=None):
        """rest_auth passes request so we must override to accept it"""
        return super().save()

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('middle_name', 'phone_number',)


class SignupAndLoginSerializer(SignupSerializer):

    user_profile = UserProfileSerializer()

    class Meta:
        model = User
        fields = ['id','first_name', 'last_name', 'email', 'user_profile' , 'password', 'username']
        extra_kwargs = {
            'password': {
                'write_only': True,
                'style': {
                    'input_type': 'password'
                }
            },
            'email': {
                'required': False,
                'allow_blank': False,
            },
            'phone_number':{
                'required': False,
                'allow_blank': True,
            },
            'username':{
                'required':True,
                'allow_blank': False,
            }
        }

    def create(self, validated_data):
        profile_data = validated_data.pop('user_profile')
        user = User.objects.create(**validated_data)
        print(type(user.last_name))
        user.name = user.first_name + ' ' + user.last_name if len(user.last_name)>0 else user.first_name
        user.set_password(validated_data.get('password'))
        user_profile = UserProfile.objects.create(user=user, **profile_data)
        user.user_profile.is_verified = True
        user.save()
        user_profile.save()
        return user

    def validate(self, data):
        if data['email'] is None and data['phone_number'] is None:
            raise serializers.ValidationError('Either email or phone number must be provided')
        return data


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'name']

class ForgotPasswordSendOTPSerializer(serializers.Serializer):
    email = serializers.EmailField()

class ForgotPasswordVerifyOTPSerializer(ForgotPasswordSendOTPSerializer):
    otp = serializers.CharField(max_length=6, min_length=6)
    password = serializers.CharField()

    def validate_password(self, password):
        password_validation.validate_password(password=password)
        return password

class PasswordSerializer(PasswordResetSerializer):
    """Custom serializer for rest_auth to solve reset password error"""
    password_reset_form_class = ResetPasswordForm

class SendEmailOTPSerializer(serializers.Serializer):
    """serializer for OTP send email"""
    email = serializers.EmailField()

class VerifyEmailOTPSerializer(serializers.Serializer):
    """serializer for OTP verification"""
    email = serializers.EmailField()
    otp = serializers.CharField(max_length=6, min_length=6)
