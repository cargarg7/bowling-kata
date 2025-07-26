const MAX_PINS_PER_FRAME = 10;
const MAX_GAME_FRAMES = 10;

type FrameScore = {
	rolls: number[];
	frame: number;
	totalScore: number;
};

function itCanPlayGame(rolls: number[] = []): (frame?: number) => boolean {
	return (frame: number = 0): boolean => frame <= MAX_GAME_FRAMES && rolls?.length !== 0;
}

function isSpare(pins1: number = 0): (pins2?: number) => boolean {
	return (pins2: number = 0): boolean => {
		return pins1 + pins2 === MAX_PINS_PER_FRAME;
	};
}

function isStrike(pins: number = 0): boolean {
	return pins === MAX_PINS_PER_FRAME;
}

function rollsScoreCalculation(...rolls): number {
	return rolls?.reduce((acc, roll) => acc + (roll || 0), 0) || 0;
}

function scoreCalculationByStrike({ rolls = [], frame = 1, totalScore = 0 }: FrameScore): FrameScore {
	const remainingRolls = rolls.slice(1);
	return {
		rolls: remainingRolls,
		frame: frame + 1,
		totalScore: totalScore + rollsScoreCalculation(rolls[0], rolls[1], rolls[2]),
	};
}

function scoreCalculationBySpare({ rolls = [], frame = 1, totalScore = 0 }: FrameScore): FrameScore {
	const remainingRolls = rolls.slice(2);
	return {
		rolls: remainingRolls,
		frame: frame + 1,
		totalScore: totalScore + rollsScoreCalculation(rolls[0], rolls[1], rolls[2]),
	};
}

function scoreCalculationByDefault({ rolls = [], frame = 1, totalScore = 0 }: FrameScore): FrameScore {
	const remainingRolls = rolls.slice(2);
	return {
		rolls: remainingRolls,
		frame: frame + 1,
		totalScore: totalScore + rollsScoreCalculation(rolls[0], rolls[1]),
	};
}

function frameScoreCalculation(recursiveCallback = rollsScoreCalculation) {
	return (payload: FrameScore = { rolls: [], frame: 1, totalScore: 0 }): number => {
		const { rolls = [] } = payload || {};
		if (isStrike(rolls[0])) {
			return recursiveCallback(scoreCalculationByStrike(payload));
		}

		if (isSpare(rolls[0])(rolls[1])) {
			return recursiveCallback(scoreCalculationBySpare(payload));
		}

		return recursiveCallback(scoreCalculationByDefault(payload));
	};
}

function gameScoreCalculation({ rolls = [], frame = 1, totalScore = 0 }: FrameScore): number {
	const itCanPlayGameByFrame = itCanPlayGame(rolls);
	if (!itCanPlayGameByFrame(frame)) {
		return totalScore;
	}

	const scoreCalculationByRollType = frameScoreCalculation(gameScoreCalculation);
	return scoreCalculationByRollType({
		rolls,
		frame,
		totalScore,
	});
}

function playGame(rolls: number[] = []): number {
	return gameScoreCalculation({ rolls, frame: 1, totalScore: 0 });
}

export { playGame };
