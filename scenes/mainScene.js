import Spaceship from "/spaceship.js"

export default class MainScene extends Phaser.Scene {
    constructor() {
        super({key: 'MainScene'})
        this.spaceship = new Spaceship(this)
    }

    preload() {
    }
    
    create() {
    }

    update() {

    }
}