const backdrop = document.querySelector('.backdrop');
const toggleButton = document.querySelector('.toggle-button');
const mobileNav = document.querySelector('.mobile-nav');


const backDrop = () => {
  backdrop.classList.remove('open');
};
const mobileButton = () => {
  mobileNav.classList.add('open');
  backdrop.classList.add('open');
};
const removeBackDrop = () => {
  mobileNav.classList.remove('open');
  backDrop();
};

const animate = () => {
  toggleButton.addEventListener('click', mobileButton);
  backdrop.addEventListener('click', removeBackDrop);
};

if (animate) {
  animate();
} else {
  backdrop.removeEventListener('click', removeBackDrop);
  toggleButton.removeEventListener('click', mobileButton);
}

/*
*Modal control
*/
const modal = document.querySelector('.modal');
const editProfile = document.querySelector('.editText');
const modalNoButton = document.querySelector('.modal__action--negative');
const modalEdit = document.querySelector('.action');
const modalButton = document.querySelector('.modal__action');
const info = document.querySelector('.info');
const current = document.querySelector('.currentRequest');


setTimeout(() => {
  const popup = document.querySelectorAll('.edit');

  for (let i = 0; i < popup.length; i += 1) {
    popup[i].addEventListener('click', (evt) => {
      evt.preventDefault();
      const modalTitle = document.querySelector('.modalTitle');
      const modalStatus = document.querySelector('.modalStatus');
      const modalDepartment = document.querySelector('.modalDeparment');
      const modalDetails = document.querySelector('.modalDetails');
      console.log('working');
      modal.classList.add('open');
      backdrop.classList.add('open');


      modalTitle.innerHTML = document.querySelector(`#title${i}`).innerHTML;
      modalStatus.innerHTML = document.querySelector(`#status${i}`).innerHTML;
      modalDepartment.innerHTML = document.querySelector(`#department${i}`).innerHTML;
      modalDetails.innerHTML = document.querySelector(`#details${i}`).innerHTML;
    });
  }
}, 5000);

function editModal() {
  editProfile.classList.add('open');
  // backdrop.classList.add('open');
  info.classList.add('close');
  current.classList.add('close');
  modalButton.classList.add('close');
  modalNoButton.classList.add('close');
}

if (modalEdit) {
  modalEdit.addEventListener('click', editModal);
}


function closeModal() {
  if (modal) {
    modal.classList.remove('open');
  }
  backdrop.classList.remove('open');
}

if (modalNoButton) {
  modalNoButton.addEventListener('click', closeModal);
}
