export default class Asteroid extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, sprite){
      super(scene,x,y,sprite);
      this.setVelocity(150,150);
    }
  }