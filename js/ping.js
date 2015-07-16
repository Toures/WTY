/**
 * Created by Ping on 14.07.15.
 */

//game.physics.startSystem(Phaser.Physics.ARCADE);

function erzeugeToast(){
    toast = game.add.sprite(600,200,'toast');
    game.physics.enable(toast, Phaser.Physics.ARCADE);
    toast.body.immovable = true;;
    toast.anchor.set(0.5);
    toast.scale.set(0.06);
    toast.alpha = 0;
}

function erzeugeKristall(){
    kristall = game.add.sprite(300,200,'kristall');
    game.physics.enable(kristall, Phaser.Physics.ARCADE);
    kristall.body.immovable = true;
    kristall.anchor.set(0.45);
    kristall.scale.set(0.5);
    kristall.body.setSize(60,100);
}

function erzeugeUrsprung(){
    ursprung = game.add.sprite(100,80,'ursprung');
    game.physics.enable(ursprung, Phaser.Physics.ARCADE);
    ursprung.body.immovable = true;
    ursprung.anchor.set(0.5);
    ursprung.scale.set(0.1);
}

function erzeugeLaserZeichner(){
    laserZeichner = game.add.sprite(ursprung.x,ursprung.y,'ursprung');
    game.physics.enable(laserZeichner, Phaser.Physics.ARCADE);
    laserZeichner.scale.set(0.0005);
    laserZeichner.anchor.set(0.5);
    //laserZeichner.body.bounce.set(1.6);
    laserZeichner.body.velocity.setTo(0, laserVelocity);
}

function starteGraphicsNeu(){
    graphics.clear();
    //beginFill(color, alpha)
    graphics.beginFill(0x00FF00,1);
    //lineStyle(lineWidth, color, alpha);
    graphics.lineStyle(1, 0x0000FF, 1);
    laserZeichner.x = ursprung.x;
    laserZeichner.y = ursprung.y;
    laserZeichner.body.velocity.setTo(0, 50);
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

    game.camera.follow(dog);
}

function erzeugeSpiegel(){
    spiegelSprs[0] = game.add.sprite(355,255,'spiegel');
    spiegelSprs[1] = game.add.sprite(550,200,'spiegel');
    spiegelSprs[2] = game.add.sprite(100,200,'spiegel');
    spiegelSprs[3] = game.add.sprite(530,398,'spiegel');


    for(i in spiegelSprs){
        spiegelSprs[i].scale.set(0.2);
        spiegelSprs[i].anchor.set(0.5);
        if(i == 0)
            spiegel[i] = new Spiegel(spiegelSprs[i],true, true);
        else
            spiegel[i] = new Spiegel(spiegelSprs[i],true, true);
    }

}

function erzeugeHindernis(){
    hindernis[2] = game.add.sprite(500,330,'hindernis');
    hindernis[1] = game.add.sprite(455,200,'hindernis');
    hindernis[0] = game.add.sprite(700,400,'hindernis');

    for(i in hindernis){
        hindernis[i].scale.set(0.1);
        hindernis[i].anchor.set(0.5);
        game.physics.enable(hindernis[i], Phaser.Physics.ARCADE);
        hindernis[i].body.collideWorldBounds = true;
    }
}