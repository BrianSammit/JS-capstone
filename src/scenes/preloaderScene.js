import "phaser";

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super("Preloader");
  }

  preload() {
    this.load.audio("jump", "assets/jump.m4a");
    this.load.audio("hit", "assets/hit.mp3");
    this.load.audio("reach", "assets/reach.mp3");
    this.load.audio("horda", "assets/Zombie.mp3");

    this.load.image("ground", "assets/ground.png");
    this.load.image("zombie-1", "assets/Animation/Idle1.png");
    this.load.image("zombie-jump", "assets/Animation/Jump5.png");
    this.load.image("zombie-down", "assets/Animation/Jump6.png");
    this.load.image("zombie-hurt", "assets/Animation/Hurt4.png");
    this.load.image("bullet", "assets/bullet.png");
    this.load.image("restart", "assets/restart.png");
    this.load.image("game-over", "assets/game-over.png");
    this.load.image("background", "assets/back-1.jpg");

    this.load.image("head", "assets/Animation/head3.png");
    this.load.image("play", "assets/play_button.png");
    this.load.image("score", "assets/score-button.png");

    this.load.image("obsticle-1", "assets/obsticle-1.png");
    this.load.image("obsticle-2", "assets/obsticle-2.png");
    this.load.image("obsticle-3", "assets/obsticle-3.png");
    this.load.image("obsticle-4", "assets/obsticle-4.png");
    this.load.image("obsticle-5", "assets/obsticle-5.png");
    this.load.image("obsticle-6", "assets/obsticle-6.png");

    this.load.spritesheet("zombie", "assets/spritesheet.png", {
      frameWidth: 141,
      frameHeight: 160,
    });
  }

  create() {
    const { height, width } = this.game.config;

    this.loading = this.add.sprite(430, height / 2, "loading").setDepth(1);

    this.background = this.add
      .tileSprite(0, height, 0, 0, "background")
      .setOrigin(0, 1);

    this.zombie_logo = this.physics.add
      .sprite(width / 1.5, height, "zombie_logo")
      .setOrigin(0, 1);

    this.anims.create({
      key: "zombie_logo",
      frames: this.anims.generateFrameNumbers("zombie_logo", {
        start: 0,
        end: 5,
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.time.addEvent({
      // delay: 5000,
      callback: () => {
        this.scene.start("Title");
      },
      loop: true,
    });
  }

  update() {
    this.zombie_logo.play("zombie_logo", true);
    this.background.tilePositionX += 5;
  }
}
