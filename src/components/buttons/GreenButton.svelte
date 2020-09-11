<script>
  import Button from "./Button.svelte";
  console.log($$props);
</script>

<style>
  :global() .green-button {
    color: green;
    background-color: green;
  }
</style>

<Button variant="contained" size="small" class="green-button">
  <slot />
</Button>
