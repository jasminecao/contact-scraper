document.querySelector('form.login').addEventListener('submit', function(e) {
  e.preventDefault();

  let username = document.getElementById('username');
  let password = document.getElementById('password');

  console.log(username.value);
  console.log(password.value);
});