const pool = require('../sql/index');
const { getAnswer } = require('./answer');

module.exports.createQuestion = async () => { };

module.exports.deleteQuestion = async () => { };

//GET QUESTION WITH ANSWERS
module.exports.getCompleteQuest = async (questID, callback) => {
	const sql = 'SELECT * FROM question NATURAL JOIN question_answer WHERE quest_id = $1;';
	const { rows: question } = await pool.query(sql, [questID]);
	const completeQuestArray = { quest_text: question[0].quest_text, answers: [], correct_ans: '', quest_id: questID };

	getAnswer(question[0].correct_ans, (answer) => {
		completeQuestArray.correct_ans = answer['ans_text'];
	});

	for await (const answers of question) {
		await getAnswer(answers.ans_id, (answer) => {
			completeQuestArray.answers.push(answer['ans_text']);
		});
	}
	callback(completeQuestArray);
};


// GET ALL QUESTIONS
module.exports.getAllQuestions = async (callback) => {
	const sql = 'SELECT * FROM question NATURAL JOIN question_answer;';
	const { rows: questions } = await pool.query(sql);

	const allQuestions = [];
	for await (const question of questions) {
		await this.getCompleteQuest(question.quest_id, (question) => {
			allQuestions.push(question);
		});
	}

	const uniqueAllQuestions = allQuestions.filter((value, index) => {
		const _value = JSON.stringify(value);
		return index === allQuestions.findIndex(question => {
			return JSON.stringify(question) === _value;
		});
	});

	// console.log(uniqueAllQuestions)
	callback(uniqueAllQuestions);
};


