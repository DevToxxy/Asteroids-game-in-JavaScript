export default class GameLostScene extends Phaser.Scene {
    constructor() {
        super({key: 'GameLostScene'})
    }

    create() {
        this.gameLostText = this.add.text(220, 220, 'YOU LOST', { 
            fontFamily: 'Impact', color: '#FF0000', fontSize: 100 
        });
    }

}