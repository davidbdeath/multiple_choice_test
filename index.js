// use .env environment variables
require('dotenv').config();

// npm
const express = require('express');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate');

// custom
const db = require('./sql/index');
const { getAllQuestions } = require('./controller/question');
const { getAllTests, getTest, deleteTest, createTest, gradeTest } = require('./controller/test');
const answers = require('./controller/answer');
const { getScores } = require('./controller/score');


// express logic
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set(express.static(path.join(__dirname, 'views')));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ------------------------ //
// ------- Routes --------- //
// ------------------------ //

// Home Page Get
app.get('/', (req, res) => {
	getAllTests((tests) => {
		res.render('index', { tests });
	});
});

// Take Test
app.get('/test-take/:testId', async (req, res) => {
	const { testId } = req.params;

	getTest(testId, (testQuestions, testName) => {
		res.render('test-take', { testQuestions, testName, testId });
	});
});

// New Test Form
app.get('/test-new-form', (req, res) => {
	getAllQuestions((questions) => {
		res.render('test-new-form', { questions });
	});
});

// New Test Create 
app.post('/test-new-post', async (req, res) => {
	// console.log(req.body)
	const { test_name: testName, selected_questions: questions } = req.body;

	await createTest(testName, questions);
	res.redirect('/');
});

// Delete Test
app.post('/test-delete', async (req, res) => {
	const { test_id } = req.body;
	await deleteTest(test_id);
	res.redirect('/');
});

// TODO create edit test router

// Grade Test Post
app.post('/grade-test/*', async (req, res) => {
	const { correct, incorrect, testLength, grade } = await gradeTest(req);
	console.log(grade)
});

// New Question Create
app.post('/new-question-post', (req, res) => {
	// TODO finish Question Create
	console.log(req.body);
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
