const pool = require('../sql/index');

module.exports.getScores = async (callback) => {
	const sql = 'SELECT test_id, test_name, score_id, student_name, score.score FROM score NATURAL JOIN test;';
	const { rows: scores } = await pool.query(sql);

	callback(scores)
}