CREATE DATABASE book_manager_app DEFAULT CHAR SET utf8mb4 COLLATE
utf8mb4_general_ci;

USE book_manager_app;

SELECT 
    COUNT(*)
FROM
    book;

INSERT INTO permission
            (permission_group)
VALUES     ('admin');

INSERT INTO permission
            (permission_group)
VALUES     ('normal');

SELECT 
    *
FROM
    permission; 