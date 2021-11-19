
<a {href} class="tag">
  <span class="count">{ catAbbr }</span>
  <span class="name">{ data.val }</span>
  <span class="remove">X</span>
</a>

<script>
  export let data = { val: "", field: "" };

  const ROOT = "https://nhentai.net";
  let href = `${ROOT}/search/?q=${data.field}:"${data.val}"`;

  let catAbbr = ( // category abbreviation (artist -> ART)
    data.field == "" 
    ? "NA"
    : data.field.slice(0, 3).toUpperCase()
  );

</script>

<style>
  .remove {
    background-color: rgb(143, 29, 82);
    padding: 0 0.4em;
  }
</style>
