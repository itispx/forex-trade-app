This file exports five functions that perform actions related to exchanges: `getExchangeValuesAction`, `getRealTimeExchangeValuesAction`, `addExchangeQueueAction`, `processExchangeAction`, and `getExchangesAction`.

The `getExchangeValuesAction` function is a function that retrieves the current exchange values for USD to GBP and GBP to USD. It returns an array of exchange conversion objects.

The `getRealTimeExchangeValuesAction` function is a function that listens for exchange value updates and broadcasts them to all connected sockets in real-time. It does this by emitting a message called `get-forex-data` with the updated exchange values every 30 seconds.

The `addExchangeQueueAction` function is a function that adds an exchange to a message queue, which will later be processed by a separate process. It takes in a `userID`, the `base` currency and `amount`, and the `convert` currency and amount. It creates a message channel and sends the exchange data to the queue.

The `processExchangeAction` function is a function that processes an exchange by checking if the user has enough credit to perform the exchange, removing the required balance from the user's wallet, adding the converted balance to the user's wallet, and updating the exchange status to "SUCCESSFUL". If an error occurs during the process, the exchange status is updated to "FAILED".

The `getExchangesAction` function is a function that retrieves a paginated list of exchanges for a given user. It takes in a `userID` and a `page` number and returns an object with the HTTP status code and an array of exchange objects in the `success` property.
