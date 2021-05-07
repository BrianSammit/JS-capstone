import Phaser from "phaser";
import config from "./config/config";
import GameScene from "./scenes/gameScene.js";
import BootScene from "./scenes/bootScene.js";
import PreloaderScene from "./scenes/preloaderScene.js";
import TitleScene from "./scenes/titleScene.js";
import RankingScene from "./scenes/rankingScene";
import InputScene from "./scenes/inputScene";

class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.scene.add("Game", GameScene);
    this.scene.add("Boot", BootScene);
    this.scene.add("Preloader", PreloaderScene);
    this.scene.add("Title", TitleScene);
    this.scene.add("Ranking", RankingScene);
    this.scene.add("Input", InputScene);
    this.scene.start("Boot");
  }
}

window.onload = function () {
  window.game = new Game();
};
