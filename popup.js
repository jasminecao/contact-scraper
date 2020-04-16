document.getElementById('linkedin').addEventListener('click', () => {
	chrome.tabs.create({
		active: true,
		url: 'https://www.linkedin.com/search/results/people/?facetNetwork=%5B%22F%22%5D&origin=MEMBER_PROFILE_CANNED_SEARCH',
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