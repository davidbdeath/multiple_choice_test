DELETE FROM test;
DELETE FROM answer;
DELETE FROM question;
DELETE FROM question_answer;
DELETE FROM test_question;
DELETE FROM score;

INSERT INTO
	test (test_name)
VALUES
	('Marvel Trivia'),
	('DC Trivia');

INSERT INTO
	answer (ans_text)
VALUES
	('Peter Parker'),
	('Kevin Smith'),
	('Monty Python'),
	('Hank Pym'),
	('Fred Durst'),
	('Voltron'),
	('Daddy issues'),
	('Always picked last'),
	('All his girls friends die'),
	('Bruce Wayne'),
	('Tony Zucco'),
	('James Gordon'),
	('Mr. Sivana'),
	('Jaime Reyes'),
	('Billy Batson');

INSERT INTO
	question (quest_text, correct_ans)
VALUES
		('Who is Spiderman?', 1),
		('Who is Ant Man?', 4),
		('Why is Wolverine grouchy?', 7),
		('Who is Batman?', 10),
		('Who is Capt. Marvel?', 15);

INSERT INTO
	question_answer (quest_id, ans_id)
VALUES
	(1, 1),
	(1, 2),
	(1, 3),
	(2, 4),
	(2, 5),
	(2, 6),
	(3, 7),
	(3, 8),
	(3, 9),
	(4, 10),
	(4, 11),
	(4, 12),
	(5, 13),
	(5, 14),
	(5, 15);

INSERT INTO
	test_question (test_id, quest_id)
VALUES
	(1, 1),
	(1, 2),
	(1, 3),
	(2, 4),
	(2, 5),
	(2, 1);

INSERT INTO
	score (test_id, student_name, score)
VALUES
	(1, 'Frank', 100),
	(1, 'Bob', 80),
	(2, 'David', 90),
	(2, 'Billy', 60)