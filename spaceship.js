export default class Spaceship {

    constructor(phaserScene, bulletGroup) {
        this.scene = phaserScene
        this.bulletGroup = bulletGroup

        this.shipSprite = this.scene.physics.add.image(400, 300, 'ship');
        this.shipSprite.setDamping(true);
        this.shipSprite.setDrag(0.3);
        this.shipSprite.setMaxVelocity(200);

        phaserScene.add.existing(this); //uncomment in case of physics fuckup
        phaserScene.physics.add.existing(this);

        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.bulletTime = 0
        this.bulletInterval = 100
    }

    fireBullet () {
        if(this.scene.time.now > this.bulletTime) {
            this.bulletTime = this.scene.time.now + this.bulletInterval
            this.bulletGroup.fire(this.shipSprite.x, this.shipSprite.y, this.shipSprite.angle)
        }
    }

    update () {
        if (this.cursors.up.isDown)
        {
            this.scene.physics.velocityFromRotation(this.shipSprite.rotation, 200, this.shipSprite.body.acceleration);
        }
        else
        {
            this.shipSprite.setAcceleration(0);
        }
    
        if (this.cursors.left.isDown)
        {
            this.shipSprite.setAngularVelocity(-300);
        }
        else if (this.cursors.right.isDown)
        {
            this.shipSprite.setAngularVelocity(300);
        }
        else
        {
            this.shipSprite.setAngularVelocity(0);
        }
    
        if (this.cursors.space.isDown)
        {
            this.fireBullet();
        }

        this.scene.physics.world.wrap(this.shipSprite, 32);
    
        // bullets.forEachExists(screenWrap, this);
    }
}
