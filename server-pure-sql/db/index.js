var Sequelize = require('sequelize');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

exports.connection = new Sequelize('chat', 'root', '');

exports.connection
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

exports.users = exports.connection.define('users', {
  username: Sequelize.STRING
});

exports.messages = exports.connection.define('messages', {
  message: Sequelize.TEXT,
  roomname: Sequelize.STRING
});

exports.connection.sync();

exports.users.hasMany(exports.messages, {foreignKey: 'userId'});
exports.messages.belongsTo(exports.users, {foreignKey: 'userId'});