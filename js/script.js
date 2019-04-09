/************ Variable  ************/
const numberWrapper = document.querySelector('.math__number-wrap');
const numberOneBox = document.querySelector('.math__number--one');
const numberTwoBox = document.querySelector('.math__number--two');
const userAnswerForm = document.querySelector('.math__answer-form');
const userAnswerBox = document.querySelector('.math__answer-user');
const mathSymbol = document.querySelector('.math__type-symbol');
const gameStepBox = document.querySelector('.math__step');
const correctAnsBox = document.querySelector('.math__answer-correct');
const timeBoard = document.querySelector('.math__time');
const answerTypeBox = document.querySelector('.math__answer-type');
const selectedMathType = document.querySelector('.math__type-select');
const intro = document.querySelector('.math__intro');

var score = 0;
var gameStep = 1;
var answer = {
	correctAns: 0,
}


/************ Function  ************/

function generateRandom(min,max) { // function to  generate Random Number between 10 And 100
	return Math.floor(Math.random() * (max - min) + min);
}


var timeLeft;

function timeCheck() {

	
	 
	var fullTime = 15;
	timeBoard.textContent = `Answer in: ${fullTime} seconds `;
	clearInterval(timeLeft);

	timeLeft = setInterval(function () {
		fullTime--;
		timeBoard.textContent = `Answer in: ${fullTime} seconds `;

		if(fullTime === 1 && gameStep === 10) { // if it is last second of 10th step of the game
			clearInterval(timeLeft);
			gameOver();
			disableAnswerBox();
			return;
		}

		// if(gameStep === 11) { // to clear the interval if user sumbited the 10th step
		// 	clearInterval(timeLeft);
		// 	gameOver();
		// 	disableAnswerBox();
		// 	return;
		// }

		if(fullTime === 1) { // to start a new game when time is when one second left
			timeCheck();
			wrongAnswer();
		}
	},1000);
}


function startGame() {

	if(gameStep === 11) { // to stop the game from running 10th step
		clearInterval(timeLeft);
		gameOver();
		disableAnswerBox();
		return;
	};

	enableAnswerBox();
	intro.style.display = 'none';
	numberWrapper.style.visibility = 'visible';
	selectedMathType.disabled = true;
	userAnswerBox.focus();

	timeCheck();
	gameStepBox.textContent = `${gameStep} of 10`;

	let randomNumberOne = generateRandom(10,100);
	let randomNumberTwo = generateRandom(10,100);

		numberOneBox.textContent = randomNumberOne;
		numberTwoBox.textContent = randomNumberTwo;

	var correctAns;

	// setting if game to multiplication or addition or subtraction

		if(selectedMathType.value === 'add') {
			correctAns = randomNumberOne + randomNumberTwo;
			mathSymbol.textContent = '+';
		}else if(selectedMathType.value === 'mul'){
			correctAns = randomNumberOne * randomNumberTwo;
			mathSymbol.textContent = '*';
		}else{
			correctAns = randomNumberOne - randomNumberTwo;
			mathSymbol.textContent = '-';
		}

	answer.correctAns = correctAns;  // sending correct answer to the answer object
	gameStep++;
}

function submitForm(e) {
	e.preventDefault();
	checkAnswer();
	clearInterval(timeLeft); // to stop while submiting
	userAnswerBox.value = '';
	disableAnswerBox(); 
};

function disableAnswerBox() {
	userAnswerBox.disabled = true;
	userAnswerBox.style.background = '#fff';
	userAnswerBox.style.borderWidth = '1px';
	userAnswerBox.style.border = '1px solid initial';
	userAnswerBox.style.borderStyle = 'inset';
	// userAnswerBox.style.outline = '1px solid initial';
}

function enableAnswerBox() {
	userAnswerBox.disabled = false;
}

function checkAnswer() {
	const userAnswer = parseFloat(userAnswerBox.value);

	if(userAnswer === answer.correctAns) {
		correctAnswer();
	}else if(userAnswer !== answer.correctAns){
		wrongAnswer();
	}
}


function correctAnswer() {
		answerTypeBox.classList.add('math__answer-type--correct');
		answerTypeBox.textContent = 'Correct :) ';
	
	setTimeout(function() {
		answerTypeBox.classList.remove('math__answer-type--correct');
		answerTypeBox.textContent = ' ';
		startGame();
	}, 1000)
	 
}


function wrongAnswer() {
		answerTypeBox.textContent = 'Wrong... :(';
		answerTypeBox.classList.add('math__answer-type--wrong');
		displayCorrectAnswer(); 
	
	setTimeout(function() {
		if(gameStep < 11) {
			answerTypeBox.classList.remove('math__answer-type--wrong');
			startGame();
		}
	}, 1000)
}

function displayCorrectAnswer() {
		correctAnsBox.textContent = answer.correctAns;
		correctAnsBox.style.display = 'block';
	
	setTimeout(function() {
		if(gameStep < 11)  { // to keep showing the answer while submiting last step
			answerTypeBox.textContent = ' ';
			correctAnsBox.style.display = 'none';
		}
	}, 1000)
}

function gameOver() {
	console.log('game is over now');
	userAnswerBox.disabled = true;
}

/************ Event Listener ************/


userAnswerForm.addEventListener('submit', submitForm);
window.addEventListener('keydown', function(e) {
	if(e.keyCode === 32) {
		if(gameStep === 11) return;
		startGame();
	};
}); 
