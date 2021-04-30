class Game extends Phaser.Scene {
  constructor() {
    super({ key: "game" });
  }

  preload() {
    this.load.image("ground", "assets/ground.png");
    this.load.image("zombie-1", "assets/Animation/Idle1.png");
    this.load.image("zombie-jump", "assets/Animation/Jump5.png");
    this.load.image("zombie-down", "assets/Animation/Jump6.png");
    this.load.image("zombie-hurt", "assets/Animation/Hurt4.png");
    this.load.image("bullet", "assets/bullet.png");

    this.load.image("obsticle-1", "assets/obsticle-1.png");
    this.load.image("obsticle-2", "assets/obsticle-2.png");
    this.load.image("obsticle-3", "assets/obsticle-3.png");
    this.load.image("obsticle-4", "assets/obsticle-4.png");
    this.load.image("obsticle-5", "assets/obsticle-5.png");
    this.load.image("obsticle-6", "assets/obsticle-6.png");

    this.load.spritesheet("zombie", "assets/spritesheet.png", {
      frameWidth: 99,
      frameHeight: 160,
    });
  }

  create() {
    this.isGameRunning = false;
    this.gameSpeed = 10;
    this.respawnTime = 0;
    const { height, width } = this.game.config;

    this.startTrigger = this.physics.add
      .sprite(0, 10)
      .setOrigin(0, 1)
      .setImmovable();
    this.ground = this.add
      .tileSprite(0, height, 150, 72, "ground")
      .setOrigin(0, 1);
    this.zombie = this.physics.add
      .sprite(0, height, "zombie-1")
      .setOrigin(0, 1)
      .setCollideWorldBounds(true)
      .setGravityY(5000);

    this.obsticles = this.physics.add.group();

    this.initAnims();
    this.initColliders();
    this.initAnimsStartTrigger();
    this.handleImputs();
  }

  initColliders() {
    this.physics.add.collider(
      this.zombie,
      this.obsticles,
      () => {
        this.physics.pause();
        this.isGameRunning = false;
        this.anims.pauseAll();
        this.zombie.setTexture("zombie-hurt");
        this.respawnTime = 0;
        this.gameSpeed = 10;
      },
      null,
      this
    );
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

      this.zombie.setVelocityY(-2000);
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

  placeObsticles() {
    const { width, height } = this.game.config;
    const obsticleNum = Math.floor(Math.random() * 7) + 1;
    const distance = Phaser.Math.Between(600, 900);

    let obsticle;
    if (obsticleNum > 6) {
      const enemyHeight = [25, 80];
      obsticle = this.obsticles.create(
        width + distance,
        height - enemyHeight[Math.floor(Math.random() * 2)],
        "bullet"
      );
    } else {
      obsticle = this.obsticles.create(
        width + distance,
        height,
        `obsticle-${obsticleNum}`
      );
      obsticle.body.offset.y = +10;
    }

    obsticle.setOrigin(0, 1).setImmovable();
  }

  update(time, delta) {
    if (!this.isGameRunning) {
      return;
    }
    this.ground.tilePositionX += this.gameSpeed;
    Phaser.Actions.IncX(this.obsticles.getChildren(), -this.gameSpeed);
    this.respawnTime += delta * this.gameSpeed * 0.08;

    if (this.respawnTime >= 1500) {
      this.placeObsticles();
      this.respawnTime = 0;
    }

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
