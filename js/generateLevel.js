/**
 * Created by Ping on 14.07.15.
 */

//game.physics.startSystem(Phaser.Physics.ARCADE);

function setlaserUrsprung(x, y){
    laserUrsprungVelocityX = x;
    laserUrsprungVelocityY = y;
}

function erzeugeKristall(x,y){
    kristall = game.add.sprite(x,y,'kristall');
    game.physics.enable(kristall, Phaser.Physics.ARCADE);
    kristall.body.immovable = true;
    kristall.anchor.set(0.45);
    kristall.scale.set(0.5);
    kristall.animations.add('strahlen',[0,1,2,3],7,true);
    kristall.play('strahlen');
}

function erzeugeUrsprung(x,y){
    ursprung = game.add.sprite(100,80,'ursprung');
    game.physics.enable(ursprung, Phaser.Physics.ARCADE);
    ursprung.body.immovable = true;
    ursprung.anchor.set(0.5);
}

function erzeugeLaserZeichner(){
    laserZeichner = game.add.sprite(ursprung.x,ursprung.y,'ursprung');
    game.physics.enable(laserZeichner, Phaser.Physics.ARCADE);
    laserZeichner.scale.set(0.2);
    laserZeichner.anchor.set(0.5);
    //laserZeichner.body.bounce.set(1.6);
    laserZeichner.body.setSize(3,3);
    laserZeichner.alpha = 0;
}

function erzeugeHund(){
    dog =  game.add.sprite(500,500,'hund');
    game.physics.enable(dog, Phaser.Physics.ARCADE);
    dog.body.collideWorldBounds = true;
    dog.body.setSize(64,50);
    dog.animations.add('left', [0,1,2,3], 10, false);
    dog.animations.add('right', [4,5,6,7], 10, false);
    dog.animations.add('up', [8,9,10,11], 10, false);
    dog.animations.add('down', [12,13,14,15], 10, false);
    dog.anchor.setTo(0.5,0.5);

    //game.camera.follow(dog);
}

//s[i] = [x,y,drehbar,bewegbar,Winkel]
function erzeugeSpiegel(s){
    for(i in s){
        spiegelSprs[i] = game.add.sprite(s[i][0],s[i][1],'spiegel');
        spiegelSprs[i].anchor.set(0.5);
        spiegel[i] = new Spiegel(spiegelSprs[i],s[i][2],s[i][3]);
        spiegelSprs[i].angle = s[i][4];
    }
}

//erzeugeHindernis(x,y,bewegbar,Winkel)
function erzeugeHindernis(h){
    for(i in h){
        console.log(hindernis);
        if(h[i][2]){//bewegbar
            hindernis[i] = game.add.sprite(h[i][0],h[i][1],'hindernis');
            game.physics.enable(hindernis[i], Phaser.Physics.ARCADE);
        }else{
            hindernis[i] = game.add.sprite(h[i][0],h[i][1],'metallblock');
            game.physics.enable(hindernis[i], Phaser.Physics.ARCADE);
            hindernis[i].body.immovable = true;
        }
        hindernis[i].anchor.set(0.5);
        hindernis[i].angle = h[i][3];
        hindernis[i].body.collideWorldBounds = true;
    }
}

//erzeugeToast(x,y,sichtbar)
function erzeugeToast(t){
    for(i in t){
        toast[i] = game.add.sprite(t[i][0],t[i][1],'toast');
        game.physics.enable(toast[i], Phaser.Physics.ARCADE);
        toast[i].body.immovable = true;;
        toast[i].anchor.set(0.5);
        if(t[2]){
            toast[i].alpha = 1;
        }else{
            toast[i].alpha = 0;
        }
    }
    /*
    toast[0] = game.add.sprite(600,200,'toast');
    for(i in toast){
        game.physics.enable(toast[i], Phaser.Physics.ARCADE);
        toast[i].body.immovable = true;;
        toast[i].anchor.set(0.5);
        toast[i].alpha = 0;
    }
    */
}