import { sendWork } from "./api.js";

export function showErrMsg(input, msg) {
    // Find Message Box
    let msgBox = input.nextElementSibling;
    if(!msgBox.classList.contains('error-msg')) {
        msgBox = document.querySelector(`[data-error-msg=${input.id}]`);
    }
    if(input.classList.contains('error')) {
        input.classList.remove('error');
    }

    msgBox.innerText = msg;
    if(input.type !== "submit") {
        input.classList.add('error');
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
    } else {
        // CLEAR ERROR MSG OF INPUT CHANGE (LOGIN CASE)
        const allInput = document.querySelectorAll("input:not([type=submit]");
        for(input of allInput){
            if(!input.classList.contains('evented-submit')) {
                input.addEventListener('input', ()=>{
                    if(msgBox && msgBox!=='') {
                        msgBox.innerText = '';
                    }
                });
            }
            input.classList.add('evented-submit');
        }
    }
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
        showErrMsg(img, "Image manquante");
    } else if (uploadedImg.size/1000000 > 4) {
        showErrMsg(img, "Fichier trop lourd (>4Mo)");
    } else if (uploadedImg.type !== "image/png" && uploadedImg.type !== "image/jpeg") {
        showErrMsg(img, "Format d'image incorrect (PNG ou JPEG)");
    } else if(title.value === '') {
        showErrMsg(title, "Titre manquant");
    } else {
        const success = await sendWork(uploadedImg, title.value, cat.value);
        return success;
    }
}