import Phaser from "phaser";

import Game from "./game.js";

const config = {
  type: Phaser.AUTO,
  width: 1100,
  height: 550,
  pixelArt: true,
  transparent: true,
  scene: [Game],
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
    },
  },
};

let game = new Phaser.Game(config);
