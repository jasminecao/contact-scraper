// let request = makeHttpObject();
let profiles = [];
function scroll(callback) {
	window.scrollBy(0, document.body.scrollHeight);
	window.setTimeout(callback, 1000);
}

function getContacts() {
	let elements = document
		.getElementById('ember65')
		.getElementsByClassName('search-results__list')[0]
		.getElementsByTagName('li');
	let data = {};
	let nextButton = document.getElementsByClassName(
		'artdeco-pagination__button--next'
	)[0];
	if (!nextButton.disabled) {
		scrapeProfile(elements[3]);
		// for (i = 3; i < elements.length; i++) {
		// 	scrapeProfile(elements[i]);
		// }
		// nextButton.click();
		// scroll(getContacts);
	}
}

function makeHttpObject() {
	try {
		return new XMLHttpRequest();
	} catch (error) {}
	try {
		return new ActiveXObject('Msxml2.XMLHTTP');
	} catch (error) {}
	try {
		return new ActiveXObject('Microsoft.XMLHTTP');
	} catch (error) {}

	throw new Error('Could not create HTTP request object.');
}

const scrapeProfile = async (contact) => {
	const profileLink = contact.getElementsByClassName(
		'search-result__result-link ember-view'
	)[0];
	profileLink.startScraping(function (res) {
		console.log(res);
	});
};

const startScraping = (callback) => {
	// showLoading();
	const profile = {
		skills: [],
	};

	window.scroll({
		top: document.body.clientHeight,
		left: 0,
		behavior: 'smooth',
	});

	setTimeout(() => {
		profile.Name = document
			.querySelector('.pv-top-card--list')
			.getElementsByTagName('li')[0]
			.textContent.trim();
		profile.Image = document.querySelector(
			'.profile-photo-edit__preview, .pv-top-card__photo'
		).src;

		const hasAbout = document.querySelector('.pv-about__summary-text');
		profile.About = hasAbout ? hasAbout.textContent.trim() : '';

		window.scroll({
			top: document.body.clientHeight,
			left: 0,
			behavior: 'smooth',
		});

		const experience_nodes = document
			.querySelector('.pv-profile-section.experience-section')
			.getElementsByTagName('li');

		profile.experience = [];
		for (const node of experience_nodes) {
			const titleElement = node.querySelector('h3');
			const title =
				titleElement && titleElement.innerText ? titleElement.innerText : null;

			const companyElement = node.querySelector('.pv-entity__secondary-title');
			const company =
				companyElement && companyElement.innerText
					? companyElement.innerText
					: null;

			const descriptionElement = node.querySelector('.pv-entity__description');
			const description =
				descriptionElement && descriptionElement.innerText
					? descriptionElement.innerText
					: null;

			const dateRangeElement = node.querySelector(
				'.pv-entity__date-range span:nth-child(2)'
			);
			const dateRangeText =
				dateRangeElement && dateRangeElement.innerText
					? dateRangeElement.innerText
					: null;

			const startDatePart = dateRangeText ? dateRangeText.split('–')[0] : null;
			const startDate = startDatePart ? startDatePart : null;

			const endDatePart = dateRangeText ? dateRangeText.split('–')[1] : null;
			const endDate = endDatePart ? endDatePart : null;

			const locationElement = node.querySelector(
				'.pv-entity__location span:nth-child(2)'
			);
			const location =
				locationElement && locationElement.innerText
					? locationElement.innerText
					: null;

			profile.experience.push({
				title,
				company,
				location,
				description,
				startDate,
				endDate,
			});
		}
		profile.education = [];
		const education_nodes = document
			.querySelector('.pv-profile-section.education-section')
			.getElementsByTagName('li');

		for (const node of education_nodes) {
			const schoolNameElement = node.querySelector('h3.pv-entity__school-name');
			const schoolName =
				schoolNameElement && schoolNameElement.innerText
					? schoolNameElement.innerText
					: null;

			const fieldOfStudyElement = node.querySelector(
				'.pv-entity__fos .pv-entity__comma-item'
			);
			const degree =
				fieldOfStudyElement && fieldOfStudyElement.innerText
					? fieldOfStudyElement.innerText
					: null;

			const dateRangeElement = node.querySelectorAll('.pv-entity__dates time');

			const startDatePart =
				dateRangeElement && dateRangeElement[0] && dateRangeElement[0].innerText
					? dateRangeElement[0].innerText
					: null;
			const startDate = startDatePart ? startDatePart : null;

			const endDatePart =
				dateRangeElement && dateRangeElement[1] && dateRangeElement[1].innerText
					? dateRangeElement[1].innerText
					: null;
			const endDate = endDatePart ? endDatePart : null;

			profile.education.push({
				schoolName,
				degree,
				startDate,
				endDate,
			});
		}
		// var expandedSkills = document.getElementById('skill-categories-expanded');
		// var topSkills = document.getElementById(
		// 	'pv-skill-categories-section__top-skills'
		// );
		// var allSkills = document.getElementsByClassName(
		// 	'pv-skill-category-entity__skill-wrapper'
		// );

		// console.log(profile);
		// if (
		// 	skillPanelBtn.getElementsByTagName('span')[0].textContent.trim() ===
		// 	'Show more'
		// ) {
		// 	skillPanelBtn.click();
		// 	console.log('click');
		// }

		// setTimeout(() => {
		// 	let skillsView = document.getElementById('skill-categories-expanded');
		// 	console.log(skillsView);
		// for (let child of skillsView.children) {
		// 	let category = child.getElementsByTagName('h3')[0].textContent.trim();
		// 	let skills = [];
		// 	for (let skill of child.getElementsByTagName('ol')[0].children) {
		// 		skills.push(
		// 			skill
		// 				.querySelector('.pv-skill-category-entity__name-text')
		// 				.textContent.trim()
		// 		);
		// 	}
		// 	profile.skills.push({
		// 		category,
		// 		skills,
		// 	});
		// }

		document.querySelector('a[data-control-name=contact_see_more]').click();

		setTimeout(() => {
			const profileInfoView = document.querySelector(
				'.pv-profile-section__section-info.section-info'
			);
			for (let child of profileInfoView.children) {
				let title = child.getElementsByTagName('header')[0].innerText;
				for (let section of child.children) {
					if (
						(title === 'Birthday' || title === 'Phone') &&
						section.getElementsByTagName('span').length > 0
					) {
						profile[title] = section.getElementsByTagName('span')[0].innerText;
					} else if (
						title === 'Email' &&
						section.getElementsByTagName('a').length > 0
					) {
						profile[title] = section.getElementsByTagName('a')[0].innerText;
					} else if (section.getElementsByTagName('a').length > 0) {
						profile[title] = section.getElementsByTagName('a')[0].href;
					}
				}
			}

			document.querySelector('button[data-test-modal-close-btn]').click();
			window.scroll({
				top: 0,
				left: 0,
				behavior: 'smooth',
			});
			callback(profile);
			// dismissLoading();
		}, 1000);
		// }, 1000);
	}, 3000);
};

