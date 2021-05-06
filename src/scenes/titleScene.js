import "phaser";

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super("Title");
  }

  create() {
    const { height, width } = this.game.config;

    this.background = this.add
      .tileSprite(0, height, 0, 0, "background")
      .setOrigin(0, 1);

    this.head = this.add.sprite(430, height / 2, "head").setDepth(1);
    this.head.setVisible(false);

    this.playButton = this.add.sprite(350, height / 2, "play").setDepth(1);
    this.scoreButton = this.add.sprite(650, height / 2, "score").setDepth(1);

    this.playButton.setInteractive();
    this.scoreButton.setInteractive();

    this.playButton.on("pointerover", () => {
      this.head.setVisible(true);
      this.head.y = this.playButton.y - this.playButton.height - 20;
      this.head.x = this.playButton.x;
    });

    this.playButton.on("pointerout", () => {
      this.head.setVisible(false);
    });

    this.playButton.on("pointerup", () => {
      this.scene.start("Game");
    });

    this.scoreButton.on("pointerover", () => {
      this.head.setVisible(true);
      this.head.y = this.scoreButton.y - this.scoreButton.height - 20;
      this.head.x = this.scoreButton.x;
    });

    this.scoreButton.on("pointerout", () => {
      this.head.setVisible(false);
    });

    this.scoreButton.on("pointerup", () => {
      this.scene.start("Ranking");
    });
  }

  update() {
    this.background.tilePositionX += 5;
  }
}
