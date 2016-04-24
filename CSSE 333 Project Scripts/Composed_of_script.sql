USE ValuableSwaps
GO
CREATE TABLE Composed_of
(
	Trade_id int PRIMARY KEY,
	item_1 int FOREIGN KEY REFERENCES Media(Media_id), 
	item_2 int FOREIGN KEY REFERENCES Media(Media_id)

);
