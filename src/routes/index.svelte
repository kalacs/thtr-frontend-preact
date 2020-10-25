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

  onKeydown("Enter", () => {});
  onKeydown(BUTTON_UP, () => {});
  onKeydown(BUTTON_DOWN, () => {});
  onKeydown(BUTTON_LEFT, () => {});
  onKeydown(BUTTON_RIGHT, () => {});

  const state = getTrackedState();
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
