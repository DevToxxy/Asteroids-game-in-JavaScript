import MainScene from "./scenes/mainScene.js"

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
    scene: [MainScene]
};

const game = new Phaser.Game(config)
