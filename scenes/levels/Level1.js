import GenericLevel from "/scenes/GenericLevel.js";
import Asteroid from "/asteroid.js";

export default class Level1 extends GenericLevel {
    constructor() {
        super('Level1', 3, 'Level2')
    }

    preload() {
        super.preload()
        this.load.spritesheet('asteroid',
            '/assets/asteroid_explosion.png',
            { frameWidth: 60, frameHeight: 60 }
        );
    }

    create() {
        super.create()

        this.asteroidsGroup = this.physics.add.group();
        this.asteroidsArray = [];
        this.asteroidsGroup.defaults = {};

        this.createAsteroidEvent = this.time.addEvent({
            delay: 1500,
            callback: this.createAsteroid,
            callbackScope: this,
            loop: true
        });

        this.anims.create({ key: 'destroy',
            frames: this.anims.generateFrameNumbers(
            'asteroid', { start: 0, end: 3 }),
            frameRate: 10
        });

        

        this.physics.add.collider(this.asteroidsGroup, this.asteroidsGroup);
        this.physics.add.collider(this.spaceship, this.asteroidsGroup, this.shipAsteroidCollision, null, this);
        this.physics.add.collider(this.bulletGroup, this.asteroidsGroup, this.bulletAsteroidCollision, null, this);
    }

    update() {
        super.update()

        for (let asteroid of this.asteroidsArray) {
            asteroid.update();
        }
        this.physics.world.wrap(this.asteroidsGroup, 20);
    }

    createAsteroid() {
        if (this.asteroidsArray.length < this.entitiesInitCount) {
            let asteroid;
            if (this.asteroidsArray.length % 4 == 0) {
                asteroid = new Asteroid(this, 760, 560);
            }
            else if (this.asteroidsArray.length % 4 == 1) {
                asteroid = new Asteroid(this, 760, 40);
            }
            else if (this.asteroidsArray.length % 4 == 2) {
                asteroid = new Asteroid(this, 40, 40);
            }
            else {
                asteroid = new Asteroid(this, 40, 560);
            }

            this.asteroidsGroup.add(asteroid, true);
            this.asteroidsArray.push(asteroid);
        }
    }

    shipAsteroidCollision(ship, asteroid) {
        this.hearts--;
        if (this.hearts == 0) {
            this.gameLost();
        }
        else {
            this.heartsText.setText('LIVES: ' + this.hearts);
        }
        if (this.entities == 0) {
            this.gameWon();
        }
        asteroid.disableBody(false, true);
        asteroid.anims.play('destroy', true);
    }

    bulletAsteroidCollision(bullet, asteroid) {
        asteroid.disableBody(false, true);
        bullet.disableBody(false, true)
        this.entities--;

        if (this.entities == 0) {
            this.gameWon();
        }
        asteroid.anims.play('destroy', true);
    }
}