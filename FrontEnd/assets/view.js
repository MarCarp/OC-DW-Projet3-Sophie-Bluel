import { customFetch } from "./api.js";
//DOM
const mainGallery = document.getElementById("main-gallery");
const filtersContainer = document.getElementById("filters");
const filtersBtn = filtersContainer.getElementsByClassName('filter');

//FETCH
const categories = await customFetch('categories');
const works = await customFetch('works');

//PAGE MODE
export function viewMode() {
    if(sessionStorage.getItem('token')) {
        document.body.classList.add("edition");
    } else {
        document.body.classList.remove("edition");
    }
}

//FILTERS BUTTONS
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

//MAIN GALLERY
export function filterGallery(id) {
    const activeBtnOld = filtersContainer.querySelector('.active');
    activeBtnOld.classList.remove('active');
    const activeBtnNew = filtersContainer.querySelector(`[data-cat-id="${id}"]`);
    activeBtnNew.classList.add('active');
    updateGallery(id);
}

export function updateGallery(id) {
    //EMPTY THE GALLERY
    mainGallery.innerHTML = '';
    //REFILLING THE GALLERY
    for(const work of works) {
        if(parseInt(id) === 0 || work.categoryId === parseInt(id)) {
            const workToAdd = document.createElement('figure');
            workToAdd.innerHTML = `<figure>
            <img src="${work.imageUrl}" alt="${work.title}" />
            <figcaption>${work.title}</figcaption>
            </figure>`;
            mainGallery.appendChild(workToAdd);
        }
    }
}

//FIRST LOAD
export function buildCategoriesFilter() {
    filtersContainer.innerHTML = '';
    categoryBtn(0, 'Tous');
    filtersContainer.querySelector('.filter').classList.add('active');
    for(const category of categories) {
        categoryBtn(category.id, category.name);
        /*addWorkCategory(category.id, category.name);*/
    }
}