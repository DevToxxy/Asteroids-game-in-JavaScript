export default class Spaceship extends Phaser.Physics.Arcade.Sprite {

    constructor(phaserScene, x, y, bulletGroup) {
        super(phaserScene,x,y,'ship')  

        phaserScene.add.existing(this);
        phaserScene.physics.add.existing(this);

        this.scene = phaserScene
        this.bulletGroup = bulletGroup

        this.setDamping(true);
        this.setDrag(0.3);
        this.setMaxVelocity(200);

        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.bulletTime = 0
        this.bulletInterval = 100
    }

    fireBullet () {
        if(this.scene.time.now > this.bulletTime) {
            this.bulletTime = this.scene.time.now + this.bulletInterval
            this.bulletGroup.fire(this.x, this.y, this.angle)
        }
    }

    update () {
        if (this.cursors.up.isDown)
        {
            this.scene.physics.velocityFromRotation(this.rotation, 200, this.body.acceleration);
        }
        else
        {
            this.setAcceleration(0);
        }
    
        if (this.cursors.left.isDown)
        {
            this.setAngularVelocity(-300);
        }
        else if (this.cursors.right.isDown)
        {
            this.setAngularVelocity(300);
        }
        else
        {
            this.setAngularVelocity(0);
        }
    
        if (this.cursors.space.isDown)
        {
            this.fireBullet();
        }

        this.scene.physics.world.wrap(this, 32);
    
        // bullets.forEachExists(screenWrap, this);
    }
}
