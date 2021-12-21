import BulletGroup from "/BulletGroup.js"
import Spaceship from "/Spaceship.js"
import Ufos from "/ufos.js"

export default class MainScene extends Phaser.Scene{
    constructor() {
        super({key: 'MainScene'})
    }
    
    preload() {
        this.spaceship = new Spaceship(this)
        this.bulletGroup = new BulletGroup(this)
        this.ufosGroup = this.physics.add.group();
        this.ufosArray = [];
        this.ufosGroup.defaults = {};
        this.load.image('ufo', 'assets/ufo.png');
        this.spaceship.preload()
        this.bulletGroup.preload()
    }
    
    create() {
        this.spaceship.create()
        this.bulletGroup.create()
        this.createUfoEvent = this.time.addEvent({
            delay: 5000,
            callback: this.createUfo,
            callbackScope: this,
            loop: true
        });
        this.physics.add.collider(this.ufosGroup, this.ufosGroup);
    }

    update() {
        for (let ufos of this.ufosArray) {
            ufos.update();
        }
        this.spaceship.update()
    }
    createUfo(){
        let ufo = new Ufos(this,Math.floor(Math.random() * (100 - 10)) + 10,Math.floor(Math.random() * (100 - 10)) + 10, 'ufo');
        this.ufosGroup.add(ufo,true);
        this.ufosArray.push(ufo);
    }
}