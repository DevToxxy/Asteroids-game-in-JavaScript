export default class Ufos extends Phaser.Physics.Arcade.Sprite {

    constructor(phaserScene, x,y) {
        super(phaserScene,x,y,'ufo')

        //pozwala dodawać do tego co już jest
        phaserScene.add.existing(this);
        phaserScene.physics.add.existing(this);

        //randomowe pozycje
        this.setVelocity(Math.floor(Math.random() * (300 - -100)) + -100, Math.floor(Math.random() * (300 - -100)) + -100);
    }
    preload () { }
    create () { }
    update () { 
        this.setBounce(1);
        this.setCollideWorldBounds(true, false, true, false);
    }   
}
