import Phaser from 'phaser';
import PreloaderScene from '../scenes/preloaderScene';
import 'jest-expect-subclass';

test('PreloadScene should be a subclass of Phaser.Scene', () => {
  expect(PreloaderScene).toBeSubclassOf(Phaser.Scene);
});
