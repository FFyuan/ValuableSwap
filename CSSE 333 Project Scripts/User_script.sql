USE ValuableSwaps
GO
CREATE TABLE VS_User
(
	username varchar(255), 
	email varchar(255),
	Primary Key(username, email),
	user_password varchar(255)
);
