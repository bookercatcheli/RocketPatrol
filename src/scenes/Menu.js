class Menu extends Phaser.Scene {
    constructor() {
        super("menu");
    }
    
    preload() {
        // select 
        this.load.audio('startBoop', 'assets/startBoop.wav');
        // mouse 'explosion'
        this.load.audio('mouseSFX1', 'assets/mouseSFX1.wav');
        this.load.audio('mouseSFX2', 'assets/mouseSFX2.wav');
        this.load.audio('mouseSFX3', 'assets/mouseSFX3.wav');
        this.load.audio('mouseSFX4', 'assets/mouseSFX4.wav');
        // cheese launch
        this.load.audio('cheeseSFX', 'assets/cheeseSFX.wav');

        // load title screen
        this.load.image('titleScreen', 'assets/titleScreen.png');

    }
    
    create() {

        this.titleScreen = this.add.tileSprite(0,0, 640, 480, 'titleScreen').setOrigin(0,0);
        
        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // easy mode
          game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 60000    
          }
          this.sound.play('startBoop');
          this.scene.start('play');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // hard mode
          game.settings = {
            spaceshipSpeed: 4,
            gameTimer: 45000    
          }
          this.sound.play('startBoop');
          this.scene.start('play');    
        }
      }
    
}