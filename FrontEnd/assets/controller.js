import { sendWork } from "./api.js";
import { sendWorkSuccess } from "./view.js";

export function showErrMsg(input, msg) {
    // Find Message Box
    let msgBox = input.nextElementSibling;
    if(!msgBox.classList.contains('error-msg')) {
        console.log("yapa");
        msgBox = document.querySelector(`[data-error-msg=${input.id}]`);
    }
    if(input.classList.contains('error')) {
        input.classList.remove('error');
    }
    input.classList.add('error');
    if(msgBox) {
        msgBox.innerText = msg;
    } else {
        console.log(msg);
    }
    //CLEAN ERROR MSG ON INPUT CHANGE
    if(!input.classList.contains('evented')) {
        input.addEventListener('input', ()=>{
            input.classList.remove('error');
            if(msgBox && msgBox!=='') {
                msgBox.innerText = '';
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

export async function uploadValidation(img, title, cat) {
    const uploadedImg = img.files[0];
    if(!uploadedImg) {
        showErrMsg(img, "Doit y avoir une image");
    } else if (uploadedImg.size/1000000 > 4) {
        showErrMsg(img, "Img too big");
    }
    else if(title.value === '') {
        showErrMsg(title, "Pas de titre ?");
    } else {
        await sendWork(uploadedImg, title.value, cat.value);
        sendWorkSuccess();
    }
}