import Phaser from 'phaser';
import BootScene from '../scenes/bootScene';
import 'jest-expect-subclass';

test('BootScene should be a subclass of Phaser.Scene', () => {
  expect(BootScene).toBeSubclassOf(Phaser.Scene);
});
