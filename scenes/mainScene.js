import BulletGroup from "/BulletGroup.js"
import Spaceship from "/Spaceship.js"
import Asteroid from "/Asteroid.js"
import Ufos from "/ufos.js"

export default class MainScene extends Phaser.Scene {
    constructor() {
        super({key: 'MainScene'})
        this.entities = 3
        this.entitiesInitCount = 3
        this.asteroidTimer = 0;
        this.asteroidInterval= 5000;
    }
    
    preload() {
        this.load.image('space', '/assets/background.png');
        this.load.image('bullet', '/assets/bullet.png');
        this.load.image('ship', '/assets/spaceship.png');
        this.load.spritesheet('asteroid', 'assets/ast1.png', {
                frameWidth: 62,
                frameHeight: 58
        });
        this.load.spritesheet('ufo', 'assets/ufo2.png', {
                frameWidth: 56,
                frameHeight: 51
        });
    }
    
    create() {
        this.anims.create({ key: 'fly', frames: this.anims.generateFrameNumbers('asteroid', { start: 0, end: 0 }), frameRate: 10, repeat: -1});
        this.anims.create({ key: 'boom', frames: this.anims.generateFrameNumbers(
            'asteroid', { start: 1, end: 2 }),
            frameRate: 20, repeat: -1} );
        this.anims.create({ key: 'kaboom', frames: [{ key: 'asteroid', frame: 2 }], frameRate: 10});
        //this.anims.create({ key: 'nothing', frames: [{ key: 'asteroid', frame: 3  }], frameRate: 20 });

        this.asteroidsGroup = this.physics.add.group();
        this.asteroidsArray = [];
        this.asteroidsGroup.defaults = {};

        this.ufosGroup = this.physics.add.group();
        this.ufosArray = [];
        this.ufosGroup.defaults = {};
        this.bulletGroup = new BulletGroup(this)
        this.spaceship = new Spaceship(this, 400, 300, this.bulletGroup)

        this.createAsteroidEvent = this.time.addEvent({
            delay: 500,
            callback: this.createAsteroid,
            callbackScope: this,
            loop: true
        });

        this.createUfoEvent = this.time.addEvent({
            delay: 500,
            callback: this.createUfo,
            callbackScope: this,
            loop: true
        });

        this.physics.add.collider(this.asteroidsGroup, this.asteroidsGroup);
        this.physics.add.collider(this.ufosGroup, this.ufosGroup);
        this.physics.add.collider(this.spaceship, this.asteroidsGroup,this.shipAsteroidCollision,null,this);
        this.physics.add.collider(this.bulletGroup, this.asteroidsGroup, this.bulletAsteroidCollision,null,this);
    }

    update() {
        this.spaceship.update()
        for (let asteroid of this.asteroidsArray) {
            asteroid.update();
        }

        for (let ufos of this.ufosArray) {
            ufos.update();
        }

        this.physics.world.wrap(this.asteroidsGroup,20);

        if (this.checkLevelState()) {
            this.scene.start("SecondScene")
        }
    }

    checkLevelState() {
        if (this.entities == 0) return true;
        else false;
    }

    createAsteroid(){
        if(this.asteroidsArray.length < this.entitiesInitCount){
            let asteroid = new Asteroid(this,0,0);
            this.asteroidsGroup.add(asteroid,true);
            this.asteroidsArray.push(asteroid);
            console.log(this.asteroidsArray.length)
        }
    }

    createUfo(){
        if(this.ufosArray.length < this.entitiesInitCount){
            let ufos = new Ufos(this,Math.floor(Math.random() * (800 - 750)) + 750,Math.floor(Math.random() * (800 - 750)) + 750, 'fly');
            this.ufosGroup.add(ufos,true);
            this.ufosArray.push(ufos);
            console.log(this.ufosArray.length)
        }
    }

    shipAsteroidCollision(ship,asteroid){
        // asteroid.disableBody(true,true);
    }

    bulletAsteroidCollision(bullet, asteroid) {
        asteroid.anims.globalTimeScale =100;
        //this.addMix('boom', 'kaboom', 1000)
        asteroid.anims.play('boom', true);

        /*if(this.scene.time.now > this.asteroidTimer) {
            this.asteroidTimer = this.scene.time.now + this.asteroidInterval
            
        }*/
        asteroid.anims.play('kaboom', true);
        asteroid.anims.play('nothing', true);
        this.astEvent = this.time.addEvent({
            delay: 500,
            callback: this.createUfo,
            callbackScope: this,
            loop: true
        });
        //asteroid.disableBody(true,true);
        
        bullet.disableBody(true, true)
        this.entities--;
    }
    /*addMix (animA, animB, delay)      // to z dokumnetacji
    {
        var anims = this.anims;
        var mixes = this.mixes;

        var keyA = (typeof(animA) === 'string') ? animA : animA.key;
        var keyB = (typeof(animB) === 'string') ? animB : animB.key;

        if (anims.has(keyA) && anims.has(keyB))
        {
            var mixObj = mixes.get(keyA);

            if (!mixObj)
            {
                mixObj = {};
            }

            mixObj[keyB] = delay;

            mixes.set(keyA, mixObj);
        }

        return this;
    }*/
}