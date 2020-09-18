<script>
  import Typography from "./mui/Typography.svelte";
  import MovieCollectionItem from "../components/MovieCollectionItem.svelte";

  export let index;
  export let id;
  export let title;
</script>

<style>
  .collection-tile {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    margin-bottom: 20px;
  }
  .collection-tile :global(.title) {
    font-weight: bold;
    font-size: 2em;
  }
  .collection-tile :global(.inner) {
    display: -ms-flexbox;
    display: flex;
    cursor: pointer;
    overflow-x: scroll;
  }
</style>

<div data-focus-row={index} id={`collection-${id}`}>
  <div class="collection-tile">
    <Typography variant="h2" class="title">{title}</Typography>
    <MovieCollectionItem {...$$props} class="inner" />
  </div>
</div>
