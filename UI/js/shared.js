let backdrop = document.querySelector('.backdrop');
let modal = document.querySelector('.modal');
let toggleButton = document.querySelector('.toggle-button');
let mobileNav = document.querySelector('.mobile-nav');

backdrop.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    closeModal();
});


toggleButton.addEventListener('click', () => {
    mobileNav.classList.add('open');
    backdrop.classList.add('open');
});