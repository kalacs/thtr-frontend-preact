<script>
  import MovieCollection from "../components/MovieCollection.svelte";

  const collections = [
    {
      id: 1,
      title: "Újdonságok",
      layout: "tile",
      action: "getTrendingMovies",
    },
    {
      id: 2,
      title: "Népszerű",
      layout: "tile",
      action: "getPopularMovies",
    },
    {
      id: 3,
      title: "Legjobb értékelés",
      layout: "tile",
      action: "getTopRatedMovies",
    },
    {
      id: 16,
      title: "Animációs",
      layout: "tile",
      action: "getMoviesByGenre",
      params: {
        genres: [16],
        sort_by: "release_date.desc",
        region: "HU",
      },
    },
    {
      id: 10751,
      title: "Családi",
      layout: "tile",
      action: "getMoviesByGenre",
      params: {
        genres: [10751],
        sort_by: "release_date.desc",
      },
    },
    {
      id: 35,
      title: "Vígjáték",
      layout: "tile",
      action: "getMoviesByGenre",
      params: {
        genres: [35],
        sort_by: "release_date.desc",
      },
    },
    {
      id: 14,
      title: "Fantasy",
      layout: "tile",
      action: "getMoviesByGenre",
      params: {
        genres: [14],
        sort_by: "release_date.desc",
      },
    },
    {
      id: 28,
      title: "Akció",
      layout: "tile",
      action: "getMoviesByGenre",
      params: {
        genres: [28],
        sort_by: "release_date.desc",
      },
    },
    {
      id: 12,
      title: "Kaland",
      layout: "tile",
      action: "getMoviesByGenre",
      params: {
        genres: [12],
        sort_by: "release_date.desc",
      },
    },
    {
      id: 10749,
      title: "Romantikus",
      layout: "tile",
      action: "getMoviesByGenre",
      params: {
        genres: [10749],
        sort_by: "release_date.desc",
      },
    },
    {
      id: 80,
      title: "Bűnügyi",
      layout: "tile",
      action: "getMoviesByGenre",
      params: {
        genres: [80],
        sort_by: "release_date.desc",
      },
    },
    {
      id: 99,
      title: "Dokumentum",
      layout: "tile",
      action: "getMoviesByGenre",
      params: {
        genres: [99],
        sort_by: "release_date.desc",
      },
    },
    {
      id: 18,
      title: "Dráma",
      layout: "tile",
      action: "getMoviesByGenre",
      params: {
        genres: [18],
        sort_by: "release_date.desc",
      },
    },
    {
      id: 36,
      title: "Történelmi",
      layout: "tile",
      action: "getMoviesByGenre",
      params: {
        genres: [36],
        sort_by: "release_date.desc",
      },
    },
    {
      id: 9648,
      title: "Rejtély",
      layout: "tile",
      action: "getMoviesByGenre",
      params: {
        genres: [9648],
        sort_by: "release_date.desc",
      },
    },
    {
      id: 878,
      title: "Sci-Fi",
      layout: "tile",
      action: "getMoviesByGenre",
      params: {
        genres: [878],
        sort_by: "release_date.desc",
      },
    },
    {
      id: 53,
      title: "Thriller",
      layout: "tile",
      action: "getMoviesByGenre",
      params: {
        genres: [53],
        sort_by: "release_date.desc",
      },
    },
    {
      id: 27,
      title: "Horror",
      layout: "tile",
      action: "getMoviesByGenre",
      params: {
        genres: [27],
        sort_by: "release_date.desc",
      },
    },
  ];
</script>

<svelte:head>
  <title>Movies</title>
</svelte:head>

<div class="movies">
  {#each collections as collection, index (collection.id)}
    <MovieCollection {...collection} {index} />
  {/each}
</div>
