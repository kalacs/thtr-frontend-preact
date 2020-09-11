<script>
  import { createClass, stripTemplate, buildClasses } from "../../utils/class";
  import { capitalize } from "../../utils/string";

  export let variant = "text";
  export let size = "medium";

  const variantClass = createClass(variant, stripTemplate`mui-button-${""}`, [
    variant,
  ]);
  const variantSizeClass = createClass(
    variant && size,
    stripTemplate`mui-button-${""}Size${""}`,
    [variant, capitalize(size)]
  );
  const sizeClass = createClass(size, stripTemplate`mui-button-size${""}`, [
    capitalize(size),
  ]);
  const classes = [
    "mui-button-base-root",
    "mui-button-root",
    variantClass,
    variantSizeClass,
    sizeClass,
    $$props.class,
  ];
</script>

<style>
  .mui-button-label {
    width: 100%;
    display: inherit;
    align-items: inherit;
    justify-content: inherit;
  }

  .mui-button-base-root {
    color: inherit;
    border: 0;
    cursor: pointer;
    margin: 0;
    display: inline-flex;
    outline: 0;
    padding: 0;
    position: relative;
    align-items: center;
    user-select: none;
    border-radius: 0;
    vertical-align: middle;
    -moz-appearance: none;
    justify-content: center;
    text-decoration: none;
    background-color: transparent;
    -webkit-appearance: none;
    -webkit-tap-highlight-color: transparent;
  }
  .mui-button-root {
    color: #fff;
    padding: 6px 16px;
    font-size: 0.875rem;
    min-width: 64px;
    box-sizing: border-box;
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-weight: 500;
    line-height: 1.75;
    border-radius: 4px;
    letter-spacing: 0.02857em;
    text-transform: uppercase;
  }
  .mui-button-contained {
    color: rgba(0, 0, 0, 0.87);
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
      0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
    background-color: #e0e0e0;
  }
  .mui-button-containedSizeSmall {
    padding: 4px 10px;
    font-size: 0.8125rem;
  }
</style>

<button class={buildClasses(classes)}>
  <span class="mui-button-label">
    <slot />
  </span>
</button>
