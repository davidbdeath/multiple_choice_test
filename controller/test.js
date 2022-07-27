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

module.exports.getAllTests = async (callback) => {
	const queryString = 'SELECT * FROM test';
	const { rows: tests } = await pool.query(queryString);

	callback(tests)
};

module.exports.deleteTest = async (testId) => {
	const sql = 'DELETE FROM test WHERE test_id = $1;';
	const { rows: test } = await pool.query(sql, [testId]);
};

module.exports.gradeTest = async (req) => {
	const { 0: testId } = req.params;
	const testLength = Object.keys(req.body).length;
	const submitted = req.body;
	const subAnswers = [];
	const correctAnswers = [];
	let correct = 0;
	let incorrect = 0;

	//get submitted answers only from req.body and create an array
	for (const key in submitted) {
		if (Object.hasOwnProperty.call(submitted, key)) {
			subAnswers.push(submitted[key]);
		}
	}

	//get correct answers from database for test
	await this.getTest(testId, (testQuestions) => {
		for (const answer of testQuestions) {
			correctAnswers.push(answer.correct_ans);
		}
	});

	// compare submitted answers with correct answers
	for (let i = 0; i < testLength; i++) {
		if (subAnswers[i] === correctAnswers[i]) {
			correct++;
		} else {
			incorrect++;
		}
	}
	
	const grade = `${Math.round(correct / testLength * 100)}%`;
	return {correct, incorrect, testLength, grade};
}