// Eliana Cadelina, Mice of Passage, April 4, 2022, ~10 hours

/* List of Mods:
    - Create new title screen (10 pts)
    - Implement parallax scrolling (10 pts)
    - Create 4 new explosion SFX and randomize which plays on impact (10 pts)
    - Create a new animated sprite for Spaceship enemies (10 pts)
    - Redesign the game's artwork, UI, and sound to change the aesthetic to something other than sci-fi (60 pts)

    Mice of Passage
    Throw cheese at the ghost mice to help them pass on to the afterlife- 
    and stop them from haunting you!

*/

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play],
};

let game = new Phaser.Game(config);

let borderUISize = config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT;