var db = require('../db');
var request = require("request");
var expect = require('../../node_modules/chai/chai').expect;
var Sequelize = require('sequelize');

describe("Persistent Node Chat Server", function() {
  beforeEach(function(done) {
    var sequelize = new Sequelize('chat', 'root', '');
    sequelize.drop('messages');
    sequelize.sync({force: true})
    .then(function() {
      done();
  });
});

  it("Should insert posted messages to the DB", function(done) {
    // Post the user to the chat server.
    request({ method: "POST",
              uri: "http://127.0.0.1:3000/classes/users",
              json: { username: "Valjean" }
    }, function () {
      // Post a message to the node chat server:
      request({ method: "POST",
              uri: "http://127.0.0.1:3000/classes/messages",
              json: {
                username: "Valjean",
                message: "In mercy's name, three days is all I need.",
                roomname: "Hello"
              }
      }, function () {
        db.messages.findAll()
        .then((results) => {
        // Should have one result:
        expect(results.length).to.equal(1);
        expect(results[0].message).to.equal("In mercy's name, three days is all I need.");
        done();
        });
      });
    });
  });

  it("Should output all messages from the DB", function(done) {
    request({ method: "POST",
              uri: "http://127.0.0.1:3000/classes/messages",
              json: {
                username: "Valjean",
                message: "In mercy's name, three days is all I need.",
                roomname: "Hello"
              }
      }, function (){
      // Now query the Node chat server and see if it returns
      // the message we just inserted:
      request("http://127.0.0.1:3000/classes/messages", function(error, response, body) {
        var messageLog = JSON.parse(body);
        expect(messageLog[0].message).to.equal("In mercy's name, three days is all I need.");
        expect(messageLog[0].roomname).to.equal("Hello");
        done();
      });
    });
  });

  it('Should 404 when asked for a nonexistent endpoint', function(done) {
    request('http://127.0.0.1:3000/arglebargle', function(error, response, body) {
      expect(response.statusCode).to.equal(404);
      done();
    });
  });
});