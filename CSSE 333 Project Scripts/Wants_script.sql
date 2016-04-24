USE ValuableSwaps
GO
CREATE TABLE Wants
(
	username varchar(255) FOREIGN KEY REFERENCES VS_User(username), 
	item_id int FOREIGN KEY REFERENCES Media(Media_id)

);
