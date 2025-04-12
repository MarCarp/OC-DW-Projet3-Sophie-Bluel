import { inputValidator, showErrMsg } from "./controller.js";
import { logging } from "./api.js";

// DOM
const submitBtn = document.querySelector('#login-container [type=submit]');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');


//LOGIN VALIDATION
function loginSuccess(data) {
    sessionStorage.setItem('token', data.token);
    window.location.href = '/';
}

async function formSubmit(event) {
    event.preventDefault();

    if(inputValidator(emailInput) && inputValidator(passwordInput)) {
        const data = await logging(emailInput.value, passwordInput.value);
        if(data.status === 200) {
            const parsedData = await data.json();
            loginSuccess(parsedData);
        } else {
            showErrMsg(submitBtn, "Identifiant ou mot de passe incorrect");
        }
    }
}

// EVENT LISTENER
submitBtn.addEventListener('click', formSubmit);