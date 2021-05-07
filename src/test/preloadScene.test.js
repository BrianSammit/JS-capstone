import Phaser from "phaser";
import PreloaderScene from "../scenes/preloaderScene";
import "jest-expect-subclass";

test("BootScene should be a subclass of Phaser.Scene", () => {
  expect(PreloaderScene).toBeSubclassOf(Phaser.Scene);
});
