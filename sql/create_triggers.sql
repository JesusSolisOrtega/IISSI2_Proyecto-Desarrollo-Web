DELIMITER //
CREATE OR REPLACE TRIGGER maxNumberOfPhotos
	BEFORE INSERT ON Photos
	FOR EACH ROW
	BEGIN
		DECLARE numPhotos INT;
		SET numPhotos = (SELECT COUNT(*) FROM Photos P
			WHERE P.userId = NEW.userId);
		IF (numPhotos >= 50 ) THEN
			SIGNAL SQLSTATE '45000' SET message_text =
			'Each user can upload a maximun of 50 photos';
		END IF;
	END//
DELIMITER ;



DELIMITER //
CREATE OR REPLACE TRIGGER appropriateTitleAndDesc
	BEFORE INSERT ON Photos
	FOR EACH ROW
	BEGIN
		DECLARE forb INT;
		SET forb = (SELECT COUNT(*) FROM forbiddenwords F
			WHERE NEW.title LIKE CONCAT('%', F.word, '%') OR NEW.description LIKE CONCAT('%', F.word, '%'));
		IF (forb >= 1) THEN
			SIGNAL SQLSTATE '45000' SET message_text =
			'title and photos must not cointain forbidden words';
		END IF;
	END//
DELIMITER ;

DELIMITER //
CREATE OR REPLACE TRIGGER appropriateTitleAndDescrip
	BEFORE UPDATE ON Photos
	FOR EACH ROW
	BEGIN
		DECLARE forb INT;
		SET forb = (SELECT COUNT(*) FROM forbiddenwords F
			WHERE NEW.title LIKE CONCAT('%', F.word, '%') OR NEW.description LIKE CONCAT('%', F.word, '%'));
		IF (forb >= 1) THEN
			SIGNAL SQLSTATE '45000' SET message_text =
			'title and photos must not cointain forbidden words';
		END IF;
	END//
DELIMITER ;

DELIMITER //
CREATE OR REPLACE TRIGGER appropriateComments
	BEFORE INSERT ON Comments
	FOR EACH ROW
	BEGIN
		DECLARE forb INT;
		SET forb = (SELECT COUNT(*) FROM forbiddenwords F
			WHERE NEW.commentary LIKE CONCAT('%', F.word, '%'));
		IF (forb >= 1) THEN
			SIGNAL SQLSTATE '45000' SET message_text =
			'comments must not cointain forbidden words';
		END IF;
	END//
DELIMITER ;

DELIMITER //
CREATE OR REPLACE TRIGGER noCommentsDeletion
	BEFORE DELETE ON Photos
	FOR EACH ROW
	BEGIN
		DECLARE com INT;
		SET com = (SELECT COUNT(*) FROM comments 
			WHERE old.photoId = comments.photoId);
		IF (com >= 1) THEN
			SIGNAL SQLSTATE '45000' SET message_text =
			'you can not delete photos with comments';
		END IF;
	END//
DELIMITER ;


DELIMITER //
CREATE OR REPLACE TRIGGER noCommentsChangePrivate
	BEFORE UPDATE ON Photos
	FOR EACH ROW
	BEGIN
		DECLARE com INT;
		SET com = (SELECT COUNT(*) FROM comments 
			WHERE old.photoId = comments.photoId);
		IF (com >= 1 && NEW.visibility = 'Private') THEN
			SIGNAL SQLSTATE '45000' SET message_text =
			'you can not change to private photos with comments';
		END IF;
	END//
DELIMITER ;