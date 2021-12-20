export default class Asteroid extends Phaser.Physics.Arcade.Sprite {

    
    constructor(phaserScene,x,y) {
        super(phaserScene,x,y,'asteroid');
        this.randomX = Math.random() - 0.5;
        this.randomY = Math.random() - 0.5;

        console.log(this.random);
    }
    // preload() {
    //     //this.game.load.image('space', 'assets/background.png');
    //     this.game.load.image('asteroid', 'assets/asteroid.png');
    // }
    
    // create () {
        
    //     this.sprite = this.game.physics.add.image(400, 300, 'asteroid');
    //     this.sprite.setVelocity(100,100);
    //     console.log('create complete')
    // }

    update () {
        this.setVelocity(this.randomX*200,this.randomY*200);

        //this.game.physics.world.wrap(this.sprite, 32);
    
    }
}
