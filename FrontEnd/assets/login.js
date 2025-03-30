import { inputValidator, showErrMsg, validateLog } from "./controller.js";
import { logging } from "./api.js";

// DOM
const submitBtn = document.querySelector('#login [type=submit]');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

async function formSubmit(event) {
    event.preventDefault();

    if(inputValidator(emailInput) && inputValidator(passwordInput)) {
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