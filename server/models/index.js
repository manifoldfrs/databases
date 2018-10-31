var db = require('../db');

module.exports = {
  messages: {
    get: function (callback) {
      let queryStr = 'select messages.message, usernames.username, roomnames.roomname from messages left outer join usernames on (messages.username_id = usernames.id) left outer join roomnames on (messages.roomname_id = roomnames.id) order by messages.id desc';
      db.connection.query(queryStr, (err, data) => {
        if (err) {
          console.log('Unable to retrieve messages');
        } else {
          console.log('Data:', data);
          callback(data);
        }
      });
    }, // a function which produces all the messages
    post: function (data, callback) {
      let queryStr = 'insert into messages(message, roomname_id, username_id) values (?, (select roomnames.id from roomnames where roomnames.roomname = ? limit 1), (select usernames.id from usernames where usernames.username = ? limit 1))';
      db.connection.query(queryStr, (err, result) => {
      if (err) {
        console.log('Unable to post message');
        callback(err);
      } else {
        callback(result);
      }
    });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (callback) {
      let queryStr = 'select username from usernames';
      db.connection.query(queryStr, (err, result) => {
        if (err) {
          console.log('Error retrieving usersnames');
        } else {
          callback(result);
        }
      });
    },
    post: function (data, callback) {
      let queryStr = `insert into usernames (username) values ('${data.username}')`;
      db.connection.query(queryStr, (err, result) => {
        if (err) {
          callback(err, null);
        } else {
          callback(err, result);
        }
      });
    }
  }
};

