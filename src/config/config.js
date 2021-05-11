import Phaser from 'phaser';

export default {
  type: Phaser.AUTO,
  width: 1100,
  height: 540,
  pixelArt: true,
  transparent: true,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    },
  },
};
