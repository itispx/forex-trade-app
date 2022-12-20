The `MainNavigation` component is a navigation bar that appears at the top of the page on a web application. It displays different content based on whether the user is logged in or not.

If the user is logged in, the navigation bar displays a link to either the dashboard or the exchanges page, depending on the current page. It also displays the user's currency balances.

If the user is not logged in, the navigation bar displays a `SignInButton` and a `SignUpButton`.

The `MainNavigation` component also includes a `LanguageSwitcher` component, which allows the user to switch between different language options.

The `MainNavigation` component receives no props and relies on the `useFetchUser` hook to determine whether the user is logged in and to retrieve the user's currency balances. It also uses the `useRouter` hook to determine the current page, and the `useTranslation` hook to access translated strings.
