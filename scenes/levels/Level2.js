import GenericLevel from "/scenes/GenericLevel.js";
import Alien from "/alien.js";

export default class Level2 extends GenericLevel {
    constructor() {
        super('Level2', 12, 'GameWonScene')
    }

    preload() {
        super.preload()
        this.load.image('alien', '/assets/ufo.png');
    }

    create() {
        super.create()

        this.aliensGroup = this.physics.add.group();
        this.aliensArray = [];
        this.aliensGroup.defaults = {};

        this.createAlienEvent = this.time.addEvent({
            delay: 500,
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
            alien.update();
        }
        this.physics.world.wrap(this.aliensGroup, 20);
    }

    createAlien() {
        if (this.aliensArray.length < this.entitiesInitCount) {

            let alien;
            if (this.aliensArray.length % 4 == 0) {
                alien = new Alien(this, 780, 580);
            }
            else if (this.aliensArray.length % 4 == 0) {
                alien = new Alien(this, 780, 20);
            }
            else if (this.aliensArray.length % 4 == 0) {
                alien = new Alien(this, 780, 20);
            }
            else {
                alien = new Alien(this, 20, 580);
            }

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
        alien.disableBody(true, true);
        bullet.disableBody(true, true)
        this.entities--;

        if (this.entities == 0) {
            this.gameWon();
        }
    }
}