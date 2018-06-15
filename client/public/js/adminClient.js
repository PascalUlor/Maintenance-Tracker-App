const adminRequest = document.querySelector('#body');


/*
* Adds an eventListener with a callback to GET all requests in the database for the admin
*/
const getAllRequest = () => {
  const userData = JSON.parse(sessionStorage.getItem('requests'));
  const myRequest = document.querySelector('#request');
  myRequest.innerHTML = '';
  for (let n = 0; n <= Object.keys(userData[0]).length - 3; n += 1) {
    const title = `${userData[0][n].title}`;
    const department = `${userData[0][n].department}`;
    const details = `${userData[0][n].details}`;
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

if (adminRequest) {
  adminRequest.addEventListener('load', getAllRequest());
}

