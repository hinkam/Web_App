CREATE TABLE IF NOT EXISTS Stadium (
    stadiumid SERIAL PRIMARY KEY,
    stadium_name VARCHAR(64) NOT NULL,
    seat_cnt INTEGER NOT NULL,
    stadium_location VARCHAR(64) NOT NULL
);