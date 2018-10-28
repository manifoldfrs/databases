CREATE DATABASE chat;

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
  created_at DATETIME,
  updated_at DATETIME,
  username_id int,
  roomname_id int,
  FOREIGN KEY (username_id) REFERENCES usernames(id),
  FOREIGN KEY (roomname_id) REFERENCES roomnames(id)
);


/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

