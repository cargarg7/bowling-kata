import { BowlingGame } from "../core/bowlingGame";

describe('The Bowling Game', () => {
	let game: BowlingGame;
	beforeEach(()=>{
		game = new BowlingGame();
	});

	it('calculates score for a given gutter game', () => {
		rollMany(20, 0);

		expect(game.calculateTotalScore()).toBe(0);
	});

	it('calculates the score for a given all ones game', () => {
		rollMany(20, 1);

		expect(game.calculateTotalScore()).toBe(20);
	});

	it('calculates the score for a given one spare and extra roll', () => {
		rollSpare();
		game.roll(5);
		rollMany(17,0);

		expect(game.calculateTotalScore()).toBe(20);
	});

	it('calculates the score for a given one strike and some extra rolls', () => {
		rollStrike();
		game.roll(2);
		game.roll(3);
		rollMany(16,0);

		expect(game.calculateTotalScore()).toBe(20);
	});

	it('calculates the score for a given perfect game', () => {
		rollMany(12,10);

		expect(game.calculateTotalScore()).toBe(300);
	});

	it('calculates the score for a given all spares game', () => {
		Array.from({ length: 10 }).forEach(rollSpare);
		game.roll(10);

		expect(game.calculateTotalScore()).toBe(155);
	});

	describe('Comparing scores of two all spares games with different spare patterns', () => {
		it('calculates the score for a game with all 5-5 spares', () => {
			const gameA = new BowlingGame();
			Array.from({ length: 10 }).forEach(()=> {
				gameA.roll(5);
				gameA.roll(5);
			});
			gameA.roll(5); // Bonus roll for the last frame's spare

			expect(gameA.calculateTotalScore()).toBe(150);
		});

		it('calculates the score for a game with all 8-2 spares', () => {
			const gameB = new BowlingGame();
			Array.from({ length: 10 }).forEach(()=> {
				gameB.roll(8);
				gameB.roll(2);
			});
			gameB.roll(8); // Bonus roll for the last frame's spare

			expect(gameB.calculateTotalScore()).toBe(180);
		});
	});

	function rollMany(times, pins: number ) {
		return Array.from({ length: times })
			.forEach(() => game.roll(pins));
	}

	function rollStrike() {
		game.roll(10);
	}

	function rollSpare() {
		rollMany(2, 5);
	}
});
