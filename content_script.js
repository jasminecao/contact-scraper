function getContacts() {
	let elements = document.getElementById('ember65').getElementsByTagName('li');
	let data = {};
	for (i = 3; i < elements.length; i++) {
		scrapeProfile(elements[i]);
	}
}

const scrapeProfile = (contact) => {
	const profileLink = contact.getElementsByClassName(
		'search-result__result-link ember-view'
  )[0];
	profileLink.click();
};

getContacts();
