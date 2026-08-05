-- Create Database
CREATE DATABASE joins_db;
USE joins_db;

-- Drop tables if already exist
DROP TABLE IF EXISTS class;
DROP TABLE IF EXISTS class_info;

-- Create Tables
CREATE TABLE class(
    id INT,
    name VARCHAR(30)
);

CREATE TABLE class_info(
    id INT,
    address VARCHAR(30)
);

-- Insert Data
INSERT INTO class VALUES
(1,'abhi'),
(2,'adam'),
(3,'alex'),
(4,'anu');

INSERT INTO class_info VALUES
(1,'DELHI'),
(2,'MUMBAI'),
(3,'CHENNAI');

-- CROSS JOIN
SELECT *
FROM class
CROSS JOIN class_info;

-- INNER JOIN
SELECT *
FROM class
INNER JOIN class_info
ON class.id = class_info.id;

-- INNER JOIN (Selected Columns)
SELECT class.name,
       class_info.address
FROM class
INNER JOIN class_info
ON class.id = class_info.id;

-- NATURAL JOIN
SELECT *
FROM class
NATURAL JOIN class_info;

-- Extra Data
INSERT INTO class VALUES
(5,'ashish');

INSERT INTO class_info VALUES
(7,'NOIDA'),
(8,'PANIPAT');

-- LEFT JOIN
SELECT *
FROM class
LEFT JOIN class_info
ON class.id = class_info.id;

-- Students without Address
SELECT *
FROM class
LEFT JOIN class_info
ON class.id = class_info.id
WHERE class_info.id IS NULL;

-- RIGHT JOIN
SELECT *
FROM class
RIGHT JOIN class_info
ON class.id = class_info.id;

-- Addresses without Students
SELECT *
FROM class
RIGHT JOIN class_info
ON class.id = class_info.id
WHERE class.id IS NULL;

----------------------------------------------------
-- UNION
----------------------------------------------------

DROP TABLE IF EXISTS first_table;
DROP TABLE IF EXISTS second_table;

CREATE TABLE first_table(
    id INT,
    name VARCHAR(30)
);

CREATE TABLE second_table(
    id INT,
    name VARCHAR(30)
);

INSERT INTO first_table VALUES
(1,'abhi'),
(2,'adam');

INSERT INTO second_table VALUES
(2,'adam'),
(3,'chester');

SELECT *
FROM first_table
UNION
SELECT *
FROM second_table;

SELECT name
FROM first_table
UNION
SELECT name
FROM second_table;

----------------------------------------------------
-- UNION ALL
----------------------------------------------------

SELECT *
FROM first_table
UNION ALL
SELECT *
FROM second_table;

SELECT COUNT(*)
FROM
(
    SELECT *
    FROM first_table
    UNION ALL
    SELECT *
    FROM second_table
) A;

----------------------------------------------------
-- MySQL Alternative for INTERSECT
----------------------------------------------------

SELECT *
FROM first_table
WHERE (id,name) IN
(
    SELECT id,name
    FROM second_table
);

SELECT name
FROM first_table
WHERE name IN
(
    SELECT name
    FROM second_table
);

----------------------------------------------------
-- MySQL Alternative for MINUS
----------------------------------------------------

SELECT *
FROM first_table
WHERE id NOT IN
(
    SELECT id
    FROM second_table
);

SELECT name
FROM first_table
WHERE name NOT IN
(
    SELECT name
    FROM second_table
);

----------------------------------------------------
-- Interview Question 1
----------------------------------------------------

SELECT c.id,
       c.name,
       ci.address
FROM class c
INNER JOIN class_info ci
ON c.id = ci.id;

----------------------------------------------------
-- Interview Question 2
----------------------------------------------------

SELECT c.id,
       c.name,
       CASE
           WHEN ci.address IS NULL
           THEN 'Address Missing'
           ELSE 'Address Available'
       END AS Status
FROM class c
LEFT JOIN class_info ci
ON c.id = ci.id;