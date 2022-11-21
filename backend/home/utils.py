import random
from django.contrib.auth import get_user_model
from django.core.mail import EmailMessage
from users.models import UserOTP
from rest_framework import status

User = get_user_model()



class SendgridClient(object):
    '''The class is used to send OTP through email and verify based on the request endpoints'''
    def send(self, request):
        email = request.data.get('email', None)
        user = User.objects.filter(email=email)
        if user and email: 
            subject = "Activate your account"
            otp = random.randint(000000, 999999) #To generate 6 digit OTP for account verification
            message = f"OTP for Account Verification is {otp}"
            obj_email = EmailMessage(subject=subject, body=message, to=(email,))
            obj_email.send()
            otp_user = UserOTP.objects.filter(user_email= email)
            if otp_user: # if otp for user already exists then delete the row/instance in the table
                otp_user.delete() 
            UserOTP.objects.create(user_email= email, otp = otp) #Add new OTP for requesting user
            return {'response': 'Email Send Successfully', 'status': status.HTTP_202_ACCEPTED}
        return {'response': 'Email Send Failed', 'status': status.HTTP_400_BAD_REQUEST}
            
    def verify(self, request):
        email = request.data.get('email', None)
        otp = request.data.get('otp', None)
        otp_user = UserOTP.objects.filter(user_email= email, otp= otp)
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