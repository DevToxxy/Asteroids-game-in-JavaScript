import GenericLevel from "/scenes/GenericLevel.js";
import Asteroid from "/asteroid.js";

export default class Level1 extends GenericLevel {
    constructor() {
        super('Level1', 5, 'Level2')
    }

    preload() {
        super.preload()
        this.load.image('asteroid', 'assets/asteroid.png');
    }

    create() {
        super.create()

        this.asteroidsGroup = this.physics.add.group();
        this.asteroidsArray = [];
        this.asteroidsGroup.defaults = {};

        this.createAsteroidEvent = this.time.addEvent({
            delay: 500,
            callback: this.createAsteroid,
            callbackScope: this,
            loop: true
        });

        this.physics.add.collider(this.asteroidsGroup, this.asteroidsGroup);
        this.physics.add.collider(this.spaceship, this.asteroidsGroup,this.shipAsteroidCollision,null,this);
        this.physics.add.collider(this.bulletGroup, this.asteroidsGroup, this.bulletAsteroidCollision,null,this);
    }

    update() {
        super.update()

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
            this.gameLost();
        }
        else{
            this.heartsText.setText('LIVES: ' + this.hearts);
        }   
    }

    bulletAsteroidCollision(bullet, asteroid) {
        asteroid.disableBody(true,true);
        bullet.disableBody(true, true)
        this.entities--;

        if(this.entities == 0){
            this.gameWon();
        }
    }
}