CREATE DATABASE chat;

USE chat;

CREATE TABLE usernames (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255)
);

CREATE TABLE messages (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  message text,
  roomname VARCHAR(255),
  username_id int,
  FOREIGN KEY (username_id) REFERENCES usernames(id)
);

insert into usernames (username) values ('Thanos'), ('Walter White');
insert into messages (message, roomname, username_id) values ('This does put a smile on my face.', 'Titan', 1), ('I am the one who knocks', 'New Mexico', 2);



/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

