<script>
  export let item = false;
  export let container = false;
  export let direction = "row";
  export let justify;
  export let alignItems;
  export let xs = 0;
  export let spacing = 0;

  const stripTemplate = (parts) => parts;
  const combineArray = (base, other) =>
    base.map((item, index) => `${item}${other[index] || ""}`).join("");
  const createClass = (condition, templateParts, params) =>
    condition ? combineArray(templateParts, params) : "";

  const containerClass = createClass(
    container,
    stripTemplate`mui-grid-container`,
    [""]
  );
  const itemClass = createClass(item, stripTemplate`mui-grid-item`, [""]);
  const justifyClass = createClass(
    justify,
    stripTemplate`mui-grid-justify-xs-${""}`,
    [justify]
  );
  const alignItemsClass = createClass(
    alignItems,
    stripTemplate`mui-grid-align-items-xs-${""}`,
    [alignItems]
  );
  const xsClass = createClass(xs, stripTemplate`mui-grid-grid-xs-${""}`, [xs]);
  const spacingClass = createClass(
    spacing,
    stripTemplate`mui-grid-spacing-xs-${""}`,
    [spacing]
  );
  const directionClass = createClass(
    direction === "column",
    stripTemplate`mui-grid-direction-xs-${""}`,
    [direction]
  );

  const classes = [
    "mui-grid-root",
    containerClass,
    justifyClass,
    alignItemsClass,
    itemClass,
    xsClass,
    spacingClass,
    directionClass,
  ];
</script>

<style>
  .mui-grid-container {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
  }

  .mui-grid-justify-xs-center {
    justify-content: center;
  }

  .mui-grid-align-items-xs-center {
    align-items: center;
  }

  .mui-grid-item {
    margin: 0;
    box-sizing: border-box;
  }

  .mui-grid-grid-xs-1 {
    flex-grow: 0;
    max-width: 8.333333%;
    flex-basis: 8.333333%;
  }

  .mui-grid-grid-xs-11 {
    flex-grow: 0;
    max-width: 91.666667%;
    flex-basis: 91.666667%;
  }

  .mui-grid-spacing-xs-3 {
    width: calc(100% + 24px);
    margin: -12px;
  }

  .mui-grid-direction-xs-column {
    flex-direction: column;
  }
</style>

<div class={classes.filter((item) => !!item).join(' ')}>
  <slot />
</div>
