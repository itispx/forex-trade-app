This file defines a function called `catchErrorHandler` that handles errors thrown by the Prisma client.

The function takes an error object as an argument and checks if it is an instance of the `PrismaClientKnownRequestError` class from the `Prisma` module. If it is, the function throws a new `APIError` object with the error's `code` and `message` properties as the status code and message, respectively.

If the error object is not an instance of the `PrismaClientKnownRequestError` class, the function throws a new generic `Error` object.

The `catchErrorHandler` function is exported as the default export.
