DROP TABLE IF EXISTS question_answer;
DROP TABLE IF EXISTS test_question;
DROP TABLE IF EXISTS score;
DROP TABLE IF EXISTS test;
DROP TABLE IF EXISTS question;
DROP TABLE IF EXISTS answer;

CREATE TABLE
    answer (
        ans_id SERIAL PRIMARY KEY,
        ans_text text NOT NULL
    );

CREATE TABLE
    question (
        quest_id SERIAL PRIMARY KEY,
        quest_text text NOT NULL, 
        correct_ans INT,
        FOREIGN KEY (correct_ans) REFERENCES answer (ans_id) ON DELETE CASCADE
    );

CREATE TABLE 
    question_answer (
        quest_id INT,
        ans_id INT,
        PRIMARY KEY (quest_id, ans_id),
        FOREIGN KEY (quest_id) REFERENCES question (quest_id) ON DELETE CASCADE,
		FOREIGN KEY (ans_id) REFERENCES answer (ans_id) ON DELETE CASCADE
    );

CREATE TABLE
    test (
        test_id SERIAL PRIMARY KEY,
        test_name VARCHAR(255) NOT NULL,
		exp_date timestamp
    );

CREATE TABLE 
    test_question (
        test_id INT,
        quest_id INT,
        PRIMARY KEY (test_id, quest_id),
        FOREIGN KEY (test_id) REFERENCES test (test_id) ON DELETE CASCADE,
        FOREIGN KEY (quest_id) REFERENCES question (quest_id) ON DELETE CASCADE
     );

CREATE TABLE
    score (
        score_id SERIAL PRIMARY KEY,
        test_id INT,
        student_name VARCHAR(50) NOT NULL,
		submit_date TIMESTAMP DEFAULT NOW(),
		late BOOL DEFAULT FALSE,
        score INT NOT NULL CHECK (score <= 100 AND score >= 0),
        FOREIGN KEY (test_id) REFERENCES test (test_id) ON DELETE CASCADE
    );

CREATE TRIGGER delete_quest_answers
	AFTER DELETE ON question_answer
	FOR EACH ROW
	EXECUTE PROCEDURE delete_leftover_answers ();

CREATE OR REPLACE FUNCTION delete_leftover_answers ()
	RETURNS TRIGGER
	LANGUAGE PLPGSQL
	AS $$
BEGIN
	IF OLD.ans_id IN (
		SELECT
			ans_id
		FROM
			answer) THEN
		DELETE FROM answer
		WHERE ans_id = OLD.ans_id;
	END IF;
	RETURN NEW;
END;
$$
