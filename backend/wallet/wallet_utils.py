from bitcoin import privtopub, pubkey_to_address
import secrets
from eth_account import Account
from web3 import Web3


GANACHE_URL = 'https://dataseed-testnet.redlightscan.finance'


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

    @classmethod
    def validate_wallet_balance(self, sender_address, transaction_amount):
        web3 = Web3(Web3.HTTPProvider(GANACHE_URL))
        balance = web3.eth.get_balance(sender_address, 'latest')
        if balance - web3.toWei(transaction_amount, 'ether') >= 0:
            return True
        return False

    @classmethod
    def transaction(self, sender_address, receiver_address, transaction_amount, sender_private_key):
        web3 = Web3(Web3.HTTPProvider(GANACHE_URL))
        # sender_address = "0x46b554F43C2e0040b57703bEB6CC991B32dEd86D"
        # sender_private_key =  "3a309757aa2334b618ad0ec077e9480666c429c3a6d793f21bc51f915318d134"
        # receiver_address = '0xaC2d0226AdE52e6b4CCc97359359f01e34d50352'
        # get the nonce.  Prevents one from sending the transaction twice
        nonce = web3.eth.getTransactionCount(sender_address)
        # build a transaction in a dictionary
        tx = {
            'nonce': nonce,
            'to': receiver_address,
            'value': web3.toWei(transaction_amount, 'ether'),
            'gas': 6200000,
            'gasPrice': web3.toWei('0', 'gwei')
        }
        # sign the transaction
        signed_tx = web3.eth.account.sign_transaction(tx, sender_private_key)
        # send transaction
        tx_hash = web3.eth.sendRawTransaction(signed_tx.rawTransaction)
        # get transaction hash
        return web3.toHex(tx_hash)
