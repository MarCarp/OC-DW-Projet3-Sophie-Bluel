import { logging } from "./api.js";
// DOM
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginForm = document.getElementById('login');
const submitBtn = loginForm.querySelector('[type=submit]');

// FUNCTIONS
function validateLog(data) {
    sessionStorage.setItem('token', data.token);
    sessionStorage.setItem('isLogged', true);
    window.location.href = '/FrontEnd/';
}

function formValidation(field) {
    const fieldType = field.type;

    switch(fieldType) {
        case 'email':
            if(field.value === '') {
                console.log("mail cannot be empty");
                return false;
            } 
        break;
        case 'password':
            if(field.value === '') {
                console.log("password cannot be empty");
                return;

            }
        break;
    }
    return true;
}

async function formSubmit(event) {
    event.preventDefault();

    if(formValidation(emailInput) && formValidation(passwordInput)) {
        const data = await logging(emailInput.value, passwordInput.value);
        validateLog(data);
    }
}

// EVENT LISTENER
submitBtn.addEventListener('click', formSubmit);