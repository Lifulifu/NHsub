
<div class="tag">
  <a {href} class="count">{ catAbbr }</a>
  <a {href} class="name">{ val }</a>
  <span class="remove" style="cursor: pointer;" on:click={() => removeSub(idx)}>X</span>
</div>

<script>
  export let val = "";
  export let field = "";
  export let idx = -1;
  import { createEventDispatcher } from 'svelte';
  import { onMount } from 'svelte';

	const dispatch = createEventDispatcher();

  const ROOT = "https://nhentai.net";
  let href = (field == "" 
    ? `${ROOT}/search/?q="${val}"`
    : `${ROOT}/search/?q=${field}:"${val}"`
  );

  let catAbbr = ( // category abbreviation (artist -> ART)
    field == "" 
    ? "NA"
    : field.slice(0, 3).toUpperCase()
  );

  function removeSub(i) {
    dispatch('removeTag', { 'idx': i });
  }

  onMount(() => console.log('tag props:', field, val));

</script>

<style>
  .tag {
    display: flex;
    flex-direction: row;
  }

  .remove {
    background-color: rgb(187, 41, 109);
    padding: 0 0.4em;
  }


</style>
