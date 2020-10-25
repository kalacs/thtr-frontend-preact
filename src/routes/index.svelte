<script>
  import { onMount } from "svelte";

  import MovieCollection from "../components/MovieCollection.svelte";
  import getTrackedState from "../state";
  import { getCollections } from "../state/general";

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
