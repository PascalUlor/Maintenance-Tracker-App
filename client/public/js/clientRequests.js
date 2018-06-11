const baseUrl = 'https://maintenance-software.herokuapp.com/api/v1';
const token = `${localStorage.token}`;
const createRequestForm = document.querySelector('#output');
const postRequest = document.querySelector('#body');


/*
* Adds an eventListener with a callback to POST user request inputs
*
* @param {object} submitEvent - The submitEvent
*/
if (createRequestForm) {
  createRequestForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.querySelector('#title').value;
    const department = document.querySelector('#department').value;
    const details = document.querySelector('#details').value;

    fetch(`${baseUrl}/users/requests`, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify({ title, department, details }),
    }).then(res => res.json())
      .then((data) => {
        if (data.success === true) {
          if (localStorage.getItem('requests') === null) {
            const requests = [];
            requests.push(data);
            localStorage.setItem('requests', JSON.stringify(requests));
          } else {
            const requests = JSON.parse(localStorage.getItem('requests'));
            requests.push(data);
            localStorage.setItem('requests', JSON.stringify(requests));
          }
          document.querySelector('#output')
            .innerHTML = `<h2>${data.message}<h2/>
            `;
          setTimeout(() => {
            window.location.replace('user-page.html');
          }, 5000);
        } else {
          let output = '<h3>Error<h3/>';
          Object.keys(data).forEach((key) => {
            output += `<p>${data[key]}<p/>`;
          });
          document.querySelector('#request')
            .innerHTML = output;
        }
      }).catch((error) => {
        document.querySelector('#error')
          .innerHTML = `<h2>server error<h2/>
          <h3>${error}<h3/>`;
      });
  });
}


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

