import random
from django.contrib.auth import get_user_model
from django.core.mail import EmailMessage
from users.models import UserOTP
from rest_framework import status

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
