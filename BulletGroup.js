export default class BulletGroup {
    constructor(phaserScene, shooter) {
        this.game = phaserScene
        this.shooter = shooter
    }

    preload ()
    {
        this.game.load.image('bullet', 'assets/bullet.png');
    }

    create ()
    {
        var Bullet = new Phaser.Class({

            Extends: Phaser.GameObjects.Image,

            initialize:

            function Bullet (scene)
            {
                Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');

                this.speed = Phaser.Math.GetSpeed(400, 1);
            },

            fire: function (x, y)
            {
                this.setPosition(x, y - 50);

                this.setActive(true);
                this.setVisible(true);
            },

            update: function (time, delta)
            {
                this.y -= this.speed * delta;

                if (this.y < -50)
                {
                    this.setActive(false);
                    this.setVisible(false);
                }
            }

        });

        this.bullets = this.game.add.group({
            classType: Bullet,
            maxSize: 10,
            runChildUpdate: true
        });

        // cursors = this.input.keyboard.createCursorKeys();

        this.speed = Phaser.Math.GetSpeed(300, 1);
    }

    update (time, delta)
    {
        if (cursors.up.isDown && time > lastFired)
        {
            var bullet = bullets.get();

            if (bullet)
            {
                bullet.fire(shooter.x, shooter.y);

                lastFired = time + 50;
            }
        }
    }

    spawn (x, y, vx, vy) {

    }
} 