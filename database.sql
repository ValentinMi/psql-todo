CREATE DATABASE perntodo;

CREATE TABLE todos
(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255),
    creationDate DATE,
    genre_id integer not null references genres(genre_id)
);

CREATE TABLE genres
(
    genre_id SERIAL PRIMARY KEY,
    name VARCHAR(255)
);