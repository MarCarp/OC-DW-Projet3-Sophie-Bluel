import { fetchWorks, sendWork, deleteWork } from "./api.js";
const works = await fetchWorks();

// VARIABLES
let modalOpen = false;
let modalMode = 'gallery';

// DOM
const workModifier = document.getElementById("work-modifier");

const modalOverlay = document.getElementById('modal-overlay');
const modal = modalOverlay.querySelector('#modal');

const modalGallery = modal.querySelector('[data-view="gallery"] .modal-content');

const backtn = modal.querySelector('#back');
const closeBtn = modal.querySelector('#close');
const addWorkBtn = modal.querySelector('#add-work-btn');
const sendWorkBtn = modal.querySelector('#send-work-btn');

// DOM - UPLOAD WORK
const imgUploadContainer = document.querySelector('[data-view="add-work"] .add-img-container');
const imgUploadBtn = imgUploadContainer.querySelector('#upload-work');
const uploadTitle = document.getElementById('add-work-title');
const uploadCategory = document.getElementById('add-work-category');

//FUNCTIONS
function updateModalView(view) {
    switch(view) {
        case 'gallery':
            modalMode = 'gallery';
        break;
        case 'add-work':
            modalMode = 'add-work';
        break;
        default:
            updateModalView('gallery');
    }
    modal.dataset.viewMode = modalMode;
}

function updateModal(action) {
    switch(action) {
        case 'open':
            modalOpen = true;
            document.body.classList.add('overlayed');
            modalOverlay.classList.add('active');
        break;
        case 'close':
            modalOpen = false;
            document.body.classList.remove('overlayed');
            modalOverlay.classList.remove('active');
            clearUpload();
            updateModalView('gallery');
        break;
        case 'switch':
            modalOpen ? updateModal('close') : updateModal('open');
        break;
        default:
            updateModal('close');
    }
}

function updateGallery() {
    for(const work of works) {
        const figure = document.createElement('figure');
        const imgFigure = document.createElement('img');
        const trashBtn = document.createElement('button');
        imgFigure.src = work.imageUrl;
        imgFigure.alt = work.title;
        trashBtn.classList.add('delete-img');
        trashBtn.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
        trashBtn.addEventListener('click', ()=>trashWork(work.id));
        figure.appendChild(imgFigure);
        figure.appendChild(trashBtn);
        modalGallery.appendChild(figure);
    }
}

function uploadPreview() {
    //CHECK THE FILE
    const preview = document.createElement('img');
    preview.src = URL.createObjectURL(imgUploadBtn.files[0]);
    preview.id = 'upload-preview';
    imgUploadContainer.classList.add('preview');
    imgUploadContainer.appendChild(preview);
}

function trashWork(id) {
    deleteWork(id);
}

function clearUpload() {
    const existingPeview = document.getElementById('upload-preview');
    if(existingPeview) {
        existingPeview.remove();
    }
    imgUploadBtn.value = '';
    imgUploadContainer.classList.remove('preview');
    uploadTitle.value = '';
    uploadCategory.value = '1';
}

function uploadValidation() {
    const uploadedImg = imgUploadBtn.files[0];
    if(!uploadedImg) {
        console.log("doit y avoir une image");
    }else if (uploadedImg.size/1000000 > 4) {
        console.log("img trop grande");
    }
    else if(uploadTitle === '') {
        console.log("pas de titre");
    }else {
        sendWork(uploadedImg, uploadTitle.value, uploadCategory.value);
    }
}

// EVENT LISTENERS
//EL - OPEN MODAL
workModifier.addEventListener('click', ()=>updateModal('open'));
//EL - MODAL NAVIGATION
backtn.addEventListener('click', ()=>updateModalView('gallery'));
addWorkBtn.addEventListener('click', ()=>updateModalView('add-work'));
// EL - EXITING MODAL
closeBtn.addEventListener('click', ()=>updateModal('close'));
modalOverlay.addEventListener('click', (event)=>{
    if(event.target === modalOverlay) {
        updateModal('close');
    }
});
// EL - LOAD IMG PREVIEW
imgUploadBtn.addEventListener("change", uploadPreview);
// EL - UPLOAD BTN
sendWorkBtn.addEventListener('click', uploadValidation);


//LOAD
updateGallery();