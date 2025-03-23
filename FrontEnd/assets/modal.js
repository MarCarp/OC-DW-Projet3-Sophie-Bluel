let modalOpen = false;
let modalMode = 'gallery';
// DOM
const modalOverlay = document.getElementById('modal-overlay');
const modal = modalOverlay.querySelector('#modal');
const backtn = modal.querySelector('#back');
const closeBtn = modal.querySelector('#close');
const addWorkBtn = modal.querySelector('#add-work-btn');

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
            updateModalView('gallery');
        break;
        case 'switch':
            modalOpen ? updateModal('close') : updateModal('open');
        break;
        default:
            updateModal('close');
    }
}

// EVENT LISTENERS
backtn.addEventListener('click', ()=>updateModalView('gallery'));
addWorkBtn.addEventListener('click', ()=>updateModalView('add-work'));


closeBtn.addEventListener('click', ()=>updateModal('close'));

modalOverlay.addEventListener('click', (event)=>{
    if(event.target === modalOverlay) {
        updateModal('close');
    }
});

document.addEventListener('keydown', (e)=>{
    if(e.code === "Numpad0") {
        updateModal('open');
    }
})