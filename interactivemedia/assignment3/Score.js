export default class Score {
  score = 0;
  HIGH_SCORE_KEY = "highScore";

  constructor(ctx, scaleRatio) {
    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.scaleRatio = scaleRatio;
  }

  // Increase score based on time passed (0.01 points per millisecond)
  update(frameTimeDelta) {
    this.score += frameTimeDelta * 0.01;
  }

  // Set score back to zero
  reset() {
    this.score = 0;
  }

  // To update high score if the current score is higher and store it in a local storage
  setHighScore() {
    const highScore = Number(localStorage.getItem(this.HIGH_SCORE_KEY));
    if (this.score > highScore) {
      localStorage.setItem(this.HIGH_SCORE_KEY, Math.floor(this.score));
    }
  }

  draw() {
    const highScore = Number(localStorage.getItem(this.HIGH_SCORE_KEY)); // Get the current score from local storage
    const y = 25 * this.scaleRatio;

    const fontSize = 25 * this.scaleRatio;
    this.ctx.font = `${fontSize}px 'Cute Font'`;
    this.ctx.fillStyle = "maroon";
    const scoreX = this.canvas.width - 75 * this.scaleRatio;
    const highScoreX = scoreX - 125 * this.scaleRatio;

    const scorePadded = Math.floor(this.score).toString().padStart(6, 0);
    const highScorePadded = highScore.toString().padStart(6, 0);

    // Draw current score and high score
    this.ctx.fillText(scorePadded, scoreX, y);
    this.ctx.fillText(`HI ${highScorePadded}`, highScoreX, y);
  }
}
