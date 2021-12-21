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
        this.asteroidsGroup.defaults = {};

        this.load.image('space', '/assets/background.png');
        this.load.image('bullet', '/assets/bullet.png');
        this.load.image('ship', '/assets/spaceship.png');
        this.load.image('asteroid', 'assets/asteroid.png');
        //this.asteroid = new Asteroid(this)
    

    }
    
    create() {
        this.playerBulletGroup = new BulletGroup(this)
        this.spaceship = new Spaceship(this, this.playerBulletGroup)

        this.createAsteroidEvent = this.time.addEvent({
            delay: 500,
            callback: this.createAsteroid,
            callbackScope: this,
            loop: true
        });

        this.physics.add.collider(this.asteroidsGroup, this.asteroidsGroup);
        this.physics.add.collider(this.spaceship, this.asteroidsGroup,this.shipAsteroidCollision,null,this);
    }

    update() {
        this.spaceship.update()
        for (let asteroid of this.asteroidsArray) {
            asteroid.update();
        }
        this.physics.world.wrap(this.asteroidsGroup,20);

    }

    createAsteroid(){
        if(this.asteroidsArray.length < 5){
            let asteroid = new Asteroid(this,0,0);
            this.asteroidsGroup.add(asteroid,true);
            this.asteroidsArray.push(asteroid);
            console.log(this.asteroidsArray.length)
        }
    }
    shipAsteroidCollision(ship,asteroid){
        //asteroid.disableBody(true,true);

    }

}