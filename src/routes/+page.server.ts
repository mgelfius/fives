import { fail } from '@sveltejs/kit';

import type { Actions, PageServerLoad } from './$types';
import { Game } from './game';

export const load = (({ cookies }) => {
	const game = new Game(cookies.get('fives'));
	return {
		answers: game.answers,
		currentNumber: game.currentNumber,
		todaysNumbers: game.todaysNumbers
	};
}) satisfies PageServerLoad;

const getTomorrowDate = () => {
	let tomorrow = new Date();
	tomorrow.setDate(tomorrow.getDate() + 1);
	tomorrow.setHours(0, 0, 0, 0);
	return tomorrow
}

export const actions = {
	/**
	 * Modify game state in reaction to a keypress. If client-side JavaScript
	 * is available, this will happen in the browser instead of here
	 */
	update: async ({ request, cookies }) => {
		const game = new Game(cookies.get('fives'));
		const data = await request.formData();
		const key = data.get('key');

		const i = game.answers.length;

		if (key === 'backspace') {
			game.answers[i] = game.answers[i].slice(0, -1);
		} else {
			game.answers[i] += key;
		}

		cookies.set('fives', game.toString(), { path: '/', expires: getTomorrowDate() });
	},

	/**
	 * Modify game state in reaction to a guessed word. This logic always runs on
	 * the server, so that people can't cheat by peeking at the JavaScript
	 */
	enter: async ({ request, cookies }) => {
		const game = new Game(cookies.get('fives'));

		const data = await request.formData();
		const guess = data.getAll('guess') as string[];
		if (!game.enter(guess)) {
			return fail(400, { badGuess: true });
		}
		
		cookies.set('fives', game.toString(), { path: '/', expires: getTomorrowDate() });
	},

	restart: async ({ cookies }) => {
		cookies.delete('fives', { path: '/' });
	}
} satisfies Actions;
