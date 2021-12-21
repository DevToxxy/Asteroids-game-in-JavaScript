import BulletGroup from "/BulletGroup.js"
import Spaceship from "/Spaceship.js"

export default class MainScene extends Phaser.Scene {
    constructor() {
        super({key: 'MainScene'})
    }
    
    preload() {
        this.load.image('space', '/assets/background.png');
        this.load.image('bullet', '/assets/bullet.png');
        this.load.image('ship', '/assets/spaceship.png');
    }
    
    create() {
        this.playerBulletGroup = new BulletGroup(this)
        this.spaceship = new Spaceship(this, this.playerBulletGroup)
    }

    update() {
        this.spaceship.update()
    }
}