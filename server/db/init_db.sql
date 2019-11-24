CREATE TABLE movies (
    id Integer,
    vector Text
);

CREATE TABLE similarities (
    id Serial PRIMARY KEY,
    movie_id Integer,
    closest10 Integer[]
);

COPY movies FROM '/data/vectors_2019_11_21.csv' DELIMITER ',' CSV HEADER;
COPY similarities (movie_id, closest10) FROM '/data/similarities.csv' CSV HEADER;