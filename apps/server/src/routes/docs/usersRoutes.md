This file a new router Express route using `Router` from `express`.

The router object is then configured to handle three routes:

- A POST request to the `/signup` path is handled by the `signUpController` function.

- A POST request to the `/signin` path is handled by the `signInController` function.

- A GET request to the root path `/` is handled by the `checkToken` middleware followed by the `getUserController` function.

Finally, the router object is exported as the default export.
