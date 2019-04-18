/************ Variable  ************/


const numberWrapper = document.querySelector('.math__number-wrap');
const numberOneBox = document.querySelector('.math__number--one');
const numberTwoBox = document.querySelector('.math__number--two');
const userAnswerForm = document.querySelector('.math__answer-form');
const userAnswerBox = document.querySelector('.math__answer-user');
const mathSymbol = document.querySelector('.math__type-symbol');
const gameStepBox = document.querySelector('.math__step');
const correctAnsBox = document.querySelector('.math__answer-correct');
const timeBoard = document.querySelector('.math__time strong');
const answerTypeBox = document.querySelector('.math__answer-type');
const selectedMathType = document.querySelector('.math__type-select');
const mathIntro = document.querySelector('.math__intro');
const mathNotifBox = document.querySelector('.math__set--complete');
const mathAbortBox = document.querySelector('.math__abort');
const mathIncrementBox = document.querySelector('.math__set--incre');
const mathDecrementBox = document.querySelector('.math__set--decre');
const mathAbortNotif = document.querySelector('.math__set--abort');
var answer = { correctAns: 0};
var gameStep;
var timeLeft;
var fullTime;
var score = 0;


/************ Function  ************/


function generateRandom(min,max) { // function to  generate Random Number between 10 And 100
	return Math.floor(Math.random() * (max - min) + min);
}



function timeCheck() {
	fullTime = 60;
	timeBoard.textContent =  fullTime;
	clearInterval(timeLeft);

	timeLeft = setInterval(function () { // timeInterval for the single task
		fullTime--;
		timeBoard.textContent =  fullTime;

		if(fullTime === 0 && gameStep === 11) { // if it is last second of 10th step of the game
			gameOver();
			checkAnswer();
			return;
		}

		if(fullTime === 1) { // to start a new game when one second left
			// timeCheck();
			checkAnswer();
		}
	},1000);;
}




function startGame() {

	if(gameStep === 11) { // to stop the game from running 10th step
		gameOver();
		return;
	};

	userAnswerBox.value = '';

	hideResult(); // hides all results from the previous game

	enableAnswerBox();
	userAnswerBox.focus();

	mathAbortNotif.classList.remove('math__set--visible'); //  in case previous game was aborted

	userAnswerBox.value = '';
	mathIntro.style.display = 'none';
	selectedMathType.disabled = true;
	
	mathAbortBox.style.visibility = 'visible';
	gameStepBox.style.visibility = 'visible';

	timeCheck();
	gameStepBox.textContent = `${gameStep} of 10`;

	let randomNumberOne = generateRandom(10,100);
	let randomNumberTwo = generateRandom(10,100);

		numberOneBox.textContent = randomNumberOne;
		numberTwoBox.textContent = randomNumberTwo;

	var correctAns;

	// setting if game type to either multiplication or addition or subtraction

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
	console.log(correctAns);
	gameStep++;
}


function submitForm() {
	checkAnswer();
	clearInterval(timeLeft); // to stop while submiting
}


function enableAnswerBox() {
	userAnswerBox.disabled = false;
}

function checkAnswer() {
	clearInterval(timeLeft);
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
		score++;
	
	setTimeout(function() {
		if(gameStep < 11) {
			answerTypeBox.classList.remove('math__answer-type--correct');
			answerTypeBox.textContent = ' ';
			startGame();
		}else{
			gameOver();
		}
	}, 1000);
	 
}


function wrongAnswer() {
		answerTypeBox.textContent = 'Wrong... :(';
		answerTypeBox.classList.add('math__answer-type--wrong');
		displayCorrectAnswer(); 
	
	setTimeout(function() {
		if(gameStep < 11) {
			answerTypeBox.classList.remove('math__answer-type--wrong');
			answerTypeBox.textContent = ' ';
			startGame();
		}else{
			gameOver();
		}
	}, 1000);
}



function displayCorrectAnswer() {
		correctAnsBox.textContent = answer.correctAns;
		correctAnsBox.style.display = 'block';
	
	setTimeout(function() {
		if(gameStep < 11)  { // to keep showing the answer while submiting last step
			correctAnsBox.style.display = 'none';
		}
	}, 1000);
}

function gameAbort() {
	clearInterval(timeLeft);
	mathAbortNotif.classList.add('math__set--visible');
	mathAbortBox.style.visibility = 'hidden';
	mathIntro.style.display = 'block';
	userAnswerBox.disabled = true;
}

function gameOver() {
	clearInterval(timeLeft);
	userAnswerBox.disabled = true;
	mathNotifBox.classList.add('math__set--visible');
	mathIntro.style.display = 'block';
	mathAbortBox.style.visibility = 'hidden';
	gameStepBox.style.visibility = 'hidden';

	setTimeout(function() {
		if(score > 6) {
			mathIncrement();
		}else{
			mathDecrement();
		}
	}, 800);

	selectedMathType.disabled = false; 

	
}


function mathIncrement() { 
	mathIncrementBox.classList.add('math__set--visible');
}

function mathDecrement() { 
	mathDecrementBox.classList.add('math__set--visible');
}

function hideResult() {
	answerTypeBox.textContent = '';
	answerTypeBox.classList.remove('math__answer-type--wrong');
	mathNotifBox.classList.add('math__set--visible');
	correctAnsBox.textContent = '';
	mathNotifBox.classList.remove('math__set--visible');
	mathIncrementBox.classList.remove('math__set--visible');
	mathDecrementBox.classList.remove('math__set--visible');
}

 
/************ Event Listener ************/

var count = 0;

window.addEventListener('keydown', function(e) {

	if(e.keyCode === 32) { 
		// if spaceBar is pressed start the game
 		e.preventDefault();
		gameStep = 1;
		startGame();
	}

	if(e.keyCode === 27) {
		// if Esc pressed abort the game
		gameAbort();
	}

	if(e.keyCode === 13) {
		// if enter key is pressed update count
		count++; 
	}

}); 

window.addEventListener('keyup', function(e) {

	// if enter key is released reset the count

 	if(e.keyCode === 13) {
 		count = 0;
 	}

}); 



userAnswerForm.addEventListener('submit', function(e) {
	e.preventDefault();
	if(count === 1) {
		// to not let form submit more than one time even if enter is pressed for long time
		submitForm();
	}
});




mathIntro.addEventListener('click', function() {
	gameStep = 1;
	startGame();
});




window.addEventListener('keypress', function(e) {

});