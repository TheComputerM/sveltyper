<script>
  /**
   * @event {{ key: string }} button:key
   */

  export let key = "";

  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  $: dispatch("button:key", { key });
</script>

<button on:click>
  Helo
</button>
