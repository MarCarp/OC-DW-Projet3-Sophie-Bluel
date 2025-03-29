import { fetchWorks } from "./api.js";
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

// DOM - UPLOAD WORK
const imgUploadContainer = document.querySelector('[data-view="add-work"] .add-img-container');
const imgUploadBtn = imgUploadContainer.querySelector('#upload-work');

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
        figure.innerHTML = 
        `<img src="${work.imageUrl}" alt="${work.title}" />
        <button class="delete-img"><i class="fa-solid fa-trash-can"></i></button>`;
        figure.dataset.imgId = work.id;
        modalGallery.appendChild(figure);
    }
}

function uploadPreview() {
    console.dir(imgUploadBtn.files[0]);
    //CHECK THE FILE
    const preview = document.createElement('img');
    preview.src = URL.createObjectURL(imgUploadBtn.files[0]);
    preview.id = 'upload-preview';
    imgUploadContainer.classList.add('preview');
    imgUploadContainer.appendChild(preview);
}

function clearUpload() {
    document.getElementById('upload-preview').remove();
    console.dir(imgUploadBtn.value);
    imgUploadBtn.value = '';
    imgUploadContainer.classList.remove('preview');
}

// EVENT LISTENERS
workModifier.addEventListener('click', ()=>updateModal('open'));

backtn.addEventListener('click', ()=>updateModalView('gallery'));
closeBtn.addEventListener('click', ()=>updateModal('close'));

addWorkBtn.addEventListener('click', ()=>updateModalView('add-work'));


modalOverlay.addEventListener('click', (event)=>{
    if(event.target === modalOverlay) {
        updateModal('close');
    }
});

imgUploadBtn.addEventListener("change", uploadPreview);


//LOAD
updateGallery();