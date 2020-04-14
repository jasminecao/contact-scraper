function getContacts() {
	//check link is linkedin.com?
	let elements = document.getElementById('ember51').getElementsByTagName('li');
	let data = {};
	for (i = 3; i < elements.length; i++) {
		scrapeProfile(elements[i]);
	}
	// let contacts = document.getElementsByClassName('mn-connection-card__name');
	// let display = '';
	// for (let i = 0; i < contacts.length; i++) {
	// 	contacts[i] = contacts[i].innerHTML;
	// 	display = display + contacts[i].innerHTML;
	// }
	// alert(display);
}

const scrapeProfile = (contact) => {
	const profileLink = contact.getElementsByClassName(
		'mn-connection-card__link ember-view'
	)[0];
	profileLink.click();
};

getContacts();
