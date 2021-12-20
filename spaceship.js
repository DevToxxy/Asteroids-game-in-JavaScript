export default class Spaceship {

    constructor(phaserScene) {
        this.game = phaserScene
    }

    fireBullet () {

        if (game.time.now > bulletTime)
        {
            bullet = bullets.getFirstExists(false);
    
            if (bullet)
            {
                bullet.reset(sprite.body.x + 16, sprite.body.y + 16);
                bullet.lifespan = 2000;
                bullet.rotation = sprite.rotation;
                game.physics.arcade.velocityFromRotation(sprite.rotation, 400, bullet.body.velocity);
                bulletTime = game.time.now + 50;
            }
        }
    }

    preload() {
        this.game.load.image('space', 'assets/background.png');
        // this.game.load.image('bullet', 'assets/games/asteroids/bullets.png');
        this.game.load.image('ship', 'assets/spaceship.png');
    }
    
    create () {
        
        this.sprite = this.game.physics.add.image(400, 300, 'ship');

        this.sprite.setDamping(true);
        this.sprite.setDrag(0.99);
        this.sprite.setMaxVelocity(200);

        this.cursors = this.game.input.keyboard.createCursorKeys();

        console.log('create complete')
    }

    update () {
        if (this.cursors.up.isDown)
        {
            this.game.physics.velocityFromRotation(this.sprite.rotation, 200, this.sprite.body.acceleration);
        }
        else
        {
            this.sprite.setAcceleration(0);
        }
    
        if (this.cursors.left.isDown)
        {
            this.sprite.setAngularVelocity(-300);
        }
        else if (this.cursors.right.isDown)
        {
            this.sprite.setAngularVelocity(300);
        }
        else
        {
            this.sprite.setAngularVelocity(0);
        }
    
        if (this.cursors.space.isDown)
        {
            fireBullet();
        }

        this.game.physics.world.wrap(this.sprite, 32);
    
        // bullets.forEachExists(screenWrap, this);
    }
}
