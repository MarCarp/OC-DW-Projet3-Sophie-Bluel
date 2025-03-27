import {fetchWorks, fetchCategories} from './api.js';

// VARIABLES
let isLogged = sessionStorage.getItem('isLogged') ?? false;

// DOM
const gallery = document.getElementById("main-gallery");
const filtersContainer = document.getElementById("filters");
const filtersBtn = filtersContainer.getElementsByClassName('filter');
const workModifier = document.getElementById("work-modifier");
const logLink = document.getElementById("log-link");
const logout = document.getElementById("logout");

//FETCHING
const totalWork = await fetchWorks();
const categories = await fetchCategories();

// FUNCTION
function updateView() {
    if(isLogged) {
        workModifier.classList.add('active');
        logLink.classList.add('logout');
    } else {
        workModifier.classList.remove('active');
        logLink.classList.remove('logout');
    }
}

function loginOut() {
    isLogged = false;
    sessionStorage.setItem("isLogged", false);
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

filtersContainer.innerHTML = '';
addCategoryBtn(0, 'Tous');

for(const category of categories) {
    addCategoryBtn(category.id, category.name)
}

// EVENT LISTENER
logout.addEventListener("click", loginOut)

// LOAD PAGE
updateGallery(0);
updateView();