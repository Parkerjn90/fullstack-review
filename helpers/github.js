const axios = require('axios');
const config = require('../config.js');

let getReposByUsername = (username) => {
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    },
  };
  axios(options)
    .then((response) => {
      return response;
    }).catch((error) => {
      console.log(error);
    })

}

module.exports.getReposByUsername = getReposByUsername;