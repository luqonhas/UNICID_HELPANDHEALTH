const openModalButton = document.querySelector('#open-modal');
const openModalButton2 = document.querySelector('#open-modal2');
const closeModalButton = document.querySelector('#close-modal');
const closeModalButton2 = document.querySelector('#close-modal2');
const modal = document.querySelector('#modal');
const modal2 = document.querySelector('#modal2');
const fade = document.querySelector('#fade');
const fade2 = document.querySelector('#fade2');

const toggleModal = () => {
    [modal, fade].forEach((el) => el.classList.toggle("hide"));
}

[openModalButton, closeModalButton, fade].forEach((el) =>{
    el.addEventListener("click", () => toggleModal() )
})

const toggleModal2 = () => {
    [modal2, fade2].forEach((ele) => ele.classList.toggle("hide"));
}

[openModalButton2, closeModalButton2, fade2].forEach((ele) =>{
    ele.addEventListener("click", () => toggleModal2() )
})