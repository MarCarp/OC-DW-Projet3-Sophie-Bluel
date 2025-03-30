import { buildCategoriesFilter, viewMode } from './view.js';

// DOM
const logout = document.getElementById("logout");

//CHECK IF LOGGED INE
viewMode();

//BUILD CATEGORIES FILTER (VIEW)
buildCategoriesFilter();

// EVENT LISTENER
logout.addEventListener("click", ()=>{
    sessionStorage.removeItem('token');
    viewMode();
});

/*
import { filterGallery, categoryBtn } from './view.js';

// DOM - UPLOAD WORK
const addWorkSelect = document.getElementById("add-work-category");

//FETCHING
const works = await fetchWorks();
const categories = await fetchCategories();

// FUNCTION

function addWorkCategory(id, name) {
    const selectOption = document.createElement('option');
    selectOption.value = id;
    selectOption.innerText = name;
    addWorkSelect.appendChild(selectOption);
}

// LOAD PAGE
updateGallery(0);
updateView();*/