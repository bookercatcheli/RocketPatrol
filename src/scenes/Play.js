class Play extends Phaser.Scene {
    constructor() {
        super("play");
        this.mouseSoundsArray = ['mouseSFX1', 'mouseSFX2', 'mouseSFX3', 'mouseSFX4'];
    }
    
    preload() {
        this.load.image('cheese', 'assets/cheese.png');
        this.load.image('mouse1', 'assets/mouse1.png');
        this.load.image('mouse2', 'assets/mouse2.png');
        this.load.image('mouse3', 'assets/mouse3.png');
        this.load.image('foreground', 'assets/foreground.png');
        this.load.image('midground', 'assets/midground.png');
        this.load.image('background', 'assets/background.png');
        this.load.image('grass', 'assets/grass.png');
        this.load.image('gameover', 'assets/gameover.png');

    

        this.load.image('restartMenu', 'assets/restartMenu.png');

        this.load.spritesheet('angelMouse', 'assets/angelMouse.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        this.load.spritesheet('mouse1Sheet', 'assets/mouse1Sheet.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 3});
        this.load.spritesheet('mouse2Sheet', 'assets/mouse2Sheet.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 3});
        this.load.spritesheet('mouse3Sheet', 'assets/mouse3Sheet.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 3});


        
    }

    create() {

        // backgrounds
        this.background = this.add.tileSprite(0,0, 640,480, 'background').setOrigin(0,0);
        this.midground = this.add.tileSprite(0,0, 640,480, 'midground').setOrigin(0,0);
        this.foreground = this.add.tileSprite(0,0, 640,480, 'foreground').setOrigin(0,0);
        this.grass = this.add.tileSprite(0,0, 640,480, 'grass').setOrigin(0,0);

        

        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'cheese').setOrigin(0.5, 0);

        // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'mouse1', 0, 35).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'mouse2', 0, 25).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'mouse3', 0, 15).setOrigin(0,0);
        
        //define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

     
        //animation config
        this.anims.create({
            key: 'angel',
            frames: this.anims.generateFrameNumbers('angelMouse', { start: 0, end: 9, first: 0}),
            frameRate: 20
        });

        // mice animation - got help from Daphne Cheng and Alex Xie!
        //mouse1
        this.anims.create({
            key: 'firstMouse',
            frames: this.anims.generateFrameNumbers('mouse1Sheet', { start: 0, end: 2, first: 0}),
            frameRate: 10,
            repeat: -1
        });

        this.ship01.anims.play('firstMouse');

        //mouse2
        this.anims.create({
            key: 'secondMouse',
            frames: this.anims.generateFrameNumbers('mouse2Sheet', { start: 0, end: 2, first: 0}),
            frameRate: 10,
            repeat: -1
        });

        this.ship02.anims.play('secondMouse');

        //mouse3
        this.anims.create({
            key: 'thirdMouse',
            frames: this.anims.generateFrameNumbers('mouse3Sheet', { start: 0, end: 2, first: 0}),
            frameRate: 10,
            repeat: -1
        });

        this.ship03.anims.play('thirdMouse');


        // orange UI background
        //this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * -1, 0xFBB000).setOrigin(0, 0);

        // borders, might add these eventually
        /*
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0x000000).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0x000000).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0x00000).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0x000000).setOrigin(0, 0);
        */
        // initialize score
        this.p1Score = 0;

        //display score
          let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
              top: 5,
              bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);

        
        //GAME OVER flag
        this.gameOver = false;

        //        this.grass = this.add.tileSprite(0,0, 640,480, 'grass').setOrigin(0,0);

        //play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            //this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            //this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
            this.gameover = this.add.tileSprite(320,200, 200,64, 'gameover').setOrigin(0.5);
            this.restartMenu = this.add.tileSprite(320,300, 640,64, 'restartMenu').setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
    }

    update() {
        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menu");
        }

        this.midground.tilePositionX -= 2;
        this.foreground.tilePositionX -= 4;
        this.grass.tilePositionX -= 5;


        // update spaceships (x3)
        if (!this.gameOver) {
            this.p1Rocket.update();
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
        }
        

        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
          }
          if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
          }
          if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
          }
    }

    checkCollision(cheese, ship) {
        // simple AABB checking
        if (cheese.x < ship.x + ship.width &&
            cheese.x + cheese.width > ship.x &&
            cheese.y < ship.y + ship.height &&
            cheese.height + cheese.y > ship.y) {
                return true;
        } else {
            return false;
        }
    }
    
    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;

        //create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'angelMouse').setOrigin(0, 0);
        boom.anims.play('angel');
        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });
        // score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;

        //this.playRandomSFX;
        //this.sound.play('mouseSFX1');

        // play random SFX - got help from Casey Chen!
        
        this.sound.play(this.mouseSoundsArray[Math.floor((Math.random()*10) % 4)]);
        
 
    }
    


}