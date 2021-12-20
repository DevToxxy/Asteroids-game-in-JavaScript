import BulletGroup from "/BulletGroup.js"
import Spaceship from "/Spaceship.js"

export default class MainScene extends Phaser.Scene {
    constructor() {
        super({key: 'MainScene'})
    }
    
    preload() {
        this.spaceship = new Spaceship(this)
        this.bulletGroup = new BulletGroup(this)
        this.spaceship.preload()
        this.bulletGroup.preload()
    }
    
    create() {
        this.spaceship.create()
        this.bulletGroup.create()
    }

    update() {
        this.spaceship.update()
    }
}