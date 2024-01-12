/* eslint-disable no-unused-vars */
const btnEl = document.getElementById('purple-btn');

function submitForm(event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const difficulty = document.querySelector('input[name="difficulty"]:checked');
  sessionStorage.setItem('USER', name);
  sessionStorage.setItem('DIFFICULTY', difficulty.value);
  window.location.href = 'game.html';
}

btnEl.addEventListener('click', submitForm);
