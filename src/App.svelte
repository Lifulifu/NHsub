
<main>

	<div class="container">
		<h2>Subscribed</h2>
		<div class="input-container"
			on:keyup={ (e) => { if(e.key === 'Enter') addSub(inputSubVal, inputSubField); } }>

			<div class="input-item field-input">
				<Dropdown
					bind:selectedIndex={ selectedFieldIdx }
					items={ fieldOptions } />
			</div>

			<input type="text" class="input-item str-input" bind:value={ inputSubVal }>
			<div class="input-item btn-input btn btn-primary"
				on:click={ (e) => addSub(inputSubVal, inputSubField) }>
				add
			</div>
		</div>

		<div class="tags-container">
			{#each subs as {field, val} (`${sub.field}#${sub.val}`)}
				<Tag data={sub} idx={sub.id} on:removeTag={ removeTag }></Tag>
			{/each}
		</div>
	</div>

	<div class="container">
		<div class="container-title">
			<h2>New Uploads</h2>
			<i class="reload" on:click={ () => onReloadClicked() }><TiRefresh/></i>
		</div>
		
		<div class="books-container">
			{#if loading}
			<div class="loading-container">
				<div>
					loading books... ({searchedSubs} / {subs.length})
				</div>
				<div class="loading">
					<div class="loading-bar" style="width: {100 * searchedSubs / subs.length}%"></div>
				</div>
			</div>
			{:else}
			{#each books as book (book.id)}
				<Book book={book}></Book>
			{/each}
			{/if}
		</div>
	</div>
</main>

<script>
	import { onMount } from 'svelte';
	import TiRefresh from 'svelte-icons/ti/TiRefresh.svelte'
	import { Dropdown } from "carbon-components-svelte";
	import "carbon-components-svelte/css/g90.css";

	import Tag from './Tag.svelte';
	import Book from './Book.svelte';
	import Nhentai from './nhentai';

	let nh = new Nhentai();
	let settings = {
		maxBooks: 40,
		batchSize: 3,
	};
	
	let subs = [];
	let books = [];
	let loading = true;
	let searchedSubs = 0;
	
	let fieldOptions = [
		{ id: 0, text: '-', val: '' },
		{ id: 1, text: 'artist', val: 'artist' },
		{ id: 2, text: 'parody', val: 'parody' },
		{ id: 3, text: 'character', val: 'character' },
		{ id: 4, text: 'tag', val: 'tag' }
	]
	let selectedFieldIdx = 0;
	
	let inputSubVal = '';
	$: inputSubField = fieldOptions[selectedFieldIdx]['val'];

	function addSub(val, field='') {
		if(val.length == 0)
			return;

		subs = [...subs, {
			val: val,
			field: field,
		}];
		console.log('add new sub', field, val);
		setToStorage({'subs': subs});
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
			searchedSubs = start;
		}
		searchedSubs = end;
		return result.flat().flat();  // batch -> page -> book
	}

	function getFromStorage(key) {
		console.log('get from storage:', key);
		return new Promise((resolve, reject) => 
			chrome.storage.sync.get(key, (result) => { resolve(result); })
		);
	}
	
	function setToStorage(obj) {
		console.log('set to storage:', Object.keys(obj));
		return new Promise((resolve, reject) =>
			chrome.storage.sync.set(obj, () => { resolve(); })
		);
	}
	
	async function setBooks() {
		searchedSubs = 0;
		let res = await searchSubsResultBatch(settings.batchSize);
		res.sort((a, b) => parseInt(b['upload_date'] - a['upload_date']));
		books = res.slice(0, settings.maxBooks);
	}

	async function onReloadClicked(force=false) {
		if(loading & !force) return;
		loading = true;
		await setBooks();
		loading = false;
		console.log('books loaded:', books);
	}

	function removeTag(e) {
		let idx = e.detail.idx;
		subs.splice(idx, 1);
		subs = subs; // to trigger update of reactive var
		setToStorage({'subs': subs});
		console.log('removed sub idx', idx);
	}


	
	onMount(async () => {
		console.log('NHsub app onMount.');
		let res = await getFromStorage('subs');
		subs = res['subs'];
		onReloadClicked(true);
	});


</script>

<style>
	.input-container {
		align-items: center;
		display: flex;
		flex-direction: row;
		height: 50px;
		justify-content: center;
	}
	
	.input-item {
		margin: 2px;
	}
	
	.input-container .field-input {
		width: 150px;
	}
	
	.input-container .str-input {
		padding: 0 0.1em 0 1em;
		height: 34px;
		border-radius: 0.3em;
	}

	.tags-container {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
	}

	.books-container {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
	}

	.loading {
		background-color: #363636;
		height: 10px;
		width: 500px;
	}

	.loading-bar {
		background-color: rgb(237,37,83);
		height: 100%;
		left: 0;
		transition: 500ms;
	}

	.container-title {
		align-items: center;
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.reload {
		border-radius: 50%;
		cursor: pointer;
		margin-left: 10px;
	}

	.reload:hover {
		background-color: #505050;
	}

	i {
		height: 50px;
		width: 50px;
	}
</style>