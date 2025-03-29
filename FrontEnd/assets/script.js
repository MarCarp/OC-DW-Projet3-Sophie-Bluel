import {fetchWorks, fetchCategories} from './api.js';

// VARIABLES
let isLogged = (sessionStorage.getItem('logStatus') === 'in') ? true :  false;

// DOM
const gallery = document.getElementById("main-gallery");
const filtersContainer = document.getElementById("filters");
const filtersBtn = filtersContainer.getElementsByClassName('filter');
const logout = document.getElementById("logout");

// DOM - UPLOAD WORK
const addWorkSelect = document.getElementById("add-work-category");

//FETCHING
const totalWork = await fetchWorks();
const categories = await fetchCategories();

// FUNCTION
function updateView() {
    if(isLogged) {
        document.body.classList.add("edition");
    } else {
        document.body.classList.remove("edition");
    }
}

function loginOut() {
    isLogged = false;
    sessionStorage.setItem("logStatus", 'out');
    sessionStorage.removeItem('token');
    updateView();
}

function updateGallery(id) {
    const activeBtn = filtersContainer.querySelector(`[data-cat-id="${id}"]`);
    for(const btn of filtersBtn) {
        btn.classList.remove("active");
    }
    activeBtn.classList.add('active');
    gallery.innerHTML = '';
    
    for(const work of totalWork) {
        if(parseInt(id) === 0 || work.categoryId === parseInt(id)) {
            const workToAdd = document.createElement('figure');
            workToAdd.innerHTML = `<figure>
            <img src="${work.imageUrl}" alt="${work.title}" />
            <figcaption>${work.title}</figcaption>
            </figure>`;
            gallery.appendChild(workToAdd);
        }
    }
}

function addCategoryBtn(id, name) {
    const catBtn = document.createElement('button');
    catBtn.classList.add('filter');
    catBtn.innerText = name;
    catBtn.dataset.catId = id;
    catBtn.addEventListener('click', (e)=> {
        updateGallery(e.target.dataset.catId);
    });
    filtersContainer.appendChild(catBtn);
}

function addWorkCategory(id, name) {
    const selectOption = document.createElement('option');
    selectOption.value = id;
    selectOption.innerText = name;
    addWorkSelect.appendChild(selectOption);
}



filtersContainer.innerHTML = '';
addCategoryBtn(0, 'Tous');

for(const category of categories) {
    addCategoryBtn(category.id, category.name);
    addWorkCategory(category.id, category.name);
}

// EVENT LISTENER
logout.addEventListener("click", loginOut);

// LOAD PAGE
updateGallery(0);
updateView();