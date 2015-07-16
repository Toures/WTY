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
    numAktuellesSpiegel = spiegelSprs.indexOf(sp);
    if(!sp.body.immovable){
        starteGraphicsNeu();
    }
    spiegel[numAktuellesSpiegel].zeigeButtons();
}

function hundHindernis(hund,hi){
    numAktuellesHindernis = hindernis.indexOf(hi);
    if(!hi.body.immovable){
        starteGraphicsNeu();
    }
}

function hundToast(h,t){
    t.kill();
    console.log(t.x);
    // TODO Animation Toast
    game.add.tween(t).to( {alpha: 1 }, 2000, 'Linear', true);
    t.kill();
    var verschwinde = function(t){
        game.add.tween(t).to( {alpha: 0 }, 2000, 'Linear', true);
    }
    game.time.events.add(2000,verschwinde,this,t);
    var entferne = function(t){
        t.kill();
    }
    game.time.events.add(4000,entferne,this,t);

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

function laserKristall(lz, kristall){
    lz.body.velocity.set(0);
    //TODO Kristall Animation
    console.log('gewonnen');
    //nächte level laden
    if(level == 1){
        entferneLevel();
        ladeLevel2();
        popupLevel2();
        level++;
    }else if(level == 2){
        entferneLevel();
        ladeLevel3();
        popupLevel3();
        level++;
    }else if(level == 3){
        entferneLevel();
        ladeLevel4();
        popupLevel4();
        level++;
    }else if(level == 4){
        entferneLevel();
        popupEnde();
    }
}