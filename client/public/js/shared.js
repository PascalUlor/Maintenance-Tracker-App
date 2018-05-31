const backdrop = document.querySelector('.backdrop');
const toggleButton = document.querySelector('.toggle-button');
const mobileNav = document.querySelector('.mobile-nav');


const backDrop = () => {
    backdrop.classList.remove('open');
};

toggleButton.addEventListener('click', () => {
    mobileNav.classList.add('open');
    backdrop.classList.add('open');
});

backdrop.removeEventListener('click', () => {
    mobileNav.classList.remove('open');
    backDrop();
});

backdrop.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    backDrop();
});

toggleButton.removeEventListener('click', () => {
    mobileNav.classList.add('open');
    backdrop.classList.add('open');
});
