This file exports four functions that perform queries related to users: `signUpQuery`, `getUserByUsernameQuery`, `getUserQuery`, `addBalanceQuery` and `removeBalanceQuery`.

The `signUpQuery` function creates a new user in the database with the given `username` and password `hash` values. It also creates a new wallet for the user, with initial balances of 1000 GBP and 1000 USD.

The `getUserByUsernameQuery` function retrieves a user from the database with the given username. It includes the user's wallet in the returned data. If no user with the given username is found, the function returns an empty data field.

The `getUserQuery` function retrieves a user from the database with the given `userID`. It includes the user's wallet in the returned data. If no user with the given userID is found, the function returns an empty data field.

The `addBalanceQuery` function updates the wallet of a user with the given `userID` by incrementing the balance of the specified `currency` by the given `amount`. It returns the updated user object, including the updated wallet.

The `removeBalanceQuery` function updates the wallet of a user with the given userID by decrementing the balance of the specified `currency` by the given `amount`. It returns the updated user object, including the updated wallet.

Each of these functions also has error handling implemented using the catchErrorHandler function, which is designed to catch and handle any errors that occur during the execution of the function. If an error occurs, the function will throw
