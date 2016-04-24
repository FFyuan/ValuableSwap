USE ValuableSwaps
GO
CREATE TABLE Music
(
	music_id int FOREIGN KEY REFERENCES Media(Media_id),
	music_type varchar(255),
	artist varchar(255)

);
