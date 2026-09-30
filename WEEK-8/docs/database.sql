CREATE DATABASE bookflow;

-- Connect to bookflow, then run:
INSERT INTO inventory (book_id, total_stock, available_stock)
VALUES
(101, 5, 5),
(102, 3, 3),
(103, 2, 0);

SELECT * FROM inventory;
SELECT * FROM orders;
