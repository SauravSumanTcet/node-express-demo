const fetch = require('node-fetch');

// Promise example
const login = (username = 'default', password = 'default') => {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:3000/mock-json/loginResponse.json')
      .then(response => {
        if (response.status !== 200) {
          console.log(
            'Looks like there was a problem. Status Code: ' + response.status
          );
          return;
        }
        response.json().then(data => {
          resolve(data);
        });
      })
      .catch(err => {
        reject(err);
      });
  });
};
module.exports = {
  login: login
};
