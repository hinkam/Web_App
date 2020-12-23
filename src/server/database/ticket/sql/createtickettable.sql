CREATE TABLE IF NOT EXISTS Ticket (
    ticketid SERIAL PRIMARY KEY,
    userid INTEGER REFERENCES Account,
    bookingid INTEGER REFERENCES Booking,
    bookingdate DATE DEFAULT CURRENT_DATE
);