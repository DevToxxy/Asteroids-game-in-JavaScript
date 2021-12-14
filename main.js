import './style.css';
import 'phaser';

const canvas = document.getElementById('app');

var config = {
    type: Phaser.AUTO,
    parent: canvas,
    width: 800,
    height: 600,
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
