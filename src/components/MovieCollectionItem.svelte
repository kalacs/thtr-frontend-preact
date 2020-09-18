<script>
  import MovieItem from "./MovieItem.svelte";
  const movies = [
    { id: 2324 },
    { id: 2345454 },
    { id: 34744 },
    { id: 276874 },
    { id: 23114 },
    { id: 2843 },
    { id: 7888 },
    { id: 7777 },
  ];
</script>

<div class="inner">
  {#each movies as movie, index (movie.id)}
    <MovieItem {...movie} {index} />
  {/each}
</div>
