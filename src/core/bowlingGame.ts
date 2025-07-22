export type ScorePerFrame = { totalScore: number, rollIndex: number }

export class BowlingGame {
  private readonly maxScorePerFrame = 10;
  private rolls: number[] = [];

  roll(pins: number): void {
    this.rolls.push(pins);
  }

  calculateTotalScore(): number {
    const result = this.frames()
      .reduce(this.calculateScorePerFrame, { totalScore: 0, rollIndex: 0 });
    return result.totalScore;
  }

  private calculateScorePerFrame = ({ totalScore, rollIndex }: ScorePerFrame) => {
    if (this.isStrike(rollIndex)) {
      return {
        totalScore: totalScore + this.maxScorePerFrame + this.strikeBonus(rollIndex),
        rollIndex: rollIndex + 1
      };
    }
    if (this.isSpare(rollIndex)) {
      return {
        totalScore: totalScore + this.maxScorePerFrame + this.spareBonus(rollIndex),
        rollIndex: rollIndex + 2
      };
    }
    return { totalScore: totalScore + this.sumOfBallsInFrame(rollIndex), rollIndex: rollIndex + 2 };
  };

  private frames() {
    const numberOfFrames = 10;
    return Array.from({ length: numberOfFrames }).map((_, i) => i);
  }

  private isSpare(rollIndex: number) {
    return this.rolls[rollIndex] + this.rolls[rollIndex + 1] == this.maxScorePerFrame;
  }

  private isStrike(rollIndex: number) {
    return this.rolls[rollIndex] == this.maxScorePerFrame;
  }

  private strikeBonus(rollIndex: number) {
    return this.rolls[rollIndex + 1] + this.rolls[rollIndex + 2];
  }

  private spareBonus(rollIndex: number) {
    return this.rolls[rollIndex + 2];
  }

  private sumOfBallsInFrame(rollIndex: number) {
    return this.rolls[rollIndex] + this.rolls[rollIndex + 1];
  }
}
