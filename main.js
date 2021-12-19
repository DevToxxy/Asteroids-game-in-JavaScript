import 'phaser';
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

function preload(){
    
    this.load.baseURL = 'https://examples.phaser.io/assets/';
    this.load.image('asteroid', 'games/breakout/ball.png');
}

function create(){
    asteroidsArray = [];
    asteroidsGroup = this.physics.add.group();
}

function update(){
    //this.physics.world.wrap(asteroids, 10); //asteroida przechodzi przez krawedz swiata i wraca z drugiej strony
    //this.physics.collide(asteroid, asteroid); 
}

function createAsteroid(){
    let asteroid = new Asteroid(scene,0,0,'asteroid');
    this.asteroidArray.push(asteroid);
    this.asteroids.
}

