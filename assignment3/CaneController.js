import Cane from "./Cane.js";

export default class CaneController {
  CANE_INTERVAL_MIN = 500;
  CANE_INTERVAL_MAX = 2000;

  nextCaneInterval = null;
  cane = [];

  constructor(ctx, caneImages, scaleRatio, speed) {
    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.caneImages = caneImages;
    this.scaleRatio = scaleRatio;
    this.speed = speed;

    this.setNextCaneTime();
  }

  // Cane Generation Timing
  setNextCaneTime() {
    const num = this.getRandomNumber(
      this.CANE_INTERVAL_MIN,
      this.CANE_INTERVAL_MAX
    );

    this.nextCaneInterval = num;
  }

  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  // Create New Canes
  createCane() {
    const index = this.getRandomNumber(0, this.caneImages.length - 1);
    const caneImage = this.caneImages[index];
    const x = this.canvas.width * 1.5;
    const y = this.canvas.height - caneImage.height;
    const cane = new Cane(
      this.ctx,
      x,
      y,
      caneImage.width,
      caneImage.height,
      caneImage.image
    );

    this.cane.push(cane);
  }

  // Manage Cane Creations and Updates
  update(gameSpeed, frameTimeDelta) {
    if (this.nextCaneInterval <= 0) {
      this.createCane();
      this.setNextCaneTime();
    }
    this.nextCaneInterval -= frameTimeDelta;

    // updates all existing canes
    this.cane.forEach((cane) => {
      cane.update(this.speed, gameSpeed, frameTimeDelta, this.scaleRatio);
    });

    // remove off-screen canes
    this.cane = this.cane.filter((cane) => cane.x > -cane.width);
  }

  draw() {
    this.cane.forEach((cane) => cane.draw());
  }

  collideWith(sprite) {
    return this.cane.some((cane) => cane.collideWith(sprite));
  }

  reset() {
    this.cane = [];
  }
}
