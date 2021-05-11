/* eslint-disable class-methods-use-this */
import Phaser from 'phaser';

import scoreBoard from '../score/scoreBoard';

export default class RankingScene extends Phaser.Scene {
  constructor() {
    super('Ranking');
  }

  create() {
    const { height, width } = this.game.config;

    this.head = this.add.sprite(430, height / 2, 'head').setDepth(1);
    this.head.setVisible(false);

    this.homeButton = this.add
      .sprite(width - 520, height - 50, 'home')
      .setDepth(1);
    this.homeButton.setInteractive();

    this.add.image(width / 7, height, 'board').setOrigin(0, 1);
    this.add.text(width / 2 - 130, height / 2 - 200, 'Top 10 players', {
      color: '#0b6623',
      fontFamily: 'Itim, cursive',
      fontSize: '40px',
      fontStyle: 'bolder',
    });

    this.homeButton.on('pointerover', () => {
      this.head.setVisible(true);
      this.head.y = this.homeButton.y - this.homeButton.height - 20;
      this.head.x = this.homeButton.x;
    });

    this.homeButton.on('pointerout', () => {
      this.head.setVisible(false);
    });

    this.homeButton.on('pointerup', () => {
      this.scene.start('Title');
    });

    scoreBoard.create();
  }
}
