USE ValuableSwaps
GO
CREATE TABLE Friends
(
	user_1 varchar(255) FOREIGN KEY REFERENCES VS_User(username), 
	user_2 varchar(255) FOREIGN KEY REFERENCES VS_User(username)
);
