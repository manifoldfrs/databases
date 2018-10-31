const models = require('../models');

const headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
};

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get((err, data) => {
        if (err) {
          console.log('Error retrieving data',err);
        } else {
          console.log('Data here:', data);
          res.writeHead(200, headers);
          res.end(JSON.stringify(data));
        }
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      let body = JSON.stringify(req.body);
      models.messages.post(body, (err) => {
        if (err) {
          console.log('Error posting data (logic)', err);
          res.end();
        } else {
          res.writeHead(201, headers);
          res.end();
        }
      })
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      models.messages.get(usernames.username, (err, data) => {
        if (err) {
          console.log('Error retrieving users (logic)', err);
        } else {
          res.writeHead(200, headers);
          res.end(data);
        }
      });
    },
    post: function (req, res) {
      let usernames = JSON.parse(req.body)
      models.messages.post(usernames.username, (err) => {
        if (err) {
          console.log('Error posting users (logic)', err);
        } else {
          res.writeHead(201, headers);
          res.end();
        }
      });
    }
  }
};

