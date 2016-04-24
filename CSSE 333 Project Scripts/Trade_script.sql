USE ValuableSwaps
GO
CREATE TABLE Trade
(
	Trade_id int PRIMARY KEY,
	user_1 varchar(255) FOREIGN KEY REFERENCES VS_User(username),
	user_2 varchar(255) FOREIGN KEY REFERENCES VS_User(username),
	item_1 int FOREIGN KEY REFERENCES Media(Media_id), 
	item_2 int FOREIGN KEY REFERENCES Media(Media_id)

);
