INSERT INTO Users
VALUES
	(1, 'John', 'Doe', '+01 (541) 754-3010', 'john.doe@gallery.com', 'john', 'pbkdf2:sha256:150000$KKgd0xN5$d778b27800d8b89e001843285475a0da3f6f6c664ec8e8a9590ed1c49603b194', '/images/default_profile.png'),
	(2, 'Jane', 'Smith', '+34 678 387 155', 'jane.smith@gallery.com', 'jane', 'pbkdf2:sha256:150000$v4wgnaXC$b87f5daf437119c21ec712462f4b193b6fada27f485e36502c5cf4553a01f640', '/images/default_profile.png');
-- Password = username

INSERT INTO Photos
VALUES
	(1, 'Tortilla', 'A typical Spanish tortilla. With onion, of course.', '2012-05-12 18:25:43', 'https://cdn1.cocina-familiar.com/recetas/thumb/tortilla-de-patata-con-cebolla.jpg', 'Public', 1),
	(2, 'Samoyed', 'A very fluffy dog', '2020-01-12 13:37:01', 'https://www.dogsnsw.org.au/media/img/BrowseAllBreed/Samoyed-.jpg', 'Public', 2),
	(3, 'Sleepy cat', 'A drawing of a cat about to sleep', '2019-08-24 21:20:21', 'https://pbs.twimg.com/media/EZ4Z2QDUYAANA-Z?format=png', 'Public', 1),
	(4, 'Seville', 'The beautiful city of Seville, Spain', '2016-04-02 09:16:58', 'https://urbansevilla.es/wp-content/uploads/2019/03/urban-sevilla-foto-ciudad.jpg', 'Public', 2);

INSERT INTO ForbiddenWords
VALUES
	(1, 'mojonazo'),
	(2, 'mierda'),
	(3, 'feisimo');

INSERT INTO Categories
VALUES
	(1, 'Fotaza'),
	(2, 'Fitness'),
	(3, 'Arte');

INSERT INTO Photos_Categories
VALUES
	(1, 1, 2);

INSERT INTO Comments
VALUES
	(1, 'Me ha encantado, menuda fotaza', '2020-08-24 21:20:21', 1, 2),
	(2, 'Ta bien', '2020-09-24 21:20:21', 2, 1),
	(3, 'No se ve', '2021-03-24 21:20:21', 3, 2);


-- Add some more data for your other tables...