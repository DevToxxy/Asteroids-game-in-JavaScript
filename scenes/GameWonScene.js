export default class GameWonScene extends Phaser.Scene {
    constructor() {
        super({key: 'GameWonScene'})
    }

    create() {
        this.gameLostText = this.add.text(140, 220, 'CONGRATULATIONS!', { 
            fontFamily: 'Impact', color: '#FF0000', fontSize: 70 
        });
        this.gameLostText2 = this.add.text(130, 320, 'YOU ACTUALLY DID IT', { 
            fontFamily: 'Impact', color: '#FF0000', fontSize: 70 
        });

    }

}