import "phaser";

export default class BootScene extends Phaser.Scene {
  constructor() {
    super("Boot");
  }

  preload() {
    this.load.spritesheet("zombie_logo", "assets/spritesheet-logo.png", {
      frameWidth: 253,
      frameHeight: 434,
    });
  }

  create() {
    this.scene.start("Preloader");
  }
}
