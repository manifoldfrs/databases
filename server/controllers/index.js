var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get((err, data) => {
        if (err) {
          console.log('Error retrieving data');
        } else {
          console.log('Data here:', data);
          res.end(JSON.stringify(data));
        }
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      let param = [req.message, req.roomname, req.username];
      models.messages.post(param, (err, result) => {
        if (err) {
          console.log('Error sending message');
        } else {
          res.end(JSON.stringify(result));
        }
      });
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      let usernames = JSON.parse(req.body);
      models.messages.get(usernames.username, (err, data) => {
        if (err) {
          console.log('Error retrieiving data');
        } else {
          res.writeHead(200, headers);
          res.end('Status Code 200 \n',data);
        }
      });
    },
    post: function (req, res) {
      let usernames = JSON.parse(req.body)
      models.messages.post(usernames.username, (err) => {
        if (err) {
          console.log('Error sending username');
          res.end('Status Code 500');
        } else {
          res.writeHead(201, headers);
          res.end('Status Code 201');
        }
      })
    }
  }
};

