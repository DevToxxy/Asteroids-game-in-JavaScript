export default class Ufos extends Phaser.Physics.Arcade.Sprite {

    constructor(phaserScene, x,y) {
        super(phaserScene,x,y,'ufo')
        phaserScene.add.existing(this);
        phaserScene.physics.add.existing(this);
        this.randomX = Math.random() - 0.5;
        this.randomY = Math.random() - 0.5;
        this.setVelocity(this.randomX*250, this.randomY*250);
        this.setBounce(1);
        this.setCollideWorldBounds(true);
    }
    preload () { }
    create () { }
    update () { }   
}
