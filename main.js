import GameLostScene from "./scenes/GameLostScene.js";
import GameWonScene from "./scenes/GameWonScene.js";
import Level1 from "/scenes/levels/Level1.js";

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
    scene: [ Level1, GameLostScene, GameWonScene]
};

const game = new Phaser.Game(config)
