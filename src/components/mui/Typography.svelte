<script>
  import { createClass, stripTemplate } from "../../utils/class";
  import { capitalize } from "../../utils/string";
  import Box from "./Box.svelte";
  import H5 from "./typography/H5.svelte";
  import Overline from "./typography/Overline.svelte";

  export let variant = "body1";

  const components = {
    H5,
    Overline,
  };

  const variantClass = createClass(
    variant,
    stripTemplate`mui-typography-${""}`,
    [variant]
  );
  const classes = ["mui-typography-root", variantClass, $$props.class];
</script>

<style>
  :global(.mui-typography-root) {
    margin: 0;
  }

  :global(.mui-typography-h5) {
    font-size: 1.5rem;
    font-family: "Helvetica", "Arial", sans-serif;
    font-weight: 400;
    line-height: 1.334;
    letter-spacing: 0em;
  }

  :global(.mui-typography-overline) {
    font-size: 0.75rem;
    font-family: "Helvetica", "Arial", sans-serif;
    font-weight: 400;
    line-height: 2.66;
    letter-spacing: 0.08333em;
    text-transform: uppercase;
  }
</style>

<svelte:component
  this={components[capitalize(variant)]}
  {...$$props}
  class={classes.filter((item) => !!item).join(' ')}>
  <slot />
</svelte:component>
