export default class Asteroid extends Phaser.Physics.Arcade.Sprite {
    constructor(phaserScene,x,y) {
        super(phaserScene,x,y,'asteroid');
        phaserScene.add.existing(this);
        phaserScene.physics.add.existing(this);
        this.randomX = Math.random() - 0.5;
        this.randomY = Math.random() - 0.5;
        this.setVelocity(this.randomX*400,this.randomY*400);
        this.setBounce(1);
    }

    create() {
        this.on('animationcomplete', function (anim, frame) {
            console.log('animation end')
            // this.emit('animationcomplete_' + anim.key, anim, frame);
        }, this);
    }
}
