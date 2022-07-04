// use .env environment variables
require('dotenv').config();

// custom
const db = require('./sql/index');
const { getAllQuestions } = require('./controller/question');
const { getTest, deleteTest, createTest } = require('./controller/test');
const answers = require('./controller/answer');
const { getScores } = require('./controller/score');
// npm
const express = require('express');
const app = express();
const path = require('path');

// express logic
app.set('view engine', 'ejs');
app.set(express.static(path.join(__dirname, 'views')));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ------------------------ //
// ------- Routes --------- //
// ------------------------ //

// Home Page Get
app.get('/', async (req, res) => {
	const queryString = 'SELECT * FROM test';
	const { rows } = await db.query(queryString);

	res.render('index', { tests: rows });
});

// Take Test Get
app.get('/test-take/:testId', async (req, res) => {
	const { testId } = req.params;

	getTest(testId, (testQuestions, testName) => {
		res.render('test-take', { testQuestions, testName, testId });
	});
});

// New Test Form
app.get('/test-new-form', async (req, res) => {
	getAllQuestions((questions) => {
		res.render('test-new-form', { questions });
	});
});

// Create New Test
app.post('/test-new-post', async (req, res) => {
	// console.log(req.body)
	const { test_name: testName, selected_questions: questions } = req.body;

	await createTest(testName, questions);
	res.redirect('/');
});

app.post('/test-delete', async (req, res) => {
	const { test_id } = req.body;
	await deleteTest(test_id);
	res.redirect('/');
});

// Grade Test Post
app.post('/grade-test', async (req, res) => {
	res.redirect('/');
});

// Scores Get
app.get('/scores', async (req, res) => {
	getScores((scores) => {
		res.render('scores', { scores });
	});
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Test running on port ${port}`);
	console.log('http://localhost:3000');
});
