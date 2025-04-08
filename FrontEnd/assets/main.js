import { loadMain, viewMode, modalStatus, modalNav, uploadPreview, sendWorkDone } from './view.js';
import { uploadValidation } from './controller.js';

//////////////////////// DOM //////////////////////
const logout = document.getElementById("logout");
// DOM - MODAL
const modalOverlay = document.getElementById('modal-overlay');
// DOM - MODAL - CONTROLS
const modalOpenBtn = document.getElementById("modal-gallery-btn");
const backtn = modal.querySelector('#back');
const closeBtn = modal.querySelector('#close');
// DOM - MODAL - UPLOAD ZONE
const sendWorkBtn = modal.querySelector('#send-work-btn');
const addWorkBtn = modal.querySelector('#add-work-btn');
const imgUploadBtn = document.getElementById('upload-work');

const uploadTitle = document.getElementById('add-work-title');
const uploadCategory = document.getElementById('add-work-category');

////////////////// EVENT LISTENERS ////////////////
// EL - LOGOUT
logout.addEventListener("click", ()=>{
    sessionStorage.removeItem('token');
    viewMode();
});

// EL - OPEN MODAL
modalOpenBtn.addEventListener('click', ()=>modalStatus('open'));
// EL - CLOSING MODAL
// Closing with "X" button
closeBtn.addEventListener('click', ()=>modalStatus('close'));
// Closing by clicking outside the modal
modalOverlay.addEventListener('click', (event)=>{
    if(event.target === modalOverlay) {
        modalStatus('close');
    }
});
//EL - MODAL NAVIGATION
backtn.addEventListener('click', ()=>modalNav('gallery'));
addWorkBtn.addEventListener('click', ()=>modalNav('add-work'));
//EL - MODAL UPLOAD ZONE
// EL - LOAD IMG PREVIEW
imgUploadBtn.addEventListener("change", (e)=>uploadPreview(e));
// EL - UPLOAD BTN
sendWorkBtn.addEventListener('click', async ()=>{
    const success = await uploadValidation(imgUploadBtn, uploadTitle, uploadCategory);
    if(success) {
        sendWorkDone();
    }
});

///////////////////// LOAD PAGE ///////////////////
loadMain();