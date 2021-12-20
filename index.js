import 'phaser';
import Asteroid from 'asteroid.js'
const canvas = document.getElementById('app');

var config = {
    type: Phaser.AUTO,
    parent: canvas,
    width: 400,
    height: 400,
    physics: {
        default: 'arcade',
        arcade: {
            fps: 60,
            gravity: { y: 0 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
var asteroidsGroup, asteroidsArray;
var asteroidCreationTimer;

function preload(){
    
    this.load.baseURL = 'https://examples.phaser.io/assets/';
    this.load.image('asteroid', 'games/breakout/ball.png');
}

function create(){
    asteroidsArray = [];
    asteroidsGroup = this.physics.add.group();

    this.physics.add.collider(ship, asteroidsGroup);
    this.physics.add.collider(asteroidsGroup, asteroidsGroup, asteroidAsteroidCollision,null,this);

    asteroidCreationTimer = scene.time.addEvent({
        delay: 1000,                
        callback: createAsteroid(),
        callbackScope: this,
        loop: true
    });
    asteroidsGroup.
    
}

function update(){
    //this.physics.world.wrap(asteroids, 10); //asteroida przechodzi przez krawedz swiata i wraca z drugiej strony
    //this.physics.collide(asteroid, asteroid); 
}

function createAsteroid(){
    let asteroid = new Asteroid(scene,0,0,'asteroid');
    this.asteroidsArray.push(asteroid);
    this.asteroidsGroup.add(asteroid,true);
}

function shipAsteroidCollision(asteroid, ship){
    asteroid.setBounce(0,0);
}

function asteroidAsteroidCollision(asteroid1, asteroid2){
    asteroid1.setBounce(1,1);
    asteroid2.setBounce(1,1);

}

