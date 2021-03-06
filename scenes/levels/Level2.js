import GenericLevel from "/scenes/GenericLevel.js";
import Alien from "/alien.js";

export default class Level2 extends GenericLevel {
    constructor() {
        super('Level2', 4, 'GameWonScene')
    }

    preload() {
        super.preload()
        this.load.image('background2', 'assets/background2.png')
        this.load.spritesheet('alien',
            '/assets/ufo.png',
            { frameWidth: 70, frameHeight: 70 }
        );
    }

    create() {
        this.add.image(400,300,'background2')
        super.create()
        this.ufo1Text = this.add.text(640, 40, '', {
            fontFamily: 'Impact', color: 'green', fontSize: 16 
        });
        this.ufo2Text = this.add.text(100, 40, '', {
            fontFamily: 'Impact', color: 'green', fontSize: 16 
        });
        this.ufo3Text = this.add.text(100, 560, '', { 
            fontFamily: 'Impact', color: 'green', fontSize: 16 
        });
        this.ufo4Text = this.add.text(640, 560, '', {
            fontFamily: 'Impact', color: 'green', fontSize: 16 
        });
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
                alien = new Alien(this, 640, 560);
                this.ufo4Text.setText('UFO: YOU CANT WIN');
            }
            else if (this.aliensArray.length % 4 == 1) {
                alien = new Alien(this, 640, 40);
                this.ufo1Text.setText('UFO: WE ARE SUPERIOR');
            }
            else if (this.aliensArray.length % 4 == 2) {
                alien = new Alien(this, 100, 40);
                this.ufo2Text.setText('UFO: YOU WILL NEVER WIN!!!');
            }
            else {
                alien = new Alien(this, 100, 560);
                this.ufo3Text.setText('UFO: GO!!!');
            }
            alien.play('ufoGlow'); 
            this.aliensGroup.add(alien, true);
            this.aliensArray.push(alien);
        }
    }

    shipAlienCollision(ship, alien) {
        this.hearts--;
        this.entities--;
        alien.disableBody(true,true);
        if (this.hearts == 0) {
            this.gameLost();
        }
        else if (this.entities == 0) {
            this.gameWon();
        }
        else {
            this.heartsText.setText('LIVES: ' + this.hearts);
        }
    }

    bulletAlienCollision(bullet, alien) {
        alien.disableBody(true,true);
        bullet.disableBody(false, true)
        this.entities--;

        if (this.entities == 0) {
            this.gameWon();
        }
    }
}