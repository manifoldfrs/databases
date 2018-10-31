var db = require('../db');
var promise = require('bluebird');

module.exports = {
  messages: {
    get: function (callback) {
      db.messages.findAll({
        include: [db.users]
      })
      .then(function(result){
        callback(null, JSON.stringify(result));
      }).error((err) => {
        callback(err);
      });
    },
    // a function which POSTs new messages to the database
    post: function (data, callback) {
      data = JSON.parse(data);
      //insert new row into messages table
      var post = {
        message: data.message,
        roomname: data.roomname
      };
      module.exports.users.post(data.username, () => {
        db.users.findOne({
          where: {
            username: data.username
          }
        }).then((result) => {
          post.userId = result.id;
          db.messages.create(post);
        }).then(() => {
          callback(null);
        }).error((err) => {
          callback(err);
        });
      });
    }
  },

  users: {
    // Ditto as above.
    get: function (callback) {
      db.users.findAll({
        where: {
          id: {
            gt: 0
          }
        }
      })
      .then(function(results){
        callback(null, JSON.stringify(results));
      }).error((err)=> {
        callback(err);
      });
    },
    post: function (data, callback) {
      db.users.findOrCreate({
        where: {
          username: data
        }
      }).then(() => {
        callback();
      }).error((err) => {
        callback(err);
      });
    }
  }
};