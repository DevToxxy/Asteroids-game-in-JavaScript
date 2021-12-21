class Bullet extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'bullet');
        this.bulletSpeed = 300
        this.scene = scene
        this.maxBulletsCount = 100
    }

    fire(x, y, angle) {

        this.body.reset(x, y)

        this.setActive(true)
        this.setVisible(true)

        const vector = this.scene.physics.velocityFromAngle(angle, this.bulletSpeed)
        this.setVelocityX(vector.x)
        this.setVelocityY(vector.y)
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        if(this.y <= 0 
            || this.y >= 600
            || this.x >= 800
            || this.x <= 0) {
            this.setActive(false)
            this.setVisible(false)
        }
    }
}

export default class BulletGroup extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world, scene);
        
        this.createMultiple({
            classType: Bullet,
            frameQuantity: this.maxBulletsCount = 100,
            active: false,
            visible: false,
            key: 'bullet'
        })
    }

    fire(x, y, angle) {
        const bullet = this.getFirstDead(false)

        if(bullet) {
            bullet.fire(x,y,angle)
        }
    }
}