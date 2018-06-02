const baseUrl = 'https://maintenance-software.herokuapp.com/api/v1';
const signupForm = document.querySelector('#signup-form');


/**
 * Assigns an event-listener to signupForm if it exists in the window
 *
 * @param {object} e - The event parameter
 */
if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const firstName = document.querySelector('#firstName').value;
    const lastName = document.querySelector('#lastName').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    fetch(`${baseUrl}/auth/signup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        firstName, lastName, email, password,
      }),
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
          document.querySelector('#signup-form')
            .innerHTML = `<h2>Signup successful<h2/>
          <h3>Welcome<h3/> <p>${data.message}<p/>`;
        }
      }).catch(error => error.message);
  });
}

