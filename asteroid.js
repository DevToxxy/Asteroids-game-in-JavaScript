export default class Asteroid extends Phaser.Physics.Arcade.Sprite {

    
    constructor(phaserScene,x,y) {
        super(phaserScene,x,y,'asteroid');
        phaserScene.add.existing(this);
        phaserScene.physics.add.existing(this);
        this.randomX = Math.random() - 0.5;
        this.randomY = Math.random() - 0.5;
        this.setVelocity(this.randomX*200,this.randomY*200);
        this.setBounce(1);
    }

    update () {
        //this.setVelocity(this.randomX*200,this.randomY*200);

        //this.game.physics.world.wrap(this.sprite, 32);
    
    }
}
