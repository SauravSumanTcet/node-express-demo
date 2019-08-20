const fetch = require('node-fetch');
const utility = require('./../utility');
const fs = require('fs');

const getHtml = userListJson => {
  return new Promise((resolve, reject) => {
    try {
      const data = fs.readFileSync(utility.getPath('home.html'));
      let html = data.toString();
      
      let JSON_RES = JSON.stringify(userListJson);
      JSON_RES = JSON_RES.replace(/\"/g, "'");
      html = html.replace('{{{pageData}}}', JSON_RES);
      resolve(html);
    } catch (error) {
      const err = { status: 404, errMsg: 'File Not Found' };
      reject(err);
    }
  });
};

const getUserList = async () => {
  const response = await fetch('https://reqres.in/api/users?page=2');
  const userListJson = await response.json();
  return userListJson;
};

module.exports = {
  getHtml: getHtml,
  getUserList: getUserList
};
