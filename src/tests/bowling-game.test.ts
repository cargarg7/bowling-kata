import { playGame } from '../core/bowling-game';

describe('Bowling Game Kata (Functional)', () => {
	it('should score 0 for a gutter game', () => {
		const rolls = Array(20).fill(0);
		expect(playGame(rolls)).toBe(0);
	});

	it('should score 20 for all ones with more than max frames', () => {
		const rolls = Array(25).fill(1);
		expect(playGame(rolls)).toBe(20);
	});

	it('should score 20 for all ones', () => {
		const rolls = Array(20).fill(1);
		expect(playGame(rolls)).toBe(20);
	});

	it('should score 300 for a perfect game with more than max frames', () => {
		const rolls = Array(18).fill(10);
		expect(playGame(rolls)).toBe(300);
	});

	it('should score 300 for a perfect game', () => {
		const rolls = Array(12).fill(10);
		expect(playGame(rolls)).toBe(300);
	});

	it('should score 133 for a sample game with more than max frames', () => {
		// 1st frame: 1,4; 2nd: 4,5; 3rd: 6,4; 4th: 5,5; 5th: 10; 6th: 0,1; 7th: 7,3; 8th: 6,4; 9th: 10; 10th: 2,8,6, 11th: 1, 1, 12th: 1, 1
		const rolls = [1, 4, 4, 5, 6, 4, 5, 5, 10, 0, 1, 7, 3, 6, 4, 10, 2, 8, 6, 1, 1, 1, 1];
		expect(playGame(rolls)).toBe(133);
	});

	it('should score 133 for a sample game', () => {
		// 1st frame: 1,4; 2nd: 4,5; 3rd: 6,4; 4th: 5,5; 5th: 10; 6th: 0,1; 7th: 7,3; 8th: 6,4; 9th: 10; 10th: 2,8,6
		const rolls = [1, 4, 4, 5, 6, 4, 5, 5, 10, 0, 1, 7, 3, 6, 4, 10, 2, 8, 6];
		expect(playGame(rolls)).toBe(133);
	});
});
