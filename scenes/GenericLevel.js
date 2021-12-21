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
        this.load.image('ship', '/assets/spaceship.png');
    }
    
    create() {
        this.heartsText = this.add.text(25, 50, 'LIVES: ' + this.hearts, { 
            fontFamily: 'Impact', color: '#FF0000', fontSize: 35 
        });

        this.bulletGroup = new BulletGroup(this)
        this.spaceship = new Spaceship(this, 400, 300, this.bulletGroup)
    }

    update() {
        this.spaceship.update()

        if (this.checkLevelState()) {
            this.scene.start(this.nextLevelKey)
        }
    }

    checkLevelState() {
        if (this.entities == 0) return true;
        else false;
    }

    gameLost(){
        this.scene.start("GameLostScene");
    }
    gameWon(){
        this.scene.start("GameWonScene");
    }
}