This file a new router Express route using `Router` from `express`.

The router object is then configured to handle two routes:

- A POST request to the root path `/` is handled by the `checkToken` middleware followed by the `makeExchangeController` function.

- A GET request to the root path `/` is handled by the `checkToken` middleware followed by the `getExchangesController` function.

Finally, the router object is exported as the default export.
