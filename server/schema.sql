DROP DATABASE IF EXISTS chat;

USE chat;

CREATE TABLE usernames (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255)
);

CREATE TABLE roomnames (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  roomname VARCHAR(255)
);

CREATE TABLE messages (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  message text,
  username_id int,
  roomname_id int,
  FOREIGN KEY (username_id) REFERENCES usernames(id),
  FOREIGN KEY (roomname_id) REFERENCES roomnames(id)
);

insert into usernames (username) values ('Thanos'), ('Walter White');
insert into roomnames (roomname) values ('Titan'), ('New Mexico');
insert into messages (message, username_id, roomname_id) values ('This does put a smile on my face.', 1, 1), ('I am the one who knocks', 2, 2);



/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

