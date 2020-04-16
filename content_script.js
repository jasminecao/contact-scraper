function scroll(callback) {
  window.scrollBy(0, document.body.scrollHeight);
  window.setTimeout(callback, 1000);
}

function getContacts() {
  let elements = document.getElementById('ember65').getElementsByClassName('search-results__list')[0].getElementsByTagName('li');
  let data = {};
  let nextButton = document.getElementsByClassName('artdeco-pagination__button--next')[0];
  if (!nextButton.disabled) {
    for (i = 3; i < elements.length; i++) {
      scrapeProfile(elements[i]);
    }
    nextButton.click();
    console.log('clicked');
    scroll(getContacts);
  }
}

const scrapeProfile = (contact) => {
	const profileLink = contact.getElementsByClassName(
		'search-result__result-link ember-view'
  )[0];
  //profileLink.click();
};

scroll(getContacts);