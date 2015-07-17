/**
 * Created by Ping on 15.07.15.
 */

var numAktuellesSpiegel = 0;
var numAktuellesHindernis = 0;

var obenRechts = 90;
var rechtUnten = -180;
var untenLinks = -90;
var linksOben = 0;

function hundSpiegel(hund,sp){
    if(!checkSpiegel){
        checkSpiegel = true;
        zeigeText(spiegelDrehbar);
    }
    numAktuellesSpiegel = spiegelSprs.indexOf(sp);
    if(!sp.body.immovable){
        starteGraphicsNeu();
    }
    spiegel[numAktuellesSpiegel].zeigeButtons();
}

function hundHindernis(hund,hi){
    if(!checkHindernis){
        checkHindernis = true;
        zeigeText(hindernisText);
    }
    numAktuellesHindernis = hindernis.indexOf(hi);
    if(!hi.body.immovable){
        starteGraphicsNeu();
    }
}

function hundToast(h,t){
    var x = t.x;
    var y = t.y;
    t.kill();

    // Toast-Animation
    var fakeToast = game.add.sprite(x,y,'toast');
    fakeToast.alpha = 0;
    fakeToast.anchor.set(0.5);
    game.add.tween(fakeToast).to( {alpha: 1 }, 2000, 'Linear', true);
    var verschwinde = function(fakeToast){
        game.add.tween(fakeToast).to( {alpha: 0 }, 2000, 'Linear', true);
    }
    game.time.events.add(2000,verschwinde,this,fakeToast);
    var entferne = function(fakeToast){
        fakeToast.kill();
    }
    game.time.events.add(4000,entferne,this,fakeToast);

    zeichne = true;
    startZeit = toastZeit+game.rnd.integerInRange(15,20);
    timer = game.time.create(true);
    timer.start();
    starteGraphicsNeu();

}

function laserSpiegel(lz,sp) {
    if(zeichne){
    switch (sp.angle){// prüfe Spiegelrichtung
        case obenRechts:
            if(lz.body.velocity.x == 0 && lz.body.velocity.y > 0){// Laser strahlt nach unten
                lz.body.velocity.setTo(laserVelocity, 0); // strahl nach rechts weiter
            }else if(lz.body.velocity.x < 0 && lz.body.velocity.y == 0){// Laser strahl nach links
                lz.body.velocity.setTo(0, 0-laserVelocity); // strahl nach oben weiter
            }else if(lz.body.velocity.x == 0 && lz.body.velocity.y < 0){// Laser strahl nach oben
                lz.body.velocity.set(0); // stoppe
            }else if(lz.body.velocity.x > 0 && lz.body.velocity.y == 0){ // Laser strahl nach rechts
                lz.body.velocity.set(0); // stoppe
            }
            break;
        case rechtUnten:
            if(lz.body.velocity.x == 0 && lz.body.velocity.y > 0){
                lz.body.velocity.set(0);
            }else if(lz.body.velocity.x < 0 && lz.body.velocity.y == 0){
                lz.body.velocity.setTo(0, laserVelocity);
            }else if(lz.body.velocity.x == 0 && lz.body.velocity.y < 0){
                lz.body.velocity.setTo(laserVelocity, 0);
            }else if(lz.body.velocity.x > 0 && lz.body.velocity.y == 0){
                lz.body.velocity.set(0);
            }
            break;
        case untenLinks:
            if(lz.body.velocity.x == 0 && lz.body.velocity.y > 0){
                lz.body.velocity.set(0);
            }else if(lz.body.velocity.x < 0 && lz.body.velocity.y == 0){
                lz.body.velocity.set(0);
            }else if(lz.body.velocity.x == 0 && lz.body.velocity.y < 0){
                lz.body.velocity.setTo(0-laserVelocity, 0);
            }else if(lz.body.velocity.x > 0 && lz.body.velocity.y == 0){
                lz.body.velocity.setTo(0, laserVelocity);
            }
            break;
        case linksOben:
            if(lz.body.velocity.x == 0 && lz.body.velocity.y > 0){
                lz.body.velocity.setTo(0-laserVelocity, 0);
            }else if(lz.body.velocity.x < 0 && lz.body.velocity.y == 0){
                lz.body.velocity.set(0);
            }else if(lz.body.velocity.x == 0 && lz.body.velocity.y < 0){
                lz.body.velocity.set(0);
            }else if(lz.body.velocity.x > 0 && lz.body.velocity.y == 0){
                lz.body.velocity.setTo(0, 0-laserVelocity);
            }
            break;
    }
    }
    /*
    if (zeichne) {
        for (var i = lz.y; i < sp.y; i++) {
            graphics.drawRect(lz.x, i, linienDicke, linienDicke);
        }
    }
    */
    lz.x = sp.x;
    lz.y = sp.y;

}

function laserHindernis(lz, hindernis){
    lz.body.velocity.set(0);
}

function laserKristall(lz){
    lz.body.velocity.set(0);
    var f = function(){
        console.log('gewonnen');
        if (level == 4) {
            popupEnde();
        }else{
            popupNext();
            level++;
        }
    }
    timer.stop();
    kristall.visibel = false;
    //Kristall-Animation
    FakeKristall = game.add.sprite(kristall.x,kristall.y,'leuchtKristall');
    game.physics.enable(FakeKristall, Phaser.Physics.ARCADE);
    FakeKristall.body.immovable = true;
    FakeKristall.anchor.set(0.45);
    FakeKristall.scale.set(0.5);
    FakeKristall.animations.add('strahlen',[0,1,2,3],7,true);
    FakeKristall.play('strahlen');
    game.time.events.add(2000,f,this);
}