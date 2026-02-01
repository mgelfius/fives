import { Random } from "./random";
import { evaluate } from 'mathjs'

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
			const today = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }).split(',')[0].split('/');
			const todayFormatted = today[2].padStart(4, '0') + today[0].padStart(2, '0') + today[1].padStart(2, '0');
			const random = new Random(Number.parseInt(todayFormatted));
			this.todaysNumbers = [];
			while (this.todaysNumbers.length < 5) {
				let num;
				do {
					num = random.nextInt() % 10000;
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
		if (letters.length > 0) {
			const word = letters.join('');
			const result = evaluate(word);

			this.answers.push(result.toString());

			return true;
		} else {
			return false;
		}
	}

	/**
	 * Serialize game state so it can be set as a cookie
	 */
	toString() {
		return `${btoa(new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }).split(',')[0].split('/').join(''))}\\${this.answers.join(' ')}\\${this.todaysNumbers.join(',')}`;
	}
}
