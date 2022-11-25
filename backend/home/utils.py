import random
from django.contrib.auth import get_user_model
from django.core.mail import EmailMessage
from users.models import UserOTP
from rest_framework import status
from twilio.rest import Client
from redlight_finance_37205.settings import TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_VERIFY_SERVICE_SID
from twilio.base.exceptions import TwilioRestException

User = get_user_model()


class SendgridClient(object):
    '''The class is used to send OTP through email and verify based on the request endpoints'''

    def send(self, email):
        if email:
            subject = "Activate your account"
            # To generate 6 digit OTP for account verification
            otp = random.randint(100000, 999999)
            message = f"OTP for Account Verification is {otp}"
            obj_email = EmailMessage(
                subject=subject, body=message, to=(email,))
            obj_email.send()
            otp_user = UserOTP.objects.filter(user_email=email)
            if otp_user:  # if otp for user already exists then delete the row/instance in the table
                otp_user.delete()
            # Add new OTP for requesting user
            UserOTP.objects.create(user_email=email, otp=otp)
            return {'response': 'Email Send Successfully', 'status': status.HTTP_202_ACCEPTED}
        return {'response': 'Email Send Failed', 'status': status.HTTP_400_BAD_REQUEST}

    def verify(self, email, otp):
        otp_user = UserOTP.objects.filter(user_email=email, otp=otp).first()
        if otp_user:
            otp_user.delete()
            return {'response': 'OTP Verification successful', 'status': status.HTTP_202_ACCEPTED}
        else:
            return {'response': 'OTP Verification failed', 'status': status.HTTP_400_BAD_REQUEST}


class EmailOTP:

    @classmethod
    def send(cls, *args):
        return SendgridClient().send(*args)

    @classmethod
    def verify(cls, *args):
        return SendgridClient().verify(*args)


class TwilioClient(object):
    '''Class is used to send SMS OTP for Phone Number Verification'''

    client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
    verify = client.verify.services(TWILIO_VERIFY_SERVICE_SID)

    def send(self, phone):
        try:
            instance = self.verify.verifications.create(
                to=phone, channel='sms')
            return {'response': "OTP Send Successfully", 'status': status.HTTP_201_CREATED}
        except TwilioRestException:
            return {'response': 'OTP Sending Failed', 'status': status.HTTP_400_BAD_REQUEST}

    def check(self, phone, code):
        try:
            result = self.verify.verification_checks.create(
                to=phone, code=code)
        except TwilioRestException:
            return {'response': 'OTP Verification Failed', 'status': status.HTTP_400_BAD_REQUEST}
        return {'response': "OTP Verification Successful", 'status': status.HTTP_202_ACCEPTED} if result.status == "approved" else {'response': "OTP Verification Failed", 'status': status.HTTP_400_BAD_REQUEST}


class PhoneOTP:

    @classmethod
    def send(cls, *args):
        return TwilioClient().send(*args)

    @classmethod
    def verify(cls, *args):
        return TwilioClient().check(*args)
