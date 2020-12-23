CREATE TABLE IF NOT EXISTS Booking (
    bookingid SERIAL PRIMARY KEY,
    tournamentid INTEGER REFERENCES Tournament,
    seatid INTEGER REFERENCES Seat,
    price INTEGER NOT NULL
);