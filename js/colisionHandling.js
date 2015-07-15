/**
 * Created by Thea on 15.07.15.
 */
/**
 * Created by Ping on 15.07.15.
 */
/**
 * Created by Thea on 14.07.15.
 */

//game.physics.startSystem(Phaser.Physics.ARCADE);

var feldlaenge = 64;

function Ursprung(spr){
    this.spr = spr;
    game.physics.enable(this.spr, Phaser.Physics.ARCADE);
    this.spr.body.immovable = true;
    //sprite.body.checkCollision.up = true;
}

function Spiegel(spr, drehbar, bewegbar){
    this.spr = spr;
    game.physics.enable(this.spr, Phaser.Physics.ARCADE);
    this.spr.body.collideWorldBounds = true;
    this.spr.anchor.setTo(0.5, 0.5);
    this.drehbar = drehbar;

    if(!bewegbar){
        this.spr.body.immovable = true;
    }
    this.dreheUhrzeigesinn = function(){
        if(this.drehbar){
            this.spr.angle += 90;
        }
    }
    this.dreheGegenUhrzeigesinn = function(){
        if(this.drehbar){
            this.spr.angle -= 90;
        }
    }

    var duzs = this.dreheUhrzeigesinn;
    var dguzs = this.dreheGegenUhrzeigesinn;



    this.buttonRechts = game.add.button(spr.x+feldlaenge,spr.y, 'buttonRechts', duzs,this);
    this.buttonLinks = game.add.button(spr.x-feldlaenge,spr.y,'buttonLinks',dguzs,this);

    this.buttonLinks.scale.setTo(0.5,0.5);
    this.buttonRechts.scale.setTo(0.5,0.5);
    this.buttonLinks.anchor.setTo(0.5,0.5);
    this.buttonRechts.anchor.setTo(0.5,0.5);

    this.zeigeButtons = function(){
        this.buttonRechts.x = this.spr.x+feldlaenge;
        this.buttonLinks.x = this.spr.x-feldlaenge;
        this.buttonRechts.y = this.spr.y;
        this.buttonLinks.y = this.spr.y;
        this.buttonRechts.visible = true;
        this.buttonLinks.visible = true;
    }

    this.versteckeButtons = function(){
        this.buttonRechts.visible = false;
        this.buttonLinks.visible = false;
    }

    this.bewegeNachLinks = function(){
        if(bewegbar){
            this.spr.body.velocity.x = 0-feldlaenge;
        }
    }
    this.bewegeNachRechts = function(){
        if(bewegbar){
            this.spr.body.velocity.x = feldlaenge;
        }
    }
    this.bewegeNachOben = function(){
        if(bewegbar){
            this.spr.body.velocity.y = 0-feldlaenge;
        }
    }
    this.bewegeNachUnten = function(){
        if(bewegbar){
            this.spr.body.velocity.y = feldlaenge;
        }
    }
    this.keineBewegung = function(){
        if(bewegbar){
            this.spr.body.velocity.x = 0;
            this.spr.body.velocity.y = 0;
        }
    }
    this.versteckeButtons();
}

function Toast(spr){
    this.spr = spr;
    game.physics.enable(this.spr, Phaser.Physics.ARCADE);
    this.spr.body.immovable = true;
}

function Kristall(spr){
    this.spr = spr;
    game.physics.enable(this.spr, Phaser.Physics.ARCADE);
    this.spr.body.immovable = true;
}

function Hindernis(spr, bewegbar){
    this.spr = spr;
    game.physics.enable(this.spr, Phaser.Physics.ARCADE);
    this.spr.body.collideWorldBounds = true;
    if(!bewegbar){
        this.spr.body.immovable = true;
    }
    this.bewegeNachLinks = function(){
        if(bewegbar){
            this.spr.x-=feldlaenge;
        }
    }
    this.bewegeNachRechts = function(){
        if(bewegbar){
            this.spr.x+=feldlaenge;
        }
    }
    this.bewegeNachOben = function(){
        if(bewegbar){
            this.spr.y-=feldlaenge;
        }
    }
    this.bewegeNachUnten = function(){
        if(bewegbar){
            this.spr.y+=feldlaenge;
        }
    }
}


var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'Spiegel', { preload: preload, create: create,
    update: update, render: render });

function preload() {

    game.load.spritesheet('button', 'assets/spaceship.png', 193, 71);

    game.load.image('hintergrund','assets/crappyStarfield.png');
    game.load.image('spiegel1','assets/spaceship.png');
    game.load.image('buttonLinks','assets/meteor.png');
    game.load.image('buttonRechts','assets/meteor.png');

}

var background;
var spiegel1;
var spiegel2;
var cursors;
var richtungBewegung;
var numKollision = 0;
var numAktuellesSpiegel = 0;
var spiegelObjekte =[];
var spiegel = [];

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    background = game.add.sprite(0, 0, 'hintergrund');
    background.name = 'background';

    var sp1 = game.add.sprite(300,264,'spiegel1');
    sp1.angle = -135;
    spiegel1 = new Spiegel(sp1,true,true);

    var sp2 = game.add.sprite(300,200,'spiegel1');
    sp2.angle = -135;
    spiegel2 = new Spiegel(sp2,true,true);

    spiegelObjekte[0] = sp1;
    spiegelObjekte[1] = sp2;
    spiegel[0] = spiegel1;
    spiegel[1] = spiegel2;

    cursors = game.input.keyboard.createCursorKeys();

}

function update(){
    spiegel2.spr.inputEnabled = true;
    spiegel2.keineBewegung();
    spiegel1.keineBewegung();
    if(cursors.up.isDown){
        spiegel2.bewegeNachOben();
        richtungBewegung ='oben';
        spiegel[numAktuellesSpiegel].versteckeButtons();
    }

    if(cursors.down.isDown){
        //spiegel2.bewegeNachUnten();
        spiegel2.spr.body.y++;
        richtungBewegung = 'unten';
        spiegel[numAktuellesSpiegel].versteckeButtons();
    }

    if(cursors.left.isDown){
        spiegel2.bewegeNachLinks();
        richtungBewegung = 'links';
        spiegel[numAktuellesSpiegel].versteckeButtons();
    }

    if(cursors.right.isDown){
        spiegel2.bewegeNachRechts();
        richtungBewegung = 'rechts';
        spiegel[numAktuellesSpiegel].versteckeButtons();
    }
    game.physics.arcade.collide(spiegel1.spr, spiegel2.spr,schiebe);

}

function schiebe(sp1,sp2){
    numAktuellesSpiegel = spiegelObjekte.indexOf(sp1)
    console.log(spiegelObjekte.indexOf(sp1));
    if(numKollision>0){
        switch (richtungBewegung) {
            case 'unten':
                spiegel[numAktuellesSpiegel].bewegeNachUnten();
                break;
            case 'oben':
                spiegel[numAktuellesSpiegel].bewegeNachOben();
                break;
            case 'links':
                spiegel[numAktuellesSpiegel].bewegeNachLinks();
                break;
            case 'rechts':
                spiegel[numAktuellesSpiegel].bewegeNachRechts();
                break;
                numKollision = 0;
        }
    }

    spiegel[numAktuellesSpiegel].zeigeButtons();
    numKollision++;
}

function updateCounter(){

    //spiegel1.dreheUhrzeigesinn();

}
function render () {
    game.debug.body(spiegel1.spr);
    game.debug.body(spiegel2.spr);

}