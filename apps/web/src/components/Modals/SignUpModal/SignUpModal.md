The `SignUpModal` is a modal component that allows the user to sign up. It is rendered as a modal window on top of the current view and provides a form for the user to enter their username and password.

## Props

- `show`: A boolean value that determines whether the modal should be visible or not.
- `close`: A function that is called when the user closes the modal or clicks on the modal's close button.

The component uses the `SignUpForm` component to render the form for signing up. The `submitHandler` function is passed to the `SignUpForm` component and is called when the form is submitted. This function calls the `signUpUser` function from the `useSignUpUser` hook, passing the entered username and password as arguments. The `isLoading` prop is also passed to the `SignUpForm` component and is used to show a loading indicator while the sign in request is being processed.

The component also uses the `useTranslation` hook from the `next-i18next` library to get the translations in the current language
