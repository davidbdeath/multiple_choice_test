const pool = require('../sql/index');
const { getCompleteQuest } = require('./question');

module.exports.createTest = async (testName, questions) => {
	const sqlTestName = 'INSERT INTO test(test_name) values ($1) RETURNING test_id;';
	const { rows } = await pool.query(sqlTestName, [testName]);
	const test = rows[0].test_id

	const sqlTestQuestions = 'INSERT INTO test_question(test_id, quest_id) values ($1, $2);';
	for await (const question of questions) {
		await pool.query(sqlTestQuestions, [test, question])
	}
};

module.exports.getTest = async (testId, callback) => {
	const sql = 'SELECT * FROM test NATURAL JOIN test_question WHERE test_id = $1;';
	const { rows: test } = await pool.query(sql, [testId]);
	const testQuestions = [];
	const testName = test[0].test_name;

	for await (const question of test) {
		await getCompleteQuest(question.quest_id, (question) => {
			testQuestions.push(question);
		});
	}

	callback(testQuestions, testName);
};

const getAllTests = async () => {};

module.exports.deleteTest = async (testId) => {
	const sql = 'DELETE FROM test WHERE test_id = $1;';
	const { rows: test } = await pool.query(sql, [testId]);
};
