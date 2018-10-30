var db = require('../db');

module.exports = {
  messages: {
    get: function (callback) {
      let queryStr = 'select usernames.username, messages.message, roomnames.roomname from messages left outer join usernames on (messages.username_id = usernames.id) left outer join roomnames on (messages.roomname_id = roomnames.id)';
      db.connection.query(queryStr, (err, data) => {
        if (err) {
          throw err;
        } else {
          console.log('Data:', data);
          callback(null, data);
        }
      });
    }, // a function which produces all the messages
    post: function (params, callback) {
      let queryStr = 'insert into messages(message, roomname_id, username_id) values (?, (select roomnames.id from roomnames where roomnames.roomname =?), (select usernames.id from usernames where usernames.username =?))';
    db.connection.query(queryStr, params, (err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(null, result);
      }
    });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (callback) {
      let queryStr = 'select * from usernames';
      db.connection.query(queryStr, (err, result) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, result);
        }
      });
    },
    post: function (params, callback) {
      let queryStr = 'insert into usernames(username) values (?)';
      db.connection.query(queryStr, params, (err, result) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, result);
        }
      });
    }
  }
};

