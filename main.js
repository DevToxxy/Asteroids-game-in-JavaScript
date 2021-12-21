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
    scene: [ Level1 ]
};

const game = new Phaser.Game(config)
