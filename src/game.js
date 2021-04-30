class Game extends Phaser.Scene {
  constructor() {
    super({ key: "game" });
  }

  preload() {
    this.load.image("ground", "assets/ground.png");
    this.load.image("zombie-1", "assets/Animation/Idle1.png");
    this.load.image("zombie-jump", "assets/Animation/Jump5.png");
    this.load.image("zombie-down", "assets/Animation/Jump6.png");

    this.load.spritesheet("zombie", "assets/spritesheet.png", {
      frameWidth: 99,
      frameHeight: 160,
    });
  }

  create() {
    this.isGameRunning = false;
    this.gameSpeed = 10;
    const { height, width } = this.game.config;

    this.startTrigger = this.physics.add
      .sprite(0, 10)
      .setOrigin(0, 1)
      .setImmovable();
    this.ground = this.add
      .tileSprite(0, height, 250, 480, "ground")
      .setOrigin(0, 1);
    this.ground.scale = 0.5;
    this.zombie = this.physics.add
      .sprite(0, height, "zombie-1")
      .setOrigin(0, 1)
      .setCollideWorldBounds(true)
      .setGravityY(5000);

    this.initAnims();
    this.initAnimsStartTrigger();
    this.handleImputs();
  }

  initAnimsStartTrigger() {
    const { width, height } = this.game.config;
    this.physics.add.overlap(
      this.startTrigger,
      this.zombie,
      () => {
        if (this.startTrigger.y === 10) {
          this.startTrigger.body.reset(0, height);
          return;
        }

        this.startTrigger.disableBody(true, true);

        const startEvent = this.time.addEvent({
          delay: 1000 / 60,
          loop: true,
          callbackScope: this,
          callback: () => {
            this.zombie.setVelocityX(80);
            this.zombie.play("zombie-run", 1);

            if (this.ground.width < width) {
              this.ground.width += 17 * 2;
            }

            if (this.ground.width >= width) {
              this.ground.width = width;
              this.isGameRunning = true;
              this.zombie.setVelocity(0);
              startEvent.remove();
            }
          },
        });
      },
      null,
      this
    );
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

      this.zombie.body.height = 160;
      this.zombie.body.offset.y = 0;

      this.zombie.setVelocityY(-1600);
    });

    this.input.keyboard.on("keydown-DOWN", () => {
      if (!this.zombie.body.onFloor()) {
        return;
      }
      this.zombie.body.height = 70;
      this.zombie.body.offset.y = 90;
    });

    this.input.keyboard.on("keyup-DOWN", () => {
      this.zombie.body.height = 160;
      this.zombie.body.offset.y = 0;
    });
  }

  update() {
    if (!this.isGameRunning) {
      return;
    }
    this.ground.tilePositionX += this.gameSpeed;

    if (this.zombie.body.deltaAbsY() > 0) {
      this.zombie.anims.stop();
      this.zombie.setTexture("zombie-jump");
    } else {
      this.zombie.body.height <= 81
        ? this.zombie.setTexture("zombie-down")
        : this.zombie.play("zombie-run", true);
    }
  }
}

export default Game;
