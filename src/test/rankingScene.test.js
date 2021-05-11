import Phaser from 'phaser';
import RankingScene from '../scenes/rankingScene';
import 'jest-expect-subclass';

test('RankingScene should be a subclass of Phaser.Scene', () => {
  expect(RankingScene).toBeSubclassOf(Phaser.Scene);
});
