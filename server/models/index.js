var db = require('../db');

module.exports = {
  messages: {
    get: function (callback) {
        db.connection.query('SELECT messages.message, messages.roomname, usernames.username FROM messages inner join usernames on(messages.username_id=usernames.id);', function(error, results, fields){
          if(error) {
            console.log('Unable to retrieve messages');
          } else {
            var response = {results: results};
            callback(null, JSON.stringify(response));

          }
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

      module.exports.users.post(data.username, function(){
        var queryString = "SELECT id FROM usernames WHERE username='"+ data.username +"';";
        db.connection.query(queryString, function(err, res) {
          if (err) {
            throw err;
          } else {
            post.username_id = res[0].id;
            db.connection.query('INSERT INTO messages SET ?', post, function(err, res){
              if(err) {
                console.log(err.message);
                callback(err);
              }
              else {
                callback(null, res);
              }
            });
          }
        });

      });
    }
  },

  users: {
    // Ditto as above.
    get: function (callback) {
      // query the database for user table and get all users
      db.connection.query('SELECT username FROM usernames', function(error, results, fields) {
        if (error) {
          console.log("Couldn't get users");
        } else {
          // return callback with results
          results = JSON.stringify(results);
          callback(null, results);
        }
      });
    },
    post: function (data, callback) {
      //check if username exists in table
      db.connection.query("SELECT username FROM usernames WHERE username='"+data+"';", function(err, results, fields){
        if(results.length === 0){
          var username = {username: data};
          db.connection.query('INSERT IGNORE INTO usernames SET ?', username, function(err, res){
            if(err){
              throw err;
            } else {
              callback();
            }
          });
        } else {
          callback();
        }
      });
    }
  }
};