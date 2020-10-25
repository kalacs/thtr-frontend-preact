<script>
  import MovieItem from "./MovieItem.svelte";
  export let movies = [];
</script>

<div class="inner">
  {#each movies as { poster_path, id }, index (id)}
    <MovieItem {poster_path} {id} {index} />
  {/each}
</div>
