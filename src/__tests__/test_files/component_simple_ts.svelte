<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let propGeneric: string;

  const dispatch = createEventDispatcher();

  function sayHello() {
    dispatch("message", {
      text: "Hello!",
    });
  }
</script>

<button on:click={sayHello}>Fire Event</button>
