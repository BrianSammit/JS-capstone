import Phaser from "phaser";
import config from "./config/config";
import GameScene from "./scenes/gameScene.js";
import BootScene from "./scenes/bootScene.js";
import PreloaderScene from "./scenes/preloaderScene.js";

class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.scene.add("Game", GameScene);
    this.scene.add("Boot", BootScene);
    this.scene.add("Preloader", PreloaderScene);
    this.scene.start("Boot");
  }
}

window.onload = function () {
  window.game = new Game();
};
