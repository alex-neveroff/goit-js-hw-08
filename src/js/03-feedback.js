import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const email = document.querySelector('.feedback-form input');
const message = document.querySelector('.feedback-form textarea');
const LOCALSTORAGE_KEY = 'feedback-form-state';
const dataFromForm = {};
const savedData = localStorage.getItem(LOCALSTORAGE_KEY);

form.addEventListener('input', throttle(dataToLocalStorage, 500));
form.addEventListener('submit', resetLocalStorage);

if (savedData) {
  try {
    const parsedData = JSON.parse(savedData);
    email.value = parsedData.email;
    message.value = parsedData.message;
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
}

function dataToLocalStorage(event) {
  event.preventDefault();
  dataFromForm.email = email.value;
  dataFromForm.message = message.value;
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(dataFromForm));
}

function resetLocalStorage(event) {
  event.preventDefault();
  console.log(dataFromForm);
  localStorage.removeItem(LOCALSTORAGE_KEY);
  event.target.reset();
}
