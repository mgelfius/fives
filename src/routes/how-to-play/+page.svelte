<svelte:head>
	<title>How to play Fives</title>
	<meta name="description" content="How to play Fives" />
</svelte:head>

<div class="text-column">
	<h1>How to play Fives</h1>

	<p>
		Fives is game about combining 4 digits to make a multiple of 5. <br />
		Each digit in the given number can be used exactly once, and 
		you can use the following operations between the digits exactly once: <br />
	</p>
	<p class="operations-list">
		Addition (+) <br />
		Subtraction (-) <br />
		Multiplication (*) <br />
		Division (/) <br />
		Exponentiation (^) <br />
	</p>
	<p>
		There is no guarantee that a multiple of 5 can be made with the given digits,
		but if it can, you get points equal to the result.
	</p>

	<h1>4321</h1>
	<div class="row">
		<span class="number-square">1</span>
		<span class="symbol-square">+</span>
		<span class="number-square">2</span>
		<span class="symbol-square">^</span>
		<span class="number-square">3</span>
		<span class="symbol-square">-</span>
		<span class="number-square">4</span>
	</div>

	<p>
		Following the order of operations, this is calculated as:
	</p>

	<div class="row">
		<span class="number-square successful-guess">5</span>
		<span class="number-square successful-guess"></span>
		<span class="number-square successful-guess"></span>
		<span class="number-square successful-guess"></span>
		<span class="number-square successful-guess"></span>
		<span class="number-square successful-guess"></span>
		<span class="number-square successful-guess"></span>
	</div>

	<p>
		Since 5 is a multiple of 5, this is a valid answer.
	</p>

	<button on:click={() => window.location.href = '/'} class="back-button">Back to game</button>
</div>

<style>
	span {
		display: inline-flex;
		justify-content: center;
		align-items: center;
		font-size: 0.8em;
		width: 2.4em;
		height: 2.4em;
		background-color: white;
		box-sizing: border-box;
		border-radius: 2px;
		border-width: 2px;
		color: rgba(0, 0, 0, 0.7);
	}

	.symbol-square {
		aspect-ratio: 1;
		width: 50%;
		height: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		box-sizing: border-box;
		text-transform: lowercase;
		border: none;
		font-size: calc(0.08 * var(--width));
		border-radius: 2px;
		background: white;
		margin: 0;
		color: rgba(0, 0, 0, 0.7);
		margin-left: 25%;
		margin-top: 25%;
	}

	.number-square {
		aspect-ratio: 1;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		box-sizing: border-box;
		text-transform: lowercase;
		border: none;
		font-size: calc(0.08 * var(--width));
		border-radius: 2px;
		background: white;
		margin: 0;
		color: rgba(0, 0, 0, 0.7);
	}

	.successful-guess {
		border: 0.2rem solid #AFE1AF;
		background-color: #d4f0d4;
	}

	.row {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		grid-gap: 0.2rem;
		margin: 0 0 0.2rem 0;
	}

	.back-button {
		margin-top: 2rem;
		padding: 0.5rem 1rem;
		font-size: 1rem;
		background-color: var(--color-theme-2);
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		transition: border-radius 0.3s, color 0.3s;
	}

	.back-button:hover {
		border-radius: 12px;
		color: #E0E0E0;
	}

	.operations-list {
		font-weight: bold;
	}
</style>
