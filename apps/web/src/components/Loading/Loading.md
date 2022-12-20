The `Loading` component is a simple React component that displays a loading spinner using the `TailSpin` component from the `react-loader-spinner` library.

## Props

The `Loading` component accepts the following props:

- `height` (optional, default value: `50`): a number representing the height of the loading spinner in pixels.
- `color` (optional, default value: `#0b4f6c`): a string representing the color of the loading spinner.

Example
Here is an example of how to use the Loading component in a React component:

```js
import Loading from "./Loading";

const MyComponent = () => {
  return (
    <div>
      {/* Display a loading spinner with a height of 50 pixels and a color of #0b4f6c */}
      <Loading />

      {/* Display a loading spinner with a height of 100 pixels and a color of red */}
      <Loading height={100} color="red" />
    </div>
  );
};
```
