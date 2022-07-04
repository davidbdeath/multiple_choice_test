SELECT
	*
FROM
	test NATURAL
	JOIN test_question NATURAL
	JOIN question NATURAL
	JOIN question_answer NATURAL
	JOIN answer
WHERE
	test_id = 1;

SELECT
	*
FROM
	test NATURAL
	JOIN test_question NATURAL
	JOIN question
	JOIN answer ON question.correct_ans = answer.ans_id
WHERE
	test_id = 1;