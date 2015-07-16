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
    game.add.tween(t).to( {alpha: 1 }, 2000, 'Linear', true);
    toastGefunden = true;
    game.add.tween(t).to( {scale: 0 }, 2000, 'Linear', true);
    starteGraphicsNeu();
}

function laserSpiegel(lz,sp) {
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
    /*
    if (toastGefunden) {
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
    console.log('gewonnen');
    //TODO popup
    //prüfe, ob Toast gefunden wurde
    //kill elemente
    //nächte level laden
}