
<script>
	import { onMount } from 'svelte';
	import Tag from './Tag.svelte';
	import Book from './Book.svelte';
	import Nhentai from './nhentai';

	let settings = {
		maxBooks: 40,
		batchSize: 8,
	};

	let nh = new Nhentai();
	let subs = [
		{val: "shadowverse", field: "parody"},
		{val: "asanagi", field: "artist"},
		{val: "rape", field: ""},
		{val: "asanagi", field: "artist"},
		{val: "asanagi", field: "artist"},
		{val: "asanagi", field: "artist"},
		{val: "asanagi", field: "artist"},
		{val: "asanagi", field: "artist"},
		{val: "asanagi", field: "artist"},
		{val: "asanagi", field: "artist"},
		{val: "asanagi", field: "artist"},
		{val: "asanagi", field: "artist"},
		{val: "asanagi", field: "artist"},
		{val: "asanagi", field: "artist"},
		{val: "asanagi", field: "artist"},
		{val: "asanagi", field: "artist"},
		{val: "asanagi", field: "artist"},
	];
	let books = [];
	
	async function searchSubsResultAll(subs) {
		let promises = subs.map((sub) => nh.search(sub.val, sub.field, 1, 'date'));
		return await Promise.all(promises);
	}

	async function searchSubsResultBatch(batchSize=5) {
		let result = [];
		let start = 0;
		let end = Math.min(start+batchSize, subs.length);
        while(start < subs.length) {
			result.push(
				await searchSubsResultAll(subs.slice(start, end)));
			console.log(`searching query ${end}/${subs.length}`);
			start = end;
			end = Math.min(start+batchSize, subs.length);
		}
		return result.flat().flat();  // batch -> page -> book
	}

	onMount(async () => {
		let res = await searchSubsResultBatch(settings.batchSize);
		res.sort((a, b) => parseInt(b['upload_date'] - a['upload_date']));
		books = res.slice(0, settings.maxBooks);
		console.log(books);
	});


</script>

<main>
	<h1>NHsub</h1>
	<div class="container">

		<form>
			<input type="text" id="add-input">
			<button class="btn btn-primary">add</button>
		</form>

		<div class="tag-container">
			{#each subs as sub}
				<Tag data={sub}></Tag>
			{/each}
		</div>

		<div class="books-container">
			{#each books as book}
				<Book book={book}></Book>
			{/each}
		</div>

	</div>
</main>

<style>
	input {
		padding: 0 0.1em 0 1em;
		height: 40px;
	}

	.books-container {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
	}
</style>