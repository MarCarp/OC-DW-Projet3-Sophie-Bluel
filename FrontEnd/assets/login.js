import { logging } from "./api.js";

// DOM
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginForm = document.getElementById('login');
const submitBtn = loginForm.querySelector('[type=submit]');

// FUNCTIONS
function validateLog(data) {
    sessionStorage.setItem('token', data.token);
    sessionStorage.setItem('logStatus', 'in');
    window.location.href = '/FrontEnd/';
}

function showErrMsg(input, msg) {
    if(input.classList.contains('error')) {
        input.classList.remove('error');
    }
    input.classList.add('error');
    const msgBox = input.nextElementSibling;
    if(msgBox.classList.contains('error-msg')) {
        msgBox.innerText = msg;
    }

}

function formValidation(field) {
    const fieldType = field.type;
    let validation = true;
    let message = 'Il y a une erreur dans ce champ';
    switch(fieldType) {
        case 'email':
            if(field.value === '') {
                message = 'Veuillez entrer un mail';
                console.error("mail cannot be empty");
                validation = false;
            } 
        break;
        case 'password':
            if(field.value === '') {
                message = 'Veuillez entrer un mot de passe';
                console.error("password cannot be empty");
                validation = false;
            }
        break;
    }
    if(!validation) {
        showErrMsg(field, message);
    }
    return validation;
}

function updateInput(input) {
    input.classList.remove('error');
    const errorBox = input.nextElementSibling;
    if(errorBox.classList.contains('error-msg')) {
        errorBox.innerText = '';
    }
}

async function formSubmit(event) {
    event.preventDefault();

    if(formValidation(emailInput) && formValidation(passwordInput)) {
        const data = await logging(emailInput.value, passwordInput.value);
        switch(data.status) {
            case 200:
                const parsedData = await data.json();
                validateLog(parsedData);
            break;
            case 404:
                showErrMsg(emailInput, "Utilisateur non enregistré");
            break;
            case 401:
                showErrMsg(passwordInput, "Mot de passe incorrect");
            break;
        }
    }
}

// EVENT LISTENER
submitBtn.addEventListener('click', formSubmit);
emailInput.addEventListener('input', (e)=>updateInput(e.target));
passwordInput.addEventListener('input', (e)=>updateInput(e.target));