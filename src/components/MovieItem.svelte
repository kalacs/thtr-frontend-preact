<script>
  export let index;
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
</style>

<div class="collection-item" data-focus-columns={index} data-movie-id={id}>
  <div class="movie-image">
    <img src="http://lorempixel.com/342/513/cats" alt="movie" />
  </div>
</div>
