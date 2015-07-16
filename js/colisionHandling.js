/**
 * Created by Ping on 15.07.15.
 */

var bewegungrichtungLaser;
var numAktuellesSpiegel = 0;
var numAktuellesHindernis = 0;

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

function hundToast(){
    game.add.tween(toast).to( {alpha: 1 }, 2000, 'Linear', true);
    toastGefunden = true;
    starteGraphicsNeu();
}

function laserSpiegel(lz,sp) {
    //TODO Fallunterscheidung
    lz.body.velocity.setTo(laserVelocity, 0);
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

