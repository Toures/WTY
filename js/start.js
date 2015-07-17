/**
 * Created by Thea on 15.07.15.
 */

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'dogtoaster', { preload: preload, create: create,
    update: update, render: render });

var keys;
var level = 1;

var hintergrund;
var dog;
var kristall;
var toast = [];
var ursprung;
var laserZeichner;
var graphics;
var hindernis = [];
var spiegel = [];
var spiegelSprs = [];

var linienDicke = 3;
var feldlaenge = 64;
var dogVelocity = 250;
var laserVelocity = 200;
var startZeit;
var laserUrsprungVelocityX;
var laserUrsprungVelocityY;
var zeichne = false;

var timer;
var toastZeit;
var zeitText;

function preload(){
    game.load.spritesheet('hund','assets/Hund/links.png',64,64);//TODO alle Frames in einem Bild
    game.load.spritesheet('kristall','assets/Kristall.png',64,64);
    game.load.spritesheet('leuchtKristall','assets/Leuchtkristall.png',64,64);

    game.load.image('hintergrund','assets/crappyStarfield.png');
    game.load.image('spiegel','assets/spiegel.png');
    game.load.image('buttonLinks','assets/buttonLinks.png');
    game.load.image('buttonRechts','assets/buttonRechts.png');
    game.load.image('toast','assets/Toast1.png');
    game.load.image('ursprung','assets/Satellite.png');
    game.load.image('hindernis','assets/Block5.png');
    game.load.image('start','assets/Start.png');
    game.load.image('nextLevel','assets/nextLevel.png');

}

function create(){
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.setBackgroundColor(0xff00ff);
    //hintergrund = game.add.sprite(0,0,'hintergrund');
    graphics = game.add.graphics(0, 0);
    game.world.bringToTop(graphics);
    ladeLevel1();
    erzeugeHund();
    erzeugeLaserZeichner();
    popupStart();

    var zeitTextstyle = { font: "35px Arial", fill: "#ffffff", align: "center" };
    zeitText = game.add.text(500,20,startZeit+' s',zeitTextstyle);
    timer = game.time.create(true);

    keys = {
        up: game.input.keyboard.addKey(Phaser.Keyboard.UP),
        down: game.input.keyboard.addKey(Phaser.Keyboard.DOWN),
        left: game.input.keyboard.addKey(Phaser.Keyboard.LEFT),
        right: game.input.keyboard.addKey(Phaser.Keyboard.RIGHT),
        shift: game.input.keyboard.addKey(Phaser.Keyboard.SHIFT),
        a: game.input.keyboard.addKey(Phaser.Keyboard.A),
        s: game.input.keyboard.addKey(Phaser.Keyboard.S)
    }
    zeigeText(toastUndZeit);
}

function update(){
    //zeichne Laser
    zeichneLaser();

    //stoppe alle bewegte Elemente
    stoppeElemente();

    //Hund verhält nach Taste
    if(!popupAktiv){
        controlDog();

        //Zeit kontrolle
        toastZeit = Math.round(startZeit-timer.seconds);
        zeitText.setText(toastZeit+' s');
        if(toastZeit<=0){
            popupRestart();
        }
    game.physics.arcade.collide(dog, spiegelSprs, hundSpiegel);
    game.physics.arcade.collide(dog, hindernis,hundHindernis);
    game.physics.arcade.collide(dog, ursprung);
    game.physics.arcade.collide(dog, kristall);
    game.physics.arcade.collide(dog, toast, hundToast);
    game.physics.arcade.collide(laserZeichner, hindernis, laserHindernis);
    game.physics.arcade.collide(laserZeichner, spiegelSprs, laserSpiegel);
    game.physics.arcade.collide(laserZeichner, kristall, laserKristall);
    game.physics.arcade.collide(spiegelSprs,hindernis);
    game.physics.arcade.collide(spiegelSprs, kristall);
    game.physics.arcade.collide(spiegelSprs, ursprung);
    game.physics.arcade.collide(hindernis, kristall);
    game.physics.arcade.collide(hindernis, ursprung);
    }

}

function render() {
    game.debug.body(dog);
    //game.debug.body(kristall);
    //game.debug.body(ursprung);
    game.debug.body(toast[0]);
    game.debug.body(spiegelSprs[2]);
    //game.debug.body(hindernis[0]);
    game.debug.body(laserZeichner);
}