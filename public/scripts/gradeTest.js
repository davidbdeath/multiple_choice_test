const answers = document.querySelectorAll('input[type="radio"]');
const getGrade = document.getElementById('get-grade');
const scoreDisplay = document.getElementById('score-display');
const scoreDialog = document.getElementById('score-dialog');
const submitedAnswers = [];

console.log(correctAnswers)

// Get Submitted Form Data
const getAnswers = () => {
	submitedAnswers.length = 0;
	answers.forEach((answer) => {
		if (answer.checked == true) {
			submitedAnswers.push(answer.value);
		}
	});
};

// Change stying of form on submit.
const markAnswers = () => {
	answers.forEach((answer) => {
		if (answer.checked == true) {
			if (correctAnswers.includes(answer.value) == false) {
				answer.parentElement.classList.add('text-danger', 'fw-bold');
			} else {
				answer.parentElement.classList.add('text-success', 'fw-bold');
			}
		}
	});
	getGrade.classList.add('d-none');
	answers.forEach((answer) => {
		answer.classList.add('d-none');
	});
};

const displayGrade = (submited, correct) => {
	let grade = [0, 0];
	grade[1] = submited.length;
	submited.forEach((sub) => {
		if (correct.includes(sub)) {
			grade[0]++;
		}
	});
	let score = Math.round((grade[0] / grade[1]) * 100);
	scoreDisplay.value = `${score}%`;
	scoreDialog.classList.add('card', 'text-center', 'mb-5');
	if (score > 85) {
		scoreDisplay.classList.add('text-success');
	} else if (score > 66) {
		scoreDisplay.classList.add('text-warning');
	} else if (score <= 65) {
		scoreDisplay.classList.add('text-danger');
	}
};

getGrade.addEventListener('click', (e) => {
	e.preventDefault();
	getAnswers();
	markAnswers();
	displayGrade(submitedAnswers, correctAnswers);
});
