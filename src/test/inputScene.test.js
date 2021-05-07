import Phaser from "phaser";
import InputScene from "../scenes/inputScene";
import "jest-expect-subclass";

test("BootScene should be a subclass of Phaser.Scene", () => {
  expect(InputScene).toBeSubclassOf(Phaser.Scene);
});
