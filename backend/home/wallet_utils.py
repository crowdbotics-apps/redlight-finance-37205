from bitcoin import privtopub, pubkey_to_address
import secrets
from eth_account import Account


class WalletMixin(object):

    @classmethod
    def get_wallet_private_key(self):
        private_key = secrets.token_hex(32)
        return private_key

    @classmethod
    def get_wallet_address(self, private_key):
        private_key = '0x' + private_key
        acct = Account.from_key(private_key)
        public_key = privtopub(private_key)
        address = pubkey_to_address(public_key)
        return {"ethereum": acct.address, "bitcoin": address}
