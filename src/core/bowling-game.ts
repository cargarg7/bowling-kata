const MAX_PINS_PER_FRAME = 10;
const MAX_GAME_FRAMES = 10;

type ScoreType = {
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

function getScorePerFrame(...args): number {
	return args?.reduce((acc, roll) => acc + (roll || 0), 0) || 0;
}

function transformStrikeScoreType({ rolls = [], frame = 1, totalScore = 0 }: ScoreType): ScoreType {
	const remainingRolls = rolls.slice(1);
	return {
		rolls: remainingRolls,
		frame: frame + 1,
		totalScore: totalScore + getScorePerFrame(rolls[0], rolls[1], rolls[2]),
	};
}

function transformSpareScoreType({ rolls = [], frame = 1, totalScore = 0 }: ScoreType): ScoreType {
	const remainingRolls = rolls.slice(2);
	return {
		rolls: remainingRolls,
		frame: frame + 1,
		totalScore: totalScore + getScorePerFrame(rolls[0], rolls[1], rolls[2]),
	};
}

function transformRestScoreType({ rolls = [], frame = 1, totalScore = 0 }: ScoreType): ScoreType {
	const remainingRolls = rolls.slice(2);
	return {
		rolls: remainingRolls,
		frame: frame + 1,
		totalScore: totalScore + getScorePerFrame(rolls[0], rolls[1]),
	};
}

function calculateScorePerFrame(callback = getScorePerFrame) {
	const ROLLS_STRATEGY_BY = {
		STRIKE: transformStrikeScoreType,
		SPARE: transformSpareScoreType,
		DEFAULT: transformRestScoreType,
	};
	return (payload: ScoreType = { rolls: [], frame: 1, totalScore: 0 }): number => {
		const { rolls = [] } = payload || {};
		const transformScoreTypeFunction = isStrike(rolls[0])
			? ROLLS_STRATEGY_BY.STRIKE
			: isSpare(rolls[0])(rolls[1])
			? ROLLS_STRATEGY_BY.SPARE
			: ROLLS_STRATEGY_BY.DEFAULT;
		return callback(transformScoreTypeFunction(payload));
	};
}

function calculateScore({ rolls = [], frame = 1, totalScore = 0 }: ScoreType): number {
	const itCanPlayGameByFrame = itCanPlayGame(rolls);
	if (!itCanPlayGameByFrame(frame)) {
		return totalScore;
	}

	const calculateScoreByRollType = calculateScorePerFrame(calculateScore);
	return calculateScoreByRollType({
		rolls,
		frame,
		totalScore,
	});
}

function playGame(rolls: number[] = []): number {
	return calculateScore({ rolls, frame: 1, totalScore: 0 });
}

export { playGame };
