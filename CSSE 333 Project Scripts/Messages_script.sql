USE ValuableSwaps
GO
CREATE TABLE VS_Messages
(
	Message_id int PRIMARY KEY,
	sender varchar(255) FOREIGN KEY REFERENCES VS_User(username), 
	receiver varchar(255) FOREIGN KEY REFERENCES VS_User(username),
	time DATETIME,
	message_text TEXT
);
