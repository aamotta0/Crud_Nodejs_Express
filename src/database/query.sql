CREATE DATABASE test01;

USE test01;

CREATE TABLE persons(    
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    age INT
);

SELECT * FROM persons;

