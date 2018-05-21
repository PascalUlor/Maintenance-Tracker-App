let backdrop = document.querySelector('.backdrop');
let toggleButton = document.querySelector('.toggle-button');
let mobileNav = document.querySelector('.mobile-nav');

backdrop.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    backDrop();
});

function backDrop() {
    backdrop.classList.remove('open');
}

toggleButton.addEventListener('click', () => {
    mobileNav.classList.add('open');
    backdrop.classList.add('open');
});

backdrop.removeEventListener('click', () => {
    mobileNav.classList.remove('open');
    backDrop();
});

toggleButton.removeEventListener('click', () => {
    mobileNav.classList.add('open');
    backdrop.classList.add('open');
});
