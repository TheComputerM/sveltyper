<script>
  /** @restProps {h1 | button} */

  let edit = false;
</script>

{#if edit}
  <button {...$$restProps} />
{:else}
  <h1 {...$$restProps}><slot /></h1>
{/if}
