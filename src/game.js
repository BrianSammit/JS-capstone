class Game extends Phaser.Scene {
  constructor() {
    super({ key: "game" });
  }

  preload() {
    this.load.image("ground", "assets/ground.png");
    this.load.image("zombie-1", "assets/Animation/Idle1.png");
    this.load.image("zombie-jump", "assets/Animation/Jump5.png");

    this.load.spritesheet("zombie", "assets/spritesheet.png", {
      frameWidth: 99,
      frameHeight: 160,
    });
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

    this.initAnims();
    this.handleImputs();
  }

  initAnims() {
    this.anims.create({
      key: "zombie-run",
      frames: this.anims.generateFrameNumbers("zombie", { start: 0, end: 3 }),
      frameRate: 8,
      repeat: -1,
    });
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

    if (this.zombie.body.deltaAbsY() > 0) {
      this.zombie.anims.stop();
      this.zombie.setTexture("zombie");
    } else {
      this.zombie.play("zombie-run", true);
    }
  }
}

export default Game;
