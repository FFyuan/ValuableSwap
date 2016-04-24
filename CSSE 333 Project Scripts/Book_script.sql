USE ValuableSwaps
GO
CREATE TABLE Book
(
	book_id int FOREIGN KEY REFERENCES Media(Media_id),
	author varchar(255),
	

);
