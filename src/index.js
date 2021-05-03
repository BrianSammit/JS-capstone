import Phaser from "phaser";

import Game from "./game.js";

const config = {
  type: Phaser.AUTO,
  width: 1100,
  height: 540,
  pixelArt: true,
  transparent: true,
  scene: [Game],
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
};

let game = new Phaser.Game(config);
