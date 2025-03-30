export function showErrMsg(input, msg) {
    if(input.classList.contains('error')) {
        input.classList.remove('error');
    }
    input.classList.add('error');
    const msgBox = input.nextElementSibling;
    if(msgBox.classList.contains('error-msg')) {
        msgBox.innerText = msg;
    }
    //CLEAN ERROR MSG ON INPUT CHANGE
    if(!input.classList.contains('evented')) {
        input.addEventListener('input', ()=>{
            input.classList.remove('error');
            const errorBox = input.nextElementSibling;
            if(errorBox.classList.contains('error-msg')) {
                errorBox.innerText = '';
            }
        })
    }
    input.classList.add('evented');
}

export function inputValidator(field) {
    const fieldType = field.type;
    let validation = true;
    let message = 'Il y a une erreur dans ce champ';
    if(field.value === '') {
        message = 'Veuillez remplir ce champ';
        validation = false;
    } else {
        switch(fieldType) {
            case 'email':
                const regex = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\.[a-z0-9._-]+");
                if(!regex.test(field.value)) {
                    message = 'Format de l\'email incorrect';
                    validation = false;
                } 
            break;
        }
    }
    if(!validation) {
        showErrMsg(field, message);
    }
    return validation;
}

//LOGIN VALIDATION
export function validateLog(data) {
    sessionStorage.setItem('token', data.token);
    window.location.href = '/FrontEnd/';
}