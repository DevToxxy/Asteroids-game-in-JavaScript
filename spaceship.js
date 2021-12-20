export default class Spaceship {

    constructor(scene) {
        this.game = scene

        var sprite;
        var cursors;
    
        var bullet;
        var bullets;
        var bulletTime = 0;
    }

    preload() {
        this.game.load.image('space', 'assets/background.png');
        this.game.load.image('bullet', 'assets/games/asteroids/bullets.png');
        this.game.load.image('ship', 'assets/spaceship.png');
    }
    
    create () {
        //  This will run in Canvas mode, so let's gain a little speed and display
        this.this.game.renderer.clearBeforeRender = false;
        this.this.game.renderer.roundPixels = true;

        //  We need arcade physics
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        //  A spacey background
        this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'space');

        //  Our ships bullets
        bullets = this.game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;

        //  All 40 of them
        bullets.createMultiple(40, 'bullet');
        bullets.setAll('anchor.x', 0.5);
        bullets.setAll('anchor.y', 0.5);

        //  Our player ship
        sprite = this.game.add.sprite(300, 300, 'ship');
        sprite.anchor.set(0.5);

        //  and its physics settings
        this.game.physics.enable(sprite, Phaser.Physics.ARCADE);

        sprite.body.drag.set(100);
        sprite.body.maxVelocity.set(200);

        //  Game input
        cursors = this.game.input.keyboard.createCursorKeys();
        this.game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);
    }

    fireBullet () {

        if (this.game.time.now > bulletTime)
        {
            bullet = bullets.getFirstExists(false);
    
            if (bullet)
            {
                bullet.reset(sprite.body.x + 16, sprite.body.y + 16);
                bullet.lifespan = 2000;
                bullet.rotation = sprite.rotation;
                this.game.physics.arcade.velocityFromRotation(sprite.rotation, 400, bullet.body.velocity);
                bulletTime = this.game.time.now + 50;
            }
        }
    
    }

    update () {
        if (cursors.up.isDown)
        {
            this.physics.velocityFromRotation(sprite.rotation, 200, sprite.body.acceleration);
        }
        else
        {
            sprite.setAcceleration(0);
        }
    
        if (cursors.left.isDown)
        {
            sprite.setAngularVelocity(-300);
        }
        else if (cursors.right.isDown)
        {
            sprite.setAngularVelocity(300);
        }
        else
        {
            sprite.setAngularVelocity(0);
        }
    
        //text.setText('Speed: ' + sprite.body.speed);
    
        // if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
        // {
        //     fireBullet();
        // }
    
        this.physics.world.wrap(sprite, 32);
    
        // bullets.forEachExists(screenWrap, this);
    }
}

