
<div class="tag">
  <a {href} class="count">{ catAbbr }</a>
  <a {href} class="name">{ data.val }</a>
  <span class="remove" style="cursor: pointer;" on:click={() => removeSub(idx)}>X</span>
</div>

<script>
  export let data = { val: "", field: "" };
  export let idx = -1;
  import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

  const ROOT = "https://nhentai.net";
  let href = `${ROOT}/search/?q=${data.field}:"${data.val}"`;

  let catAbbr = ( // category abbreviation (artist -> ART)
    data.field == "" 
    ? "NA"
    : data.field.slice(0, 3).toUpperCase()
  );

  function removeSub(i) {
    dispatch('removeTag', { 'idx': i });
  }

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
