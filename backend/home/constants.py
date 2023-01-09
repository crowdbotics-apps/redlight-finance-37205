# Wallet Type
BLOCKCHAIN = 1
FIAT = 2
# Cryptocurrency
ETHEREUM = 1
BITCOIN = 2
USDT = 3
USDC = 4
REDLC = 5
# Transaction Mode
ONLINE = 1
E_WALLET = 2
COUNTER = 3

WALLET_TYPE_CHOICES = ((BLOCKCHAIN, "Blockchain"),
                       (FIAT, "Fiat"))
CRYPTO_TYPE_CHOICES = ((ETHEREUM, "Ethereum"), (BITCOIN,
                       "Bitcoin"), (USDT, "USDT"), (USDC, "USDC"), (REDLC, "REDLC"))
TRANSACTION_TYPE = ((ONLINE, "Online-Bank"), (E_WALLET,
                    "E-Wallet"), (COUNTER, "Over-The-Counter"))
