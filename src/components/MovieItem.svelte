<script>
  import { IMAGE_BASE_URL, POSTER_L } from "../config/index";
  export let index;
  export let poster_path;
  export let id;
</script>

<style>
  .collection-item {
    position: relative;
    margin-right: 52px;
  }
  .collection-item .movie-image,
  .collection-item img {
    z-index: 1;
    border-radius: 10px;
    width: 270px;
  }

  :global(.collection-item[data-focus-active="1"]) {
    border: 2px solid red;
    border-radius: 10px;
    margin-right: 48px;
  }
</style>

{#if poster_path}
  <div
    class="collection-item"
    data-focus-column={index}
    data-movie-id={id}
    data-focus-active="0">
    <div class="movie-image">
      <img src={`${IMAGE_BASE_URL}${POSTER_L}${poster_path}`} alt="movie" />
    </div>
  </div>
{/if}
