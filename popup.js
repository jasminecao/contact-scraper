document.getElementById("linkedin").addEventListener('click', () => {
  chrome.tabs.create({active: true, url: 'https://www.linkedin.com/mynetwork/invite-connect/connections/'})
});

document.getElementById("import").addEventListener('click', () => {
  function getDOM() {
      //check link is linkedin.com?
      console.log(document.body);
      let contacts = document.getElementsByClassName("mn-connection-card__name");
      let display = "";
      for (let i = 0; i < contacts.length; i++) {
        contacts[i] = contacts[i].innerHTML;
        display = display + contacts[i].innerHTML;
      }
      alert(display);
      return contacts;
  }

  chrome.tabs.executeScript({
      code: '(' + getDOM + ')();'
  }, (results) => {
      console.log('Popup script:')
      console.log(results[0]);
  });
});