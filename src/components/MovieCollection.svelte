<script>
  import { onMount } from "svelte";
  import Typography from "./mui/Typography.svelte";
  import MovieCollectionItem from "../components/MovieCollectionItem.svelte";
  import { requestCollectionData } from "../state/collections";
  import getTrackedState from "../state";
  import { getFrontendConfig, getCollectionData } from "../state/general";

  const state = getTrackedState();
  let movies;
  let appConfig;
  $: movies = getCollectionData($state, id);
  $: appConfig = getFrontendConfig($state);

  onMount(() => {
    state.dispatch(
      requestCollectionData({
        id,
        action,
        params: Object.assign({}, params, appConfig),
      })
    );
  });

  export let index;
  export let id;
  export let title;
  export let action;
  export let params;
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
    font-variant-caps: all-small-caps;
    margin: 15px 0;
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
    <Typography variant="h1" class="title">{title}</Typography>
    <MovieCollectionItem {movies} />
  </div>
</div>
