import GameLostScene from "./scenes/GameLostScene.js";
import MainScene from "./scenes/mainScene.js"
import SecondScene from "./scenes/SecondScene.js"
import GameWonScene from "./scenes/GameWonScene.js";

var config = {
    width: 800,
    height: 600,
    type: Phaser.AUTO,
    physics: {
        default: "arcade",
        arcade: {
            fps: 60,
            gravity: { y: 0 }
        }
    },
    scene: [MainScene, SecondScene,GameLostScene, GameWonScene]
};

const game = new Phaser.Game(config)
