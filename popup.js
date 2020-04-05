let importButton = document.getElementById('import');

chrome.storage.sync.get('color', function(data) {
  importButton.style.backgroundColor = data.color;
  importButton.setAttribute('value', data.color);
});

importButton.onclick = function(element) {
  let color = element.target.value;
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
        tabs[0].id,
        {code: 'document.body.style.backgroundColor = "' + color + '";'});
  });
};