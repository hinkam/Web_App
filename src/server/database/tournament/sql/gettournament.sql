SELECT tournament_name, COUNT(Seat.seatid) as seat_cnt, stadium_location FROM Tournament
INNER JOIN Stadium ON Tournament.stadiumid = Stadium.stadiumid
INNER JOIN Seat ON Tournament.stadiumid = Seat.stadiumid
WHERE Seat.is_available = TRUE AND tournament_name = $1
GROUP BY tournament_name, stadium_location
