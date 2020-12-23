-- SELECT tournament_name, COUNT(Seat.seatid), Stadium.stadium_location FROM Tournament, Stadium, Seat
-- WHERE Tournament.stadiumid = Stadium.stadiumid
-- AND Seat.stadiumid = Tournament.stadiumid
-- AND Seat.is_available = TRUE
-- GROUP BY tournament_name

SELECT tournament_name, COUNT(Seat.seatid) as seat_cnt, stadium_location FROM Tournament
INNER JOIN Stadium ON Tournament.stadiumid = Stadium.stadiumid
INNER JOIN Seat ON Tournament.stadiumid = Seat.stadiumid
WHERE Seat.is_available = TRUE
GROUP BY tournament_name, stadium_location
