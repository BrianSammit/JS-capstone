class Game extends Phaser.Scene {
  constructor() {
    super({ key: "game" });
  }

  preload() {
    this.load.image("ground", "../dist/assets/ground.png");
    this.load.image("zombie-1", "../dist/assets/animation/Run3.png");
  }

  create() {
    this.gameSpeed = 10;
    const { height, width } = this.game.config;

    this.ground = this.add
      .tileSprite(0, height, width, 0, "ground")
      .setOrigin(0, 1);
    this.ground.scale = 0.5;
    this.zombie = this.physics.add
      .sprite(0, height, "zombie-1")
      .setOrigin(0, 1)
      .setCollideWorldBounds(true)
      .setGravityY(5000);
    this.zombie.scale = 0.3;
    this.handleImputs();
  }

  handleImputs() {
    this.input.keyboard.on("keydown-SPACE", () => {
      if (!this.zombie.body.onFloor()) {
        return;
      }
      this.zombie.setVelocityY(-1600);
    });
  }

  update() {
    this.ground.tilePositionX += this.gameSpeed;
  }
}

export default Game;
