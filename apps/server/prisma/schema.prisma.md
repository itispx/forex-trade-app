The `User` model represents a user of the application. It has fields for the user's ID, username, password, wallet, exchanges, and the time it was created.

The `Wallet` model represents the user's wallet. It has fields for the wallet's ID, the user it belongs to, the user's ID, and the amount of USD and GBP the user has in their wallet.

The `Exchange` model represents an exchange made by a user. It has fields for the exchange's ID, the user it belongs to, the user's ID, the base currency, base amount, converted currency, converted amount, status, and the time it was created.

The `Currency_Types` enum defines possible values for `baseCurrency` and `convertedCurrency`.

The `Status_Types` enum defines possible values for the `status` field in the `Exchange` model.
