DROP DATABASE IF EXISTS moviesdb;

CREATE DATABASE moviesdb;

USE moviesdb;

CREATE TABLE movie (
    id BINARY(16) PRIMARY key default (UUID_TO_BIN(UUID())),
    title VARCHAR(255) NOT NULL, 
    `year` INT NOT NULL, 
    director VARCHAR(255) NOT NULL, 
    duration INT NOT NULL,
    poster TEXT, 
    rate DECIMAL(2,1) UNSIGNED NOT NULL
);

CREATE TABLE genre (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE movie_genres (
    movie_id BINARY(16) REFERENCES movie(id), 
    genre_id INT REFERENCES genre(id),
    PRIMARY KEY (movie_id, genre_id)
);

INSERT INTO genre (name) 
VALUES
    ('Action'),
    ('Adventure'),
    ('Animation'),
    ('Biography'),
    ('Crime'),
    ('Romance'),
    ('Comedy'), 
    ('Drama'), 
    ('Fantasy'),
    ('Horror'), 
    ('Thriller'), 
    ('Sci-Fi')
;

INSERT INTO movie (id, title, `year`, director, duration, poster, rate) 
VALUES 
    (UUID_TO_BIN(UUID()), 'Interstellar', 1994, 'Christopher Nolan', 180, 'https://m.media-amazon.com/images/I/91obuWzA3XL._AC_UF1000,1000_QL80_.jpg', 8.8),
    (UUID_TO_BIN(UUID()), 'Gladiator', 2000, 'Ridley Scott', 155, 'https://img.fruugo.com/product/0/60/14417600_max.jpg', 8.5),
    (UUID_TO_BIN(UUID()), 'The Lord of the Rings: The Return of the King', 2003, 'Peter Jackson', 180, 'https://i.ebayimg.com/images/g/0hoAAOSwe7peaMLW/s-l1600.jpg', 8.9),
    (UUID_TO_BIN(UUID()), 'Pulp Fiction', 1994, 'Quentin Tarantino', 180, 'https://www.themoviedb.org/t/p/original/vQWk5YBFWF4bZaofAbv0tShwBvQ.jpg', 8.9)
;


INSERT INTO movie_genres (movie_id, genre_id) 
VALUES
    ((SELECT id FROM movie WHERE title = 'Interstellar'), (SELECT id FROM genre WHERE name = 'Sci-Fi')),
    ((SELECT id FROM movie WHERE title = 'Interstellar'), (SELECT id FROM genre WHERE name = 'Drama')),
    ((SELECT id FROM movie WHERE title = 'Interstellar'), (SELECT id FROM genre WHERE name = 'Adventure')),
    ((SELECT id FROM movie WHERE title = 'Gladiator'), (SELECT id FROM genre WHERE name = 'Action')),
    ((SELECT id FROM movie WHERE title = 'Gladiator'), (SELECT id FROM genre WHERE name = 'Adventure')),
    ((SELECT id FROM movie WHERE title = 'Gladiator'), (SELECT id FROM genre WHERE name = 'Drama')),
    ((SELECT id FROM movie WHERE title = 'The Lord of the Rings: The Return of the King'), (SELECT id FROM genre WHERE name = 'Action')),
    ((SELECT id FROM movie WHERE title = 'The Lord of the Rings: The Return of the King'), (SELECT id FROM genre WHERE name = 'Adventure')),
    ((SELECT id FROM movie WHERE title = 'The Lord of the Rings: The Return of the King'), (SELECT id FROM genre WHERE name = 'Drama')),
    ((SELECT id FROM movie WHERE title = 'Pulp Fiction'), (SELECT id FROM genre WHERE name = 'Crime')),
    ((SELECT id FROM movie WHERE title = 'Pulp Fiction'), (SELECT id FROM genre WHERE name = 'Drama'))   
;

ALTER TABLE movie_genres ADD CONSTRAINT fk_movie_id FOREIGN KEY (movie_id) REFERENCES movie(id) ON DELETE CASCADE;

CREATE USER 'nodeCourse'@'localhost' IDENTIFIED BY ''; -- Crea el usuario sin contraseña

GRANT ALL PRIVILEGES ON *.* TO 'nodeCourse'@'localhost' WITH GRANT OPTION;

/*
SELECT * FROM movie;
SELECT * FROM genre;
SELECT * FROM movie_genres;
*/