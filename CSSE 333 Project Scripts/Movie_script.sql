USE ValuableSwaps
GO
CREATE TABLE Movie
(
	movie_id int FOREIGN KEY REFERENCES Media(Media_id),
	movie_system varchar(255),
	

);
