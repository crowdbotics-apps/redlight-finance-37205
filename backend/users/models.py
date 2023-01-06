from django.contrib.auth.models import AbstractUser
from django.db import models
from django.urls import reverse
from django.utils.translation import ugettext_lazy as _
from django.db.models import Model
import uuid
from home.storage_backends import MediaStorage
from home.constants import WALLET_TYPE_CHOICES, CRYPTO_TYPE_CHOICES, TRANSACTION_TYPE, FIAT, BITCOIN, BLOCKCHAIN


class User(AbstractUser):
    # WARNING!
    """
    Some officially supported features of Crowdbotics Dashboard depend on the initial
    state of this User model (Such as the creation of superusers using the CLI
    or password reset in the dashboard). Changing, extending, or modifying this model
    may lead to unexpected bugs and or behaviors in the automated flows provided
    by Crowdbotics. Change it at your own risk.


    This model represents the User instance of the system, login system and
    everything that relates with an `User` is represented by this model.
    """

    # First Name and Last Name do not cover name patterns
    # around the globe.
    name = models.CharField(_("Name of User"), blank=True,
                            null=True, max_length=255)

    def get_absolute_url(self):
        return reverse("users:detail", kwargs={"username": self.username})


class BaseModels(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class UserProfile(BaseModels):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name='user_profile')
    middle_name = models.CharField(max_length=255, null=True, blank=True)
    phone_number = models.CharField(max_length=15, null=True, blank=True)
    is_verified = models.BooleanField(default=False)
    image = models.FileField(storage=MediaStorage(), blank=True, null=True)

    def __str__(self):
        return str(self.user.name)


class UserOTP(models.Model):
    user_email = models.EmailField(_("Email Address"), blank=True)
    otp = models.IntegerField()


class Wallet(BaseModels):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='user_wallet')
    wallet_name = models.CharField(max_length=255, blank=True, null=True)
    is_default = models.BooleanField(default=False)
    # uuid = models.UUIDField(default=uuid.uuid4, editable=False)
    private_key = models.CharField(max_length=255, blank=True, null=True)
    wallet_balance = models.DecimalField(
        max_digits=30, decimal_places=20, default=0)
    currency = models.CharField(max_length=5, default='USD')
    public_address = models.CharField(max_length=70, blank=True, null=True)
    blockchain_balance = models.DecimalField(
        max_digits=30, decimal_places=20, default=0)
    wallet_type = models.PositiveSmallIntegerField(
        choices=WALLET_TYPE_CHOICES, default=FIAT)
    crypto_type = models.PositiveSmallIntegerField(
        choices=CRYPTO_TYPE_CHOICES, null=True, blank=True)
    is_subwallet = models.BooleanField(default=False)

    def __str__(self) -> str:
        return self.wallet_name

    @classmethod
    def add(cls, user, private_key, public_address):
        """Class Method for creating multiple wallets using bulk_create"""

        wallet_data = []
        for crypto_type, crypto_type_name in CRYPTO_TYPE_CHOICES:
            address = public_address.get('ethereum')
            if crypto_type == BITCOIN:
                address = public_address.get('bitcoin')
            wallet_data.append({
                "user": user,
                "wallet_name": crypto_type_name,
                "private_key": private_key,
                "public_address": address,
                "crypto_type": crypto_type,
                "wallet_type": BLOCKCHAIN,
            })
        wallet_objects_list = [cls(**data) for data in wallet_data]
        wallet_obj = cls.objects.bulk_create(wallet_objects_list)
        return wallet_obj


class Transaction(BaseModels):
    uuid = models.UUIDField(default=uuid.uuid4, editable=False)
    sender = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='sender')
    receiver = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='receiver')
    transaction_type = models.PositiveSmallIntegerField(
        TRANSACTION_TYPE, null=True, blank=True)
    is_external_transaction = models.BooleanField(default=False)
    transaction_amount = models.DecimalField(max_digits=30, decimal_places=20)
    remaining_balance = models.DecimalField(max_digits=30, decimal_places=20)
    wallet = models.ForeignKey(Wallet, on_delete=models.CASCADE)
    external_transaction_id = models.CharField(max_length=64, blank=True, null=True)

    def __str__(self) -> str:
        return self.uuid
