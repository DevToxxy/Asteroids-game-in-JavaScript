import BulletGroup from "/BulletGroup.js"
import Spaceship from "/Spaceship.js"

export default class GenericLevel extends Phaser.Scene {
    
    constructor(stringKey, entitiesCount, nextLevelKey) {
        super({key: stringKey})
        this.nextLevelKey = nextLevelKey
        this.entities = entitiesCount
        this.entitiesInitCount = entitiesCount
        this.hearts = 3;
    }
    
    preload() {
        this.load.image('space', '/assets/background.png');
        this.load.image('bullet', '/assets/bullet.png');
        // this.load.image('ship', '/assets/spaceship.png');
        this.load.spritesheet('ship',
            '/assets/ship.png',
            { frameWidth: 40, frameHeight: 40 }
        );
    }
    
    create() {
        this.heartsText = this.add.text(25, 50, 'LIVES: ' + this.hearts, { 
            fontFamily: 'Impact', color: '#FF0000', fontSize: 35 
        });

        this.bulletGroup = new BulletGroup(this)
        this.spaceship = new Spaceship(this, 400, 300, this.bulletGroup)

        this.anims.create({ key: 'fly',
            frames: this.anims.generateFrameNumbers(
            'ship', { start: 0, end: 1 }),
            frameRate: 10, repeat: -1
        });
        this.spaceship.anims.play('fly', true);
    }

    update() {
        this.spaceship.update()
    }

    gameLost(){
        this.scene.start("GameLostScene");
    }
    gameWon(){
        this.scene.start(this.nextLevelKey);
    }
}