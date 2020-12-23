CREATE TABLE IF NOT EXISTS Seat (
    seatid SERIAL PRIMARY KEY,
    stadiumid INTEGER REFERENCES Stadium,
    seat_row INTEGER NOT NULL,
    seat_number INTEGER NOT NULL,
    is_available BOOLEAN DEFAULT TRUE
);