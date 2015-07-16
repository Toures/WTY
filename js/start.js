/**
 * Created by Thea on 15.07.15.
 */

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'dogtoaster', { preload: preload, create: create,
    update: update, render: render });

var keys;

var dog;
var kristall;
var toast;
var ursprung;
var laserZeichner;
var graphics;
var hindernis = [];
var spiegel = [];
var spiegelSprs = [];

var linienDicke = 1;
var feldlaenge = 64;
var dogVelocity = 250;
var laserVelocity = 100;
var toastGefunden = false;

function preload(){
    game.load.image('hund','assets/hund.png');
    /*
    game.load.image('left','assets/hund.png');
    game.load.image('right','assets/hund.png');
    game.load.image('up','assets/hund.png');
    game.load.image('down','assets/hund.png');
    */

    game.load.image('hintergrund','assets/crappyStarfield.png');
    game.load.image('spiegel','assets/spiegel.png');
    game.load.image('buttonLinks','assets/buttonLinks.png');
    game.load.image('buttonRechts','assets/buttonRechts.png');
    game.load.image('toast','assets/toast.png');
    game.load.image('kristall','assets/kristall.png');
    game.load.image('ursprung','assets/ursprung.png');
    game.load.image('hindernis','assets/hindernis.png');
}

function create(){
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.sprite(0,0,'hintergrund');
    erzeugeUrsprung();
    erzeugeLaserZeichner();
    erzeugeKristall();
    erzeugeToast();
    erzeugeHindernis();
    erzeugeSpiegel();
    erzeugeHund();
    graphics = game.add.graphics(0, 0);
    starteGraphicsNeu();

    keys = {
        up: game.input.keyboard.addKey(Phaser.Keyboard.UP),
        down: game.input.keyboard.addKey(Phaser.Keyboard.DOWN),
        left: game.input.keyboard.addKey(Phaser.Keyboard.LEFT),
        right: game.input.keyboard.addKey(Phaser.Keyboard.RIGHT),
        shift: game.input.keyboard.addKey(Phaser.Keyboard.SHIFT),
        a: game.input.keyboard.addKey(Phaser.Keyboard.A),
        s: game.input.keyboard.addKey(Phaser.Keyboard.S)
    }

}

function update(){
    //zeichne Laser
    if(laserZeichner.x<0||laserZeichner.y<0||laserZeichner.x>game.world.width||laserZeichner.y>game.world.height){
        laserZeichner.body.velocity.setTo(0,0);
    }
    if((laserZeichner.body.velocity.x!=0||laserZeichner.body.velocity.y!=0)&&toastGefunden){
        graphics.drawRect(laserZeichner.x, laserZeichner.y, linienDicke, linienDicke);
    }

    dog.body.velocity.set(0);
    for(i in spiegelSprs){
        if(!spiegelSprs[i].body.immovable)
            spiegelSprs[i].body.velocity.set(0);
    }
    for(i in hindernis){
        if(!hindernis[i].body.immovable)
            hindernis[i].body.velocity.set(0);
    }
    controlDog();

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

function render(){
    //game.debug.body(dog);
    //game.debug.body(kristall);
    //game.debug.body(ursprung);
    //game.debug.body(toast);
    //game.debug.body(spiegelSprs[2]);
    //game.debug.body(hindernis[0]);

}