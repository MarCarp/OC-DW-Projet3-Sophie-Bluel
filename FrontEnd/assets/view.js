import { customFetch, deleteWork } from "./api.js";

///////////////////// VARIABLES ///////////////////
let modalMode = 'gallery';

//////////////////////// DOM //////////////////////
const mainGallery = document.getElementById("main-gallery");
const filtersContainer = document.getElementById("filters");
// DOM - MODAL
const modalOverlay = document.getElementById('modal-overlay');
const modal = modalOverlay.querySelector('#modal');
const modalGallery = modal.querySelector('[data-view="gallery"] .modal-content');
// DOM - MODAL - UPLOAD
const addWorkSelect = document.getElementById("add-work-category");
const imgUploadContainer = document.querySelector('[data-view="add-work"] .add-img-container');
const imgUploadBtn = imgUploadContainer.querySelector('#upload-work');
const uploadTitle = document.getElementById('add-work-title');
const uploadCategory = document.getElementById('add-work-category');
/////////////////////// FETCH /////////////////////
let categories = await customFetch('categories');
let works = await customFetch('works');

///////////////////// FUNCTIONS ///////////////////
// FUNCTIONS - GENERAL
// Refresh the works variable with the last version in sessionStorage
export function refreshWorks() {
    const worksRaw = sessionStorage.getItem('works');
    works = JSON.parse(worksRaw);
}

// Get to the Admin View if a Token is present
export function viewMode() {
    if(sessionStorage.getItem('token')) {
        document.body.classList.add("edition");
    } else {
        document.body.classList.remove("edition");
    }
}

// FUNCTIONS - CATEGORIES BUILD 
function categoryBtn(id, name) {
    const catBtn = document.createElement('button');
    catBtn.classList.add('filter');
    catBtn.innerText = name;
    catBtn.dataset.catId = id;
    catBtn.addEventListener('click', (e)=> {
        //PREVENTS CLICKING ON ACTUALLY SELECTED FILTERS
        if(!e.target.classList.contains('active')) {
            filterGallery(e.target.dataset.catId);
        }
    });
    filtersContainer.appendChild(catBtn);
}
function buildCategoriesElements() {
    filtersContainer.innerHTML = '';
    // Add an "All" Filter Btn and make it the active one
    categoryBtn(0, 'Tous');
    filtersContainer.querySelector('.filter').classList.add('active');
    // Passing through all categories
    for(const category of categories) {
        // Building Categories Filters
        categoryBtn(category.id, category.name);
        // Add Work Categories to the Modal Upload Select
        const selectOption = document.createElement('option');
        selectOption.value = category.id;
        selectOption.innerText = category.name;
        addWorkSelect.appendChild(selectOption);
    }
}

// FUNCTIONS - MAIN GALLERY
// Refresh the Gallery if an unactive btn Filter is clicked
export function filterGallery(id) {
    const activeBtnOld = filtersContainer.querySelector('.active');
    activeBtnOld.classList.remove('active');
    const activeBtnNew = filtersContainer.querySelector(`[data-cat-id="${id}"]`);
    activeBtnNew.classList.add('active');
    updateGallery(id);
}
// Refresh the Gallery with an id parameter - filters the works showed or 0 for All
export function updateGallery(id) {
    //EMPTY THE GALLERY
    mainGallery.innerHTML = '';
    //REFILLING THE GALLERY
    for(const work of works) {
        if(parseInt(id) === 0 || work.categoryId === parseInt(id)) {
            const workToAdd = document.createElement('figure');
            workToAdd.innerHTML = `
            <img src="${work.imageUrl}" alt="${work.title}" />
            <figcaption>${work.title}</figcaption>`;
            mainGallery.appendChild(workToAdd);
        }
    }
}

// FUNCTIONS - MODAL
//MANAGE THE MODAL OPENING/CLOSING VIEW
export function modalStatus(action) {
    let modalOpen = false;
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
            modalNav('gallery');
        break;
        default:
            modalStatus('close');
    }
}
//Manage the Modal "page" to show
export function modalNav(view) {
    switch(view) {
        case 'gallery':
            modalMode = 'gallery';
        break;
        case 'add-work':
            modalMode = 'add-work';
        break;
        default:
            modalNav('gallery');
    }
    modal.dataset.viewMode = modalMode;
}
// Refresh the Modal Gallery
export function updateModalGallery() {
    modalGallery.innerHTML = '';
    for(const work of works) {
        const figure = document.createElement('figure');
        const imgFigure = document.createElement('img');
        const trashBtn = document.createElement('button');
        imgFigure.src = work.imageUrl;
        imgFigure.alt = work.title;
        trashBtn.classList.add('delete-img');
        trashBtn.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
        trashBtn.addEventListener('click', ()=>{deleteFromGallery(work.id)});
        figure.appendChild(imgFigure);
        figure.appendChild(trashBtn);
        modalGallery.appendChild(figure);
    }
}
// Delete the selected Work
async function deleteFromGallery(id) {
    await deleteWork(id);
    refreshWorks();
    updateGallery(0);
    updateModalGallery();
    modalStatus('close');
}
// FUNCTIONS - MODAL - UPLOAD ZONE
export function uploadPreview(event) {
    //REPLACE OLD PREVIEW IF THERE IS
    const oldPreview = document.getElementById('upload-preview');
    if(oldPreview) {
        oldPreview.remove();
    }
    const preview = document.createElement('img');
    if(imgUploadBtn.files[0]) {
        preview.src = URL.createObjectURL(imgUploadBtn.files[0]);
        preview.id = 'upload-preview';
        preview.addEventListener('click', ()=>{
            event.target.click();
        });
        imgUploadContainer.classList.add('preview');
        imgUploadContainer.appendChild(preview);
    } else {
        if(imgUploadContainer.classList.contains('preview')) {
            imgUploadContainer.classList.remove('preview')
        }
    }
}

//Clear the Upload Zone when closing Modal or Data Sent
function clearUpload() {
    const existingPeview = document.getElementById('upload-preview');
    const errorMsgs = modal.querySelectorAll('.error-msg');
    const errorInputs = modal.querySelectorAll('.error');
    if(existingPeview) {
        existingPeview.remove();
    }
    for(const errorMsg of errorMsgs) {
        errorMsg.innerText = '';
    }
    for(const errorInput of errorInputs) {
        errorInput.classList.remove('error');
    }
    imgUploadBtn.value = '';
    imgUploadContainer.classList.remove('preview');
    uploadTitle.value = '';
    uploadCategory.value = '1';
}

export function sendWorkDone() {
    refreshWorks();
    updateGallery(0);
    updateModalGallery();
    modalStatus('close');
}

///////////////////// PAGE LOAD ///////////////////
export async function loadMain() {
    //PAGE BUILDING
    // //CHECK IF LOGGED INE
    viewMode();
    buildCategoriesElements();
    updateGallery(0);
    updateModalGallery();
}