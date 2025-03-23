// DOM
const gallery = document.getElementById("main-gallery");
const filtersContainer = document.getElementById("filters");
const filtersBtn = filtersContainer.getElementsByClassName('filter');

// FETCHING DATA
const totalWorksRaw = await fetch("http://localhost:5678/api/works");
const totalWork = await totalWorksRaw.json();

// FUNCTION
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

// GETTING CATEGORIES
const categoriesRaw = await fetch("http://localhost:5678/api/categories");
const categories = await categoriesRaw.json();

filtersContainer.innerHTML = '';
addCategoryBtn(0, 'Tous');

for(const category of categories) {
    addCategoryBtn(category.id, category.name)
}

// LOAD PAGE
updateGallery("0");