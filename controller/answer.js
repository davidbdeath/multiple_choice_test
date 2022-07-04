const pool = require('../sql/index');

module.exports.createAnswer = async (ans_text, callback) => {
	const sql = 'INSERT into answer(ans_text) values ($1) returning ans_id';
	const { rows: ans_id } = await pool.query(sql, [text]);
	callback(ans_id);
};

module.exports.getAnswer = async (answerId, callback) => {
	const sql = 'Select ans_text from answer where ans_id = $1';
	const { rows: answer } = await pool.query(sql, [answerId]);
	callback(answer[0]);
};

module.exports.getAllAnswers = async () => {};

module.exports.deleteAnswer = async () => {};
