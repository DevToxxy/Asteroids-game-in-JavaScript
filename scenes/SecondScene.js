import BulletGroup from "/BulletGroup.js"
import Spaceship from "/Spaceship.js"
import Asteroid from "/Asteroid.js"

export default class SecondScene extends Phaser.Scene {
    constructor() {
        super({key: 'SecondScene'})
        this.entities = 10;
        this.entitiesInitCount = 10;
        this.hearts = 3;
    }
    
    preload() {
        this.load.image('space', '/assets/background.png');
        this.load.image('bullet', '/assets/bullet.png');
        this.load.image('ship', '/assets/spaceship.png');
        this.load.image('asteroid', 'assets/asteroid.png');
    }
    
    create() {
        this.heartsText = this.add.text(25, 50, 'LIVES: ' + this.hearts, { 
            fontFamily: 'Impact', color: '#FF0000', fontSize: 35 
        });

        this.asteroidsGroup = this.physics.add.group();
        this.asteroidsArray = [];
        this.asteroidsGroup.defaults = {};

        this.bulletGroup = new BulletGroup(this)
        this.spaceship = new Spaceship(this, 400, 300, this.bulletGroup)

        this.createAsteroidEvent = this.time.addEvent({
            delay: 500,
            callback: this.createAsteroid,
            callbackScope: this,
            loop: true
        });

        this.physics.add.collider(this.asteroidsGroup, this.asteroidsGroup);
        this.physics.add.collider(this.spaceship, this.asteroidsGroup,this.shipAsteroidCollision,null,this);
        this.physics.add.collider(this.bulletGroup, this.asteroidsGroup, this.bulletAsteroidCollision,null,this);

        console.log('druga scena biczez')
    }

    update() {
        this.spaceship.update()
        for (let asteroid of this.asteroidsArray) {
            asteroid.update();
        }
        this.physics.world.wrap(this.asteroidsGroup,20);
    }

    createAsteroid(){
        if(this.asteroidsArray.length < this.entitiesInitCount){
            let asteroid = new Asteroid(this,0,0);
            this.asteroidsGroup.add(asteroid,true);
            this.asteroidsArray.push(asteroid);
            console.log(this.asteroidsArray.length)
        }
    }

    shipAsteroidCollision(ship,asteroid){
        this.hearts--;
        if(this.hearts == 0){
            gameLost();
        }
        else{
            this.heartsText.setText('hearts: ' + this.hearts);
        }    
    }

    bulletAsteroidCollision(bullet, asteroid) {
        asteroid.disableBody(true,true);
        bullet.disableBody(true, true)
        this.entities--;

    }
}