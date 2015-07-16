/**
 * Created by Ping on 14.07.15.
 */

//game.physics.startSystem(Phaser.Physics.ARCADE);

function setlaserUrsprung1(){
    laserUrsprungVelocityX = 0;
    laserUrsprungVelocityY = laserVelocity;
}

function erzeugeKristall1(){
    kristall = game.add.sprite(300,200,'kristall');
    game.physics.enable(kristall, Phaser.Physics.ARCADE);
    kristall.body.immovable = true;
    kristall.anchor.set(0.45);
    kristall.scale.set(0.5);
    kristall.body.setSize(60,100);
}

function erzeugeUrsprung1(){
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
    dog.body.setSize(264,464);
    dog.scale.set(0.1);
    /*
    dog.animations.add('left', [], 64, true);
    dog.animations.add('right', [], 64, true);
    dog.animations.add('up', [], 64, true);
    dog.animations.add('down', [], 64, true);
     */
    dog.anchor.setTo(0.3,0.4);

    //game.camera.follow(dog);
}

function erzeugeSpiegel1(){
    spiegelSprs[0] = game.add.sprite(355,255,'spiegel');
    spiegelSprs[1] = game.add.sprite(550,200,'spiegel');
    spiegelSprs[2] = game.add.sprite(100,200,'spiegel');
    spiegelSprs[3] = game.add.sprite(530,398,'spiegel');

    spiegelSprs[2].angle += 90;

    for(i in spiegelSprs){
        spiegelSprs[i].scale.set(0.2);
        spiegelSprs[i].anchor.set(0.5);
        if(i == 0)
            spiegel[i] = new Spiegel(spiegelSprs[i],true, true);
        else
            spiegel[i] = new Spiegel(spiegelSprs[i],true, true);
    }

}

function erzeugeHindernis1(){
    hindernis[2] = game.add.sprite(500,330,'hindernis');
    hindernis[1] = game.add.sprite(455,200,'hindernis');
    hindernis[0] = game.add.sprite(700,400,'hindernis');

    for(i in hindernis){
        hindernis[i].anchor.set(0.5);
        game.physics.enable(hindernis[i], Phaser.Physics.ARCADE);
        hindernis[i].body.collideWorldBounds = true;
    }
}

function erzeugeToast1(){
    toast[0] = game.add.sprite(600,200,'toast');
    for(i in toast){
        game.physics.enable(toast[i], Phaser.Physics.ARCADE);
        toast[i].body.immovable = true;;
        toast[i].anchor.set(0.5);
        toast[i].alpha = 0;
    }
}