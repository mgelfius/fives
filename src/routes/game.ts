import { Random } from "./random";

export class Game {
	index: number;
	currentNumber: string;
	todaysNumbers: string[] = [];
	answers: string[];

	/**
	 * Create a game object from the player's cookie, or initialise a new game
	 */
	constructor(serialized = undefined) {
		if (serialized) {
			const [index, answers, todaysNumbers] = serialized.split('\\');
			this.index = +index;
			this.answers = answers ? answers.split(' ') : [];
			this.todaysNumbers = todaysNumbers.split(',');
			this.currentNumber = this.todaysNumbers[this.index];
		} else {
			const today = new Date().toISOString().split('T')[0].replace(/-/g, '');
			const random = new Random(Number.parseInt(today));
			this.todaysNumbers = [];
			while (this.todaysNumbers.length < 5) {
				let num;
				do {
					num = random.nextInt() % 10000;
					console.dir(num);
				} while (num <= 0 || num.toString().padStart(4, '0').split('0').length > 2);
				this.todaysNumbers.push(num.toString().padStart(4, '0'));
			}
			this.index = 0;
			this.answers = [];
			this.currentNumber = this.todaysNumbers[this.index];
		}
	}

	/**
	 * Update game state based on a guess of a five-letter word. Returns
	 * true if the guess was valid, false otherwise
	 */
	enter(letters: string[]) {
		const word = letters.join('');
		const evalWord = word.replace("^", "**");
		const result = eval(evalWord);

		this.answers.push(result.toString());

		return true;
	}

	/**
	 * Serialize game state so it can be set as a cookie
	 */
	toString() {
		return `${btoa(new Date().toISOString().split('T')[0].replace(/-/g, ''))}\\${this.answers.join(' ')}\\${this.todaysNumbers.join(',')}`;
	}
}
