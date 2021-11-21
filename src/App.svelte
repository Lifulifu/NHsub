
<script>
	import { onMount } from 'svelte';
	import TiRefresh from 'svelte-icons/ti/TiRefresh.svelte'

	import Tag from './Tag.svelte';
	import Book from './Book.svelte';
	import Nhentai from './nhentai';

	let settings = {
		maxBooks: 40,
		batchSize: 8,
	};

	let nh = new Nhentai();
	let subs = [];
	let books = [];
	let inputSubVal = '';
	let inputSubField = '';
	
	function addSub(val, field='') {
		if(val.length == 0)
			return;

		subs = [...subs, {
			val: val,
			field: field,
		}];
		console.log('add new sub.');

		setToStorage({'subs': subs});
		console.log('update subs to storage.')
	}

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

	function getFromStorage(key) {
		return new Promise((resolve, reject) => 
			chrome.storage.sync.get(key, (result) => { resolve(result); })
		);
	}
	
	function setToStorage(obj) {
		return new Promise((resolve, reject) =>
			chrome.storage.sync.set(obj, () => { resolve(); })
		);
	}
	
	async function setBooks() {
		let res = await searchSubsResultBatch(settings.batchSize);
		res.sort((a, b) => parseInt(b['upload_date'] - a['upload_date']));
		books = res.slice(0, settings.maxBooks);
		console.log(books);
	}


	
	onMount(async () => {
		console.log('NHsub app onMount.')
		let res = await getFromStorage('subs');
		subs = res['subs'];
		setBooks();
	});


</script>

<main>

	<div class="container">
		<h2>Subscribed</h2>
		<div>
			<input type="text" id="add-input" bind:value={ inputSubVal }>
			<div class="btn btn-primary" on:click={ addSub(inputSubVal) }>add</div>
		</div>
		<div class="tag-container">
			{#each subs as sub}
				<Tag data={ sub }></Tag>
			{/each}
		</div>
	</div>

	<div class="container">
		<div class="container-title">
			<h2>New Uploads</h2>
			<i><TiRefresh/></i>
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

	.container-title {
		align-items: center;
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	i {
		height: 50px;
		width: 50px;
	}
</style>