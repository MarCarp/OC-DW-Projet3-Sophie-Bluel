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
// LOAD PAGE
updateGallery(0);
updateView();*/