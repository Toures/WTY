/**
 * Created by Ping on 15.07.15.
 */

function Spiegel(spr, drehbar, bewegbar){
    this.spr = spr;
    game.physics.enable(this.spr, Phaser.Physics.ARCADE);
    this.spr.body.collideWorldBounds = true;
    this.spr.anchor.setTo(0.5, 0.5);
    this.drehbar = drehbar;

    if(!bewegbar){
        this.spr.body.immovable = true;
    }
    this.stoppe = function(){
        if(bewegbar){
            this.spr.body.velocity.set(0);
        }
    }

    this.dreheUhrzeigesinn = function(){
        if(this.drehbar){
            this.spr.angle += 90;
        }
        console.log(this.spr.angle);
        starteGraphicsNeu();
    }
    this.dreheGegenUhrzeigesinn = function(){
        if(this.drehbar){
            this.spr.angle -= 90;
        }
        starteGraphicsNeu();
    }
    if(drehbar){
    var duzs = this.dreheUhrzeigesinn;
    var dguzs = this.dreheGegenUhrzeigesinn;

    this.buttonRechts = game.add.button(spr.x+feldlaenge,spr.y, 'buttonRechts', duzs,this);
    this.buttonLinks = game.add.button(spr.x-feldlaenge,spr.y,'buttonLinks',dguzs,this);
    console.log(numAktuellesSpiegel);


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

    this.versteckeButtons();
    }
}

function controlDog() {
    //bewegung
    if(keys.up.isDown) {
        dog.body.velocity.y  = -dogVelocity;
        dog.play('up');
        console.log(numAktuellesSpiegel);
        if(spiegel[numAktuellesSpiegel].drehbar){
            spiegel[numAktuellesSpiegel].versteckeButtons();
        }
    } else if(keys.down.isDown ) {
        dog.body.velocity.y = dogVelocity;
        dog.play('down');
        if(spiegel[numAktuellesSpiegel].drehbar){
            spiegel[numAktuellesSpiegel].versteckeButtons();
        }
    } else if(keys.left.isDown) {
        dog.body.velocity.x = -dogVelocity;
        dog.play('left');
        if(spiegel[numAktuellesSpiegel].drehbar){
            spiegel[numAktuellesSpiegel].versteckeButtons();
        }
    } else if(keys.right.isDown ) {
        dog.body.velocity.x = dogVelocity;
        dog.play('right');
        if(spiegel[numAktuellesSpiegel].drehbar){
            spiegel[numAktuellesSpiegel].versteckeButtons();
        }
    }
}

function starteGraphicsNeu(){
    graphics.clear();
    //beginFill(color, alpha)
    graphics.beginFill(0xff0000,1);
    //lineStyle(lineWidth, color, alpha);
    graphics.lineStyle(1, 0xff0000, 6);
    laserZeichner.x = ursprung.x;
    laserZeichner.y = ursprung.y;
    laserZeichner.body.velocity.setTo(laserUrsprungVelocityX, laserUrsprungVelocityY);
}

function zeichneLaser(){
    if(laserZeichner.x<0||laserZeichner.y<0||laserZeichner.x>game.world.width||laserZeichner.y>game.world.height){
        laserZeichner.body.velocity.setTo(0,0);
    }
    if((laserZeichner.body.velocity.x!=0||laserZeichner.body.velocity.y!=0)&&zeichne){
        graphics.drawRect(laserZeichner.x, laserZeichner.y, linienDicke, linienDicke);
    }
}

function stoppeElemente(){
    dog.body.velocity.set(0);
    for(i in spiegelSprs){
        if(!spiegelSprs[i].body.immovable)
            spiegelSprs[i].body.velocity.set(0);
    }
    for(i in hindernis){
        if(!hindernis[i].body.immovable)
            hindernis[i].body.velocity.set(0);
    }
}