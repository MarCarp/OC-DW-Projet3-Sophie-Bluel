// DOM
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginForm = document.getElementById('login');
const submitBtn = loginForm.querySelector('[type=submit]');

// FUNCTIONS
function validateLog(data) {
    sessionStorage.setItem('token', data.token);
    window.location.href = '/';
}

async function logging() {
    const loginBody = {
        "email": emailInput.value,
        "password": passwordInput.value
    };

    const loginData = {
        method: 'POST',
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(loginBody)
    };

    const resp = await fetch('http://localhost:5678/api/users/login', loginData);

    switch(resp.status) {
        case 200:
            const data = await resp.json();
            validateLog(data);
        break;
        case 404:
            console.log("Utilisateur non enregistré");
        break;
        case 401:
            console.log("Mot de passe foireux");
        break;
    }
    
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

function formSubmit(event) {
    event.preventDefault();

    if(formValidation(emailInput) && formValidation(passwordInput)) {
        logging();
    }
}

// EVENT LISTENER
submitBtn.addEventListener('click', formSubmit);