const spinnerTemplate = `
	<div class="sk-chase">
		<div class="sk-chase-dot"></div>
		<div class="sk-chase-dot"></div>
		<div class="sk-chase-dot"></div>
		<div class="sk-chase-dot"></div>
		<div class="sk-chase-dot"></div>
		<div class="sk-chase-dot"></div>
	</div>
`;

const showLoading = () => {
	const backdrop = document.createElement('div');
	backdrop.className = 'backdrop';
	backdrop.innerHTML = spinnerTemplate;
	document.body.appendChild(backdrop);
	document.body.style.overflow = 'hidden';
	document.querySelector('#extended-nav').style.position = 'relative';
};

const dismissLoading = () => {
	document.querySelector('.backdrop').remove();
	document.body.style.overflow = 'auto';
	document.querySelector('#extended-nav').style.position = 'fixed';
};

// const renderAppCard = () => {
// 	const cardTemplate = `
// 		<section class="main__container">
// 			<h1 align='center' class="logo">Send Profile</h1>
// 		</section>
// 	`;

// 	const container = document.querySelector('.pv-content__right-rail');
// 	const card = document.createElement('div');
// 	card.className = 'appCard';
// 	card.innerHTML = cardTemplate;
// 	container.insertBefore(card, container.firstChild);

// 	const isValidateUrl = (url) => {
// 		var re = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
// 		return re.test(String(url).toLowerCase());
// 	};

// 	const getInputElement = (type) => {
// 		const inputElement = document.createElement('input');
// 		inputElement.type = type;
// 		inputElement.placeholder = 'Backend End-Point';
// 		inputElement.className = 'input';
// 		return inputElement;
// 	};

// 	const getActionBtn = (text) => {
// 		const btn = document.createElement('a');
// 		btn.className = 'btn';
// 		btn.appendChild(document.createTextNode(text));
// 		return btn;
// 	};

// 	const getStatusLabel = (text = '') => {
// 		const label = document.createElement('p');
// 		label.className = 'label';
// 		label.appendChild(document.createTextNode(text));
// 		return label;
// 	};

