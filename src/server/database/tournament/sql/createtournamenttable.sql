CREATE TABLE IF NOT EXISTS Tournament (
    tournamentid SERIAL PRIMARY KEY,
    stadiumid INTEGER REFERENCES Stadium,
    tournament_name VARCHAR(64) NOT NULL,
    tourn_start_date DATE,
    tourn_end_date DATE
);