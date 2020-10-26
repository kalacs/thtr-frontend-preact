<script>
  import MovieCollection from "../components/MovieCollection.svelte";
  import getTrackedState from "../state";
  import { getCollections } from "../state/general";
  import { onKeydown } from "../hooks";
  import {
    BUTTON_DOWN,
    BUTTON_UP,
    BUTTON_LEFT,
    BUTTON_RIGHT,
  } from "../config/buttons";
  import {
    previousRow,
    nextRow,
    previousColumn,
    nextColumn,
  } from "../state/ui";

  const state = getTrackedState();
  const dispatch = state.dispatch.bind(state);
  onKeydown("Enter", () => {});
  onKeydown(BUTTON_UP, () => dispatch(previousRow()));
  onKeydown(BUTTON_DOWN, () => dispatch(nextRow()));
  onKeydown(BUTTON_LEFT, () => dispatch(previousColumn()));
  onKeydown(BUTTON_RIGHT, () => dispatch(nextColumn()));

  let collections = [];
  $: collections = getCollections($state);
</script>

<svelte:head>
  <title>Movies</title>
</svelte:head>

<div class="movies">
  {#each collections as { id, title, action, params }, index (id)}
    <MovieCollection {id} {title} {action} {index} {params} />
  {/each}
</div>
