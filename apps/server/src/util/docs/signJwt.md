This file defines a function called `signJwt` that creates a JSON Web Token (JWT) using the `jsonwebtoken` module.

The function takes a user ID and a username as arguments and creates a JWT with a payload containing these values. The JWT is signed with the `JWT_KEY` environment variable as the secret. The `expiresIn` option is set to `"1h"`, which means that the JWT will expire after one hour.

The function returns the signed JWT as a string.

The `signJwt` function is exported as the default export. It can be used to create a JWT for a user that can be used for authentication purposes.
