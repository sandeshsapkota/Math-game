/************ Variable  ************/

const randomNumberOneContainer = document.querySelector('.math__num--one');
const randomNumberTwoContainer = document.querySelector('.math__num--two');
const correctAnsBox = document.querySelector('.math__ans--cal');
const userAnswerForm = document.querySelector('.math__ans');
const userAnswerInput = document.querySelector('.math__ans--user');
const timeBoard = document.querySelector('.math__time');
const goToPlayBtn = document.querySelector('.math__goto');
const fieldWrapper = document.querySelector('.math__field--wrapper');
const startBtn = document.querySelector('.math__start');
var scoreBoard = document.querySelector('.math__score');
var score = 0;
	scoreBoard.textContent = `Score : ${score}`;


var answer = {
	correctAns: 0,
}

/************ Function  ************/

function generateRandom(min,max) { // function to  generate Random Number between 10 And 100
	return Math.floor(Math.random() * (max - min) + min);
}

function startGame() {

		startBtn.style.opacity = 0;
		scoreBoard.style.opacity = 1;
	
		userAnswerInput.value = '';
		userAnswerInput.focus();

	let randomNumberOne = generateRandom(10,100);
	let randomNumberTwo = generateRandom(10,100);

		randomNumberOneContainer.textContent = randomNumberOne;
		randomNumberTwoContainer.textContent = randomNumberTwo;
	const correctAns = randomNumberOne * randomNumberTwo;
		answer.correctAns = correctAns;  // sending correct answer to the answer object
	console.log(answer);


}

function submitForm(e) {
	e.preventDefault();
	checkAnswer();
	startGame();
};

function checkAnswer() {
	const userAnswer = parseFloat(userAnswerInput.value);

	if(isNaN(userAnswer)) {
		console.log('null');
		score--;
		
	}else if(userAnswer === answer.correctAns) {
		correctAnswer();
		console.log('correct');
		score++;
	}else if(userAnswer !== answer.correctAns){
		console.log('Wrong');
	}



	scoreBoard.textContent = `Score: ${score}`;
}

function displayComponent(){
	fieldWrapper.classList.remove('hidden');
}


function correctAnswer() {
	var correctBoard = document.querySelector('.correct');
		correctBoard.style.display = 'block';
	

	setTimeout(function() {
		correctBoard.opacity = 0;

		console.log('hiiiii')
	}, 1000)

	 
}

/************ Event Listener ************/

 


function timeCalc() {
  let timeLeft = null;
  let fullTime = 0;

    return function() {      
	  clearInterval(timeLeft);
	  fullTime = 195;
	  let min = Math.floor(fullTime / 60);
	  let second = fullTime % 60;
	  timeBoard.textContent = `${'0' + min} : ${second < 10 ? `0${second}` : second }`;

		timeLeft = setInterval(function() {
			min = Math.floor(fullTime / 60)
			second = fullTime % 60;
			timeBoard.textContent = `${'0' + min} : ${second < 10 ? `0${second}` : second }`;
		    fullTime--;

		    if(fullTime === 1) {
		    	console.log(`game Over`);
		    	return;
		    }
	  	},1000);
	}
}



startBtn.addEventListener('click', timeCalc());
startBtn.addEventListener('click', startGame);
userAnswerForm.addEventListener('submit', submitForm);
goToPlayBtn.addEventListener('click', displayComponent);


window.addEventListener('keydown', function(e) {
	console.log(e);
	// if(e.keyCode === );
}); 



 

