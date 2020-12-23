SELECT userName FROM Account
INNER JOIN Token ON Account.userid = Token.userid
WHERE token = $1
