export default class Alien extends Phaser.Physics.Arcade.Sprite {
    constructor(phaserScene,x,y) {
        super(phaserScene,x,y,'alien');
        this.scene = phaserScene
        phaserScene.add.existing(this);
        phaserScene.physics.add.existing(this);
        this.randomX = Math.random() - 0.5;
        this.randomY = Math.random() - 0.5;
        this.setVelocity(Math.floor(Math.random() * (300 - -100)) + -100, Math.floor(Math.random() * (300 - -100)) + -100);
        this.setCollideWorldBounds(true);
    }

    update(ship) {
        this.scene.physics.moveToObject(this, ship, 100);
    }
}
