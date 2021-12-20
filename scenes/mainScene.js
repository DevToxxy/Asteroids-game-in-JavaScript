import BulletGroup from "/BulletGroup.js"
import Spaceship from "/Spaceship.js"
import Asteroid from "/Asteroid.js"

export default class MainScene extends Phaser.Scene {
    constructor() {
        super({key: 'MainScene'})
    }
    
    preload() {
        this.spaceship = new Spaceship(this)
        this.bulletGroup = new BulletGroup(this)

        this.asteroidsGroup = this.physics.add.group();
        this.asteroidsArray = [];

        this.load.image('asteroid', 'assets/asteroid.png');
        //this.asteroid = new Asteroid(this)
       

        this.spaceship.preload()
        this.bulletGroup.preload()

    }
    
    create() {
        this.spaceship.create()
        this.bulletGroup.create()


        this.createAsteroidEvent = this.time.addEvent({
            delay: 5000,
            callback: this.createAsteroid,
            callbackScope: this,
            loop: true
        });

        this.physics.add.collider(this.asteroidsGroup, this.asteroidsGroup);

        console.log(this.asteroidsGroup);

    }

    update() {
        this.spaceship.update()
        for (let asteroid of this.asteroidsArray) {
            asteroid.update();
        }
        this.physics.world.wrap(this.asteroidsGroup,20);

    }

    createAsteroid(){
        let asteroid = new Asteroid(this,0,0);
        this.asteroidsGroup.add(asteroid,true);
        this.asteroidsArray.push(asteroid);
    }

}