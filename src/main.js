import App from './App.svelte';


const TAB_NAME = 'NHsub';
const APP_ID = '_NHsub';
let app = {};


function createNHsubTab() {
	let div = document.createElement('div');
	let template = `
		<li class="desktop"><a style="cursor: pointer;">${TAB_NAME}</a></li>`;
	div.innerHTML = template.trim();
	return div.firstChild;
}

function onTabClick(tab) {
	return function () {
		// set selected class
		let children = Array.from(tab.parentNode.childNodes);
		children.forEach((child) => {child.classList.remove("active")});
		tab.classList.add("active");

		// init svelte app
		app = new App({
			target: document.getElementById(APP_ID),
			props: {}
		});

		// remove original content and show svelte app
		document.getElementById('content')?.remove();
		document.getElementById(APP_ID).style.display = "block";
	};
}

function setupNHsub() {
	// add tab
	let ul = document.querySelector('ul.menu.left');
	let tab = createNHsubTab(TAB_NAME);
	tab.addEventListener('click', onTabClick(tab), {'once': true});
	ul.append(tab);
	
	// add svelte app container
	let div = document.createElement('div');
	div.id = APP_ID;
	div.style.display = "none";
	document.body.append(div);
}


// setup DOM element for tab and container for svelte app
setupNHsub();



export default app;