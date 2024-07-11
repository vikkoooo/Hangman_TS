// index.ts

const words: string[] = ["javascript", "typescript", "hangman"];
let secretWord: string; // word to be guessed
let wrongLetters: string[] = ["Å", "Ä", "Ö"]; // store incorrect guesses
let correctLetters: string[] = []; // store correct guesses
let remainingTries: number = 6; // how many guesses

const hangmanParts: string[] = ["ground", "scaffold", "head", "body", "arms", "legs"];
const wrongLettersDiv: any = document.getElementById("wrong-letters"); // todo: add support of typing
const wordDisplayDiv: any = document.getElementById("word-display"); // todo: add support of typing
const letterInput: any = document.getElementById("letter-input"); // todo: add support of typing

function initializeGame() {
	secretWord = words[Math.floor(Math.random() * words.length)];

	// hide parts on start 
	hangmanParts.forEach(part => {
		const element = document.getElementById(part) as HTMLElement;
		console.log(element);
		if (element.style.opacity = "1") {
			element.style.opacity = "0";
		}
	});
}

// todo: add support of typing 
letterInput.addEventListener("input", (event: any) => {
	console.log(event);
	const letter: string = event.data.toUpperCase();

	// Check if letter exists in arrays
	if (!wrongLetters.includes(letter) && !correctLetters.includes(letter)) {
		if (secretWord.includes(letter)) {
			correctLetters.push(letter);
		} else {
			wrongLetters.push(letter);
			remainingTries--;
		}
		updateDisplay();
	}
	letterInput.value = "";
});


// todo: edit/rewrite this code
function updateDisplay() {
	// Display the word with underscores for missing letters
	wordDisplayDiv.textContent = secretWord.split("").map(letter => correctLetters.includes(letter) ? letter : "_").join(" ");

	// Display wrong letters
	wrongLettersDiv.textContent = `Wrong letters: ${wrongLetters.join(", ")}`;

	// Update hangman SVG parts' opacity based on the number of wrong guesses
	hangmanParts.forEach((part, index) => {
		const element = document.getElementById(part) as HTMLElement;
		if (element) element.style.opacity = index < wrongLetters.length ? "1" : "0";
	});

	// Check for win/lose condition
	if (remainingTries <= 0) {
		wordDisplayDiv.textContent = `You lost! The word was: ${secretWord}`;
		letterInput.disabled = true;
	} else if (!wordDisplayDiv.textContent.includes("_")) {
		wordDisplayDiv.textContent = "You won!";
		letterInput.disabled = true;
	}
}

initializeGame(); // run