// 	const status = {
// 		error: 'Invalid Url',
// 		currect: 'Currect',
// 	};

// 	// Element References
// 	const inputElement = getInputElement('email');
// 	const actionBtn = getActionBtn('Send');
// 	const label = getStatusLabel('');
// 	const mainContainer = document.querySelector('.main__container');
// 	const inputContainer = document.createElement('div');
// 	inputContainer.className = 'input__container';

// 	// Appending all children to the container
// 	inputContainer.appendChild(inputElement);
// 	mainContainer.appendChild(inputContainer);
// 	mainContainer.appendChild(label);
// 	mainContainer.appendChild(document.createElement('br'));
// 	mainContainer.appendChild(document.createElement('br'));
// 	mainContainer.appendChild(actionBtn);

// 	const setButtonStatus = (status) => {
// 		if (status) {
// 			actionBtn.style.pointerEvents = 'auto';
// 			actionBtn.style.opacity = 1;
// 		} else {
// 			actionBtn.style.pointerEvents = 'none';
// 			actionBtn.style.opacity = 0.5;
// 		}
// 	};
// 	setButtonStatus(false);

// 	const validate = (url) => {
// 		if (isValidateUrl(url)) {
// 			inputContainer.classList.remove('invalid');
// 			label.innerText = '';
// 			inputContainer.classList.add('currect');
// 			setButtonStatus(true);
// 		} else if (url.length > 0) {
// 			inputContainer.classList.add('invalid');
// 			label.innerText = status.error;
// 			setButtonStatus(false);
// 		} else {
// 			inputContainer.classList.remove('currect');
// 			inputContainer.classList.remove('invalid');
// 			label.innerText = '';
// 			setButtonStatus(false);
// 		}
// 	};

// 	// Html Events Callbacks
// 	inputElement.onmouseover = (e) => {
// 		inputContainer.classList.add('hover');
// 	};

// 	inputElement.onmouseleave = (e) => {
// 		inputContainer.classList.remove('hover');
// 	};

// 	inputElement.oninput = (e) => {
// 		validate(e.target.value);
// 	};

// 	chrome.storage.sync.get(['endPoint'], (result) => {
// 		inputElement.value = result.endPoint || '';
// 		validate(inputElement.value);
// 	});

// 	actionBtn.onclick = async () => {
// 		chrome.storage.sync.set({ endPoint: inputElement.value }, () => {});
// 		startScraping(inputElement.value);
// 	};
// };

// Initialize The Custom Alert
// (() => {
// 	var ALERT_TITLE = 'Oops!';
// 	var ALERT_BUTTON_TEXT = 'Ok';

// 	if (document.getElementById) {
// 		window.alert = function (txt) {
// 			createCustomAlert(txt);
// 		};
// 	}

// 	function createCustomAlert(txt) {
// 		const d = document;

// 		if (d.getElementById('modalContainer')) return;

// 		const mObj = d
// 			.getElementsByTagName('body')[0]
// 			.appendChild(d.createElement('div'));
// 		mObj.id = 'modalContainer';
// 		mObj.style.height = d.documentElement.scrollHeight + 'px';

// 		const alertObj = mObj.appendChild(d.createElement('div'));
// 		alertObj.id = 'alertBox';
// 		if (d.all && !window.opera)
// 			alertObj.style.top = document.documentElement.scrollTop + 'px';
// 		alertObj.style.left =
// 			(d.documentElement.scrollWidth - alertObj.offsetWidth) / 2 + 'px';
// 		alertObj.style.visiblity = 'visible';

// 		const h1 = alertObj.appendChild(d.createElement('h1'));
// 		h1.appendChild(d.createTextNode(ALERT_TITLE));

// 		const msg = alertObj.appendChild(d.createElement('p'));
// 		msg.innerHTML = txt;

// 		const btn = alertObj.appendChild(d.createElement('a'));
// 		btn.id = 'closeBtn';
// 		btn.appendChild(d.createTextNode(ALERT_BUTTON_TEXT));
// 		btn.href = '#';
// 		btn.focus();
// 		btn.onclick = () => {
// 			removeCustomAlert();
// 			return false;
// 		};

// 		alertObj.style.display = 'block';
// 	}

// 	const removeCustomAlert = () => {
// 		document
// 			.getElementsByTagName('body')[0]
// 			.removeChild(document.getElementById('modalContainer'));
// 	};
// })();

// scroll(getContacts);

// startScraping(null);
scroll(getContacts);
