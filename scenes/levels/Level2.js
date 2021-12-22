import GenericLevel from "/scenes/GenericLevel.js";
import Alien from "/alien.js";

export default class Level2 extends GenericLevel {
    constructor() {
        super('Level2', 12, 'GameWonScene')
    }

    preload() {
        super.preload()
        this.load.spritesheet('alien',
            '/assets/ufo.png',
            { frameWidth: 70, frameHeight: 70 }
        );

    }

    create() {
        super.create()

        this.aliensGroup = this.physics.add.group();
        this.aliensArray = [];
        this.aliensGroup.defaults = {};

        this.anims.create({ key: 'ufoGlow',
        frames: this.anims.generateFrameNumbers(
        'alien', { start: 0, end: 1 }),
        frameRate: 10, repeat: -1
        });

        this.createAlienEvent = this.time.addEvent({
            delay: 1500,
            callback: this.createAlien,
            callbackScope: this,
            loop: true
        });

        this.physics.add.collider(this.aliensGroup, this.aliensGroup);
        this.physics.add.collider(this.spaceship, this.aliensGroup, this.shipAlienCollision, null, this);
        this.physics.add.collider(this.bulletGroup, this.aliensGroup, this.bulletAlienCollision, null, this);
    }

    update() {
        super.update()

        for (let alien of this.aliensArray) {
            alien.update(this.spaceship);
        }
        this.physics.world.wrap(this.aliensGroup, 20);
    }

    createAlien() {
        if (this.aliensArray.length < this.entitiesInitCount) {

            let alien;
            if (this.aliensArray.length % 4 == 0) {
                alien = new Alien(this, 760, 560);
            }
            else if (this.aliensArray.length % 4 == 1) {
                alien = new Alien(this, 760, 40);
            }
            else if (this.aliensArray.length % 4 == 2) {
                alien = new Alien(this, 40, 40);
            }
            else {
                alien = new Alien(this, 40, 560);
            }
            alien.play('ufoGlow');
            this.aliensGroup.add(alien, true);
            this.aliensArray.push(alien);
        }
    }

    shipAlienCollision(ship, alien) {
        this.hearts--;
        if (this.hearts == 0) {
            this.gameLost();
        }
        else {
            this.heartsText.setText('LIVES: ' + this.hearts);
        }   
    }

    bulletAlienCollision(bullet, alien) {
        alien.disableBody(true,true);
        bullet.disableBody(false, true)
        this.entities--;
        console.log('Entities to eliminate: '+this.entities)

        if (this.entities == 0) {
            this.gameWon();
        }
    }
}