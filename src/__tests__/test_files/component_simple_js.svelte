<script>
  import { createEventDispatcher } from "svelte";

  export let propGeneric;

  const dispatch = createEventDispatcher();
</script>

<button on:click={() => dispatch("message", "detail value")}>Fire Event</button>

<div>
  <slot />
</div>

<style>
  div {
    background-color: var(--color-background, #fff);
  }
</style>
