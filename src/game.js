class Game extends Phaser.Scene {
  constructor() {
    super({ key: "game" });
  }

  preload() {
    this.load.audio("jump", "assets/jump.m4a");
    this.load.audio("hit", "assets/hit.m4a");
    this.load.audio("reach", "assets/reach.m4a");

    this.load.image("ground", "assets/ground.png");
    this.load.image("zombie-1", "assets/Animation/Idle1.png");
    this.load.image("zombie-jump", "assets/Animation/Jump5.png");
    this.load.image("zombie-down", "assets/Animation/Jump6.png");
    this.load.image("zombie-hurt", "assets/Animation/Hurt4.png");
    this.load.image("bullet", "assets/bullet.png");
    this.load.image("restart", "assets/restart.png");
    this.load.image("game-over", "assets/game-over.png");
    this.load.image("cloud", "assets/cloud.png");

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
    this.score = 0;

    const { height, width } = this.game.config;

    this.jumpSound = this.sound.add("jump", { volume: 1 });
    this.hitSound = this.sound.add("hit", { volume: 1 });
    this.reachSound = this.sound.add("reach", { volume: 1 });

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
      .setBodySize(44, 160)
      .setDepth(1)
      .setCollideWorldBounds(true)
      .setGravityY(5000);

    this.scoreText = this.add
      .text(width, 0, "00000", {
        fill: "#535353",
        font: "900 35px Courier",
        resolution: 5,
      })
      .setOrigin(1, 0)
      .setAlpha(0);

    this.highScoreText = this.add
      .text(width, 0, "00000", {
        fill: "#535353",
        font: "900 35px Courier",
        resolution: 5,
      })
      .setOrigin(1, 0)
      .setAlpha(0);

    this.gameOverScreen = this.add
      .container(width / 2, height / 2 - 50)
      .setAlpha(0);
    this.gameOverText = this.add.image(0, 0, "game-over");
    this.restart = this.add.image(0, 200, "restart").setInteractive();

    this.enviroment = this.add.group();
    this.enviroment.addMultiple([
      this.add.image(width / 2, 170, "cloud"),
      this.add.image(width - 80, 80, "cloud"),
      this.add.image(width / 1.3, 100, "cloud"),
    ]);

    this.enviroment.setAlpha(0);

    this.gameOverScreen.add([this.gameOverText, this.restart]);

    this.obsticles = this.physics.add.group();

    this.initAnims();
    this.initColliders();
    this.initAnimsStartTrigger();
    this.handleImputs();
    this.handleScore();
  }

  initColliders() {
    this.physics.add.collider(
      this.zombie,
      this.obsticles,
      () => {
        this.highScoreText.x = this.scoreText.x - this.scoreText.width - 20;

        const highScore = this.highScoreText.text.substr(
          this.highScoreText.text.length - 5
        );

        const newScore =
          Number(this.scoreText.text) > Number(highScore)
            ? this.scoreText.text
            : highScore;

        this.highScoreText.setText("HI " + newScore);
        this.highScoreText.setAlpha(1);

        this.physics.pause();
        this.isGameRunning = false;
        this.anims.pauseAll();
        this.zombie.setTexture("zombie-hurt");
        this.respawnTime = 0;
        this.gameSpeed = 10;
        this.gameOverScreen.setAlpha(1);
        this.score = 0;
        this.hitSound.play();
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
              this.scoreText.setAlpha(1);
              this.enviroment.setAlpha(1);
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

  handleScore() {
    this.time.addEvent({
      delay: 1000 / 10,
      loop: true,
      callbackScope: this,
      callback: () => {
        if (!this.isGameRunning) {
          return;
        }

        this.score++;
        this.gameSpeed += 0.01;

        if (this.score % 100 === 0) {
          this.reachSound.play();

          this.tweens.add({
            targets: this.scoreText,
            duration: 100,
            repeat: 3,
            alpha: 0,
            yoyo: true,
          });
        }

        const score = Array.from(String(this.score), Number);
        for (let i = 0; i < 5 - String(this.score).length; i++) {
          score.unshift(0);
        }

        this.scoreText.setText(score.join(""));
      },
    });
  }

  handleImputs() {
    this.restart.on("pointerdown", () => {
      this.zombie.setVelocityY(0);
      this.zombie.body.height = 160;
      this.zombie.body.offset.y = 0;
      this.physics.resume();
      this.obsticles.clear(true, true);
      this.isGameRunning = true;
      this.gameOverScreen.setAlpha(0);
      this.anims.resumeAll();
    });

    this.input.keyboard.on("keydown-SPACE", () => {
      if (!this.zombie.body.onFloor() || this.zombie.body.velocity.x > 0) {
        return;
      }

      this.zombie.body.height = 160;
      this.zombie.body.offset.y = 0;

      this.jumpSound.play();
      this.zombie.setVelocityY(-2000);
    });

    this.input.keyboard.on("keydown-DOWN", () => {
      if (!this.zombie.body.onFloor() || !this.isGameRunning) {
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
    Phaser.Actions.IncX(this.enviroment.getChildren(), -0.5);

    this.respawnTime += delta * this.gameSpeed * 0.08;

    if (this.respawnTime >= 1500) {
      this.placeObsticles();
      this.respawnTime = 0;
    }

    this.obsticles.getChildren().forEach((obsticle) => {
      if (obsticle.getBounds().right < 0) {
        obsticle.destroy();
      }
    });

    this.enviroment.getChildren().forEach((env) => {
      if (env.getBounds().right < 0) {
        env.x = this.game.config.width + 30;
      }
    });

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
