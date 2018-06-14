const baseUrl = 'https://maintenance-software.herokuapp.com/api/v1';
const token = `${localStorage.token}`;
const postRequest = document.querySelector('#body');



const showRequest = () => {
  const data = JSON.parse(localStorage.getItem('requests'));

  const myRequest = document.querySelector('#request');

  myRequest.innerHTML = '';
  for (let i = 0; i < data.length; i += 1) {
    const title = `${data[i].title}`;
    const department = `${data[i].department}`;
    const details = `${data[i].details}`;

    myRequest.innerHTML += `<section class="request wallpaper">
    <a href="#">
      <h1 class="request-title">${title}</h1>
      <small class="sub-title">${department}</small>
      <button type="submit" class="unresolved">UNRESOLVED</button>
      <button type="submit" class="edit">EDIT</button>
      <button type="submit" class="delete">DELETE</button>
      <h2 class="sub-title">Details</h2>
      <p class="page-info">${details}</p>
    </a>
  </section>`;
  }
};

if (postRequest) {
  postRequest.addEventListener('load', showRequest());
}

