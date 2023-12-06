/* eslint-disable no-unused-vars */

function submitForm(event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const difficulty = document.querySelector('input[name="difficulty"]:checked').value;
  sessionStorage.setItem('USER', name);
  sessionStorage.setItem('DIFFICULTY', difficulty);
  window.location.href = 'game.html';
}
