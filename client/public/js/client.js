const baseUrl = 'https://maintenance-software.herokuapp.com/api/v1';
const signupForm = document.querySelector('#signup-form');
const loginForm = document.querySelector('#login-form');


/**
 * Assigns an event-listener to signupForm if it exists in the window
 *
 * @param {object} e - The event parameter
 */
const authLogin = () => {
  fetch(`${baseUrl}/requests`, {
    method: 'GET',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
      Authorization: `user token ${localStorage.token}`,
    },
  }).then(res => res.json()).then((data) => {
    if (data.success === false) window.location.replace('user-page.html');
    if (data.success === true) window.location.replace('admin-page.html');
  }).catch(error => error.message);
};

/**
 * Assigns an event-listener to signupForm if it exists in the window
 *
 * @param {object} e - The event parameter
 */
if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const firstName = document.querySelector('#first-name').value;
    const lastName = document.querySelector('#last-name').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const inputValue = {
      firstName, lastName, email, password,
    };
    fetch(`${baseUrl}/auth/signup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(inputValue),
    }).then(res => res.json())
      .then((data) => {
        if (data.success === true) {
          window.localStorage.token = data.token;
          document.querySelector('#signup-form')
            .innerHTML = `<h2>Signup successful<h2/>
          <h3>Welcome<h3/> <p>${data.user.fullName}<p/>`;
          setTimeout(() => {
            window.location.replace('user-page.html');
          }, 5000);
        } else {
          Object.keys(inputValue).forEach((key) => {
            document.querySelector('#signup-form')
              .innerHTML = `<h2>Signup invalid<h2/>
          <h3>${data[key]}<h3/>`;
          });
        }
      }).catch((error) => {
        document.querySelector('#output')
          .innerHTML = `<h2>server error<h2/>
          <h3>${error}<h3/>`;
      });
  });
}

/**
 * Assigns an event-listener to loginForm if it exists in the window
 *
 * @param {object} e - The event parameter
 */
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    }).then(res => res.json())
      .then((data) => {
        if (data.success === true) {
          window.localStorage.token = data.token;
          document.querySelector('#login-form')
            .innerHTML = `<h2>Login Successful<h2/>
          <h3>Welcome<h3/> <p>${data.user.fullName}<p/>`;
          setTimeout(() => {
            authLogin();
          }, 5000);
        } else {
          document.querySelector('#login-form')
            .innerHTML = `<h2>${data.errors.form}<h2/>
          <h3>Please check your login details<h3/>`;
        }
      }).catch(error => error.message);
  });
}

