SELECT
	question,
	correct_answer,
	answers
FROM
	questions
	join answers on answers.q_id = questions.question