USE ValuableSwaps
GO
CREATE TABLE Game
(
	game_id int FOREIGN KEY REFERENCES Media(Media_id),
	game_system varchar(255),
	

);
