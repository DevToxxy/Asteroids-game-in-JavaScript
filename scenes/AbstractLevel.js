import BulletGroup from "/BulletGroup.js"
import Spaceship from "/Spaceship.js"

export default class AbstractLevel extends Phaser.Scene {
    
    constructor(stringKey, entitiesCount, nextLevelKey) {
        super({key: stringKey})
        this.nextLevelKey = nextLevelKey
        this.entities = entitiesCount
        this.entitiesInitCount = entitiesCount
    }
    
    preload() {
        this.load.image('space', '/assets/background.png');
        this.load.image('bullet', '/assets/bullet.png');
        this.load.image('ship', '/assets/spaceship.png');
    }
    
    create() {
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
}