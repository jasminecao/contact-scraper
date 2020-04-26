const links = [];

function scroll(callback) {
	window.scrollBy(0, document.body.scrollHeight);
	window.setTimeout(callback, 1000);
}

function getContacts() {
	let elements = document
		.getElementsByClassName('search-results__list')[0]
		.getElementsByTagName('li');
	let data = {};
	let nextButton = document.getElementsByClassName(
		'artdeco-pagination__button--next'
	)[0];
	if (!nextButton.disabled) {
		for (i = 3; i < elements.length; i++) {
			scrapeProfile(elements[i]);
		}
		nextButton.click();
		scroll(getContacts);
	} else {
		sendLinks();
	}
}

const scrapeProfile = (contact) => {
	const profileLink = contact.getElementsByClassName(
		'search-result__result-link ember-view'
	)[0];
	if (profileLink) {
		links.push(profileLink.href);
	}
};

const sendLinks = () => {
	var xhr = new XMLHttpRequest();

	xhr.open('POST', 'http://localhost:3000/linkedin/getContacts', false);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.send(JSON.stringify({ data: links }));

	var result = xhr.responseText;
	console.log(result);
};

scroll(getContacts);
