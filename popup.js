document.getElementById('linkedin').addEventListener('click', () => {
	chrome.tabs.create({
		active: true,
		url: 'https://www.linkedin.com/mynetwork/invite-connect/connections/',
	});
});

function injectTheScript() {
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		// query the active tab, which will be only one tab
		//and inject the script in it
		chrome.tabs.executeScript(tabs[0].id, { file: 'content_script.js' });
	});
}

document.getElementById('import').addEventListener('click', injectTheScript);

// document.getElementById('import').addEventListener('click', () => {

// 	function getDOM() {
// 		//check link is linkedin.com?

// 		let elements = document
// 			.getElementById('ember51')
// 			.getElementsByTagName('li');

// 		for (i = 0; i < elements.length; i++) {
// 			this.scrapeProfile(elements[i]);
// 		}
// 		// elements.map((item) => {
// 		// 	alert(item);
// 		// });
// 		// elements.map((item) => {
// 		// 	filtered.push(item.getElementsByClassName('mn-connection-card__name'));
// 		// });

// 		// let contacts = document.getElementsByClassName('mn-connection-card__name');
// 		// let display = '';
// 		// for (let i = 0; i < contacts.length; i++) {
// 		// 	contacts[i] = contacts[i].innerHTML;
// 		// 	display = display + contacts[i].innerHTML;
// 		// }
// 		// alert(display);
// 		return ['hello'];
// 	}

// 	chrome.tabs.executeScript(
// 		{
// 			code: '(' + getDOM + ')();',
// 		},
// 		(results) => {
// 			console.log('Popup script:');
// 			console.log(results[0]);
// 		}
// 	);
// });
