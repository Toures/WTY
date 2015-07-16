/**
 * Created by Ping on 16.07.15.
 */

function ladeLevel1(){
    startZeit = 30;
    setlaserUrsprung1();
    erzeugeUrsprung1();
    erzeugeKristall1();
    erzeugeToast1();
    erzeugeHindernis1();
    erzeugeSpiegel1();
}

function ladeLevel2(){
    startZeit = 20;
    //TODO
    setlaserUrsprung1();
    erzeugeUrsprung1();
    erzeugeKristall1();
    erzeugeToast1();
    erzeugeHindernis1();
    erzeugeSpiegel1();
}

function ladeLevel3(){
    startZeit = 10;
    //TODO
    setlaserUrsprung1();
    erzeugeUrsprung1();
    erzeugeKristall1();
    erzeugeToast1();
    erzeugeHindernis1();
    erzeugeSpiegel1();
}

function ladeLevel4(){
    startZeit = 10;
    //TODO
    setlaserUrsprung1();
    erzeugeUrsprung1();
    erzeugeKristall1();
    erzeugeToast1();
    erzeugeHindernis1();
    erzeugeSpiegel1();
}

function entferneLevel(){
    //hintergrund.kill();
    ursprung.kill();
    kristall.kill();
    zeichne = false;
    graphics.clear();
    laserZeichner.body.velocity.set(0);
    timer = game.time.create(true);
    for(i in toast){
        toast[i].kill();
    }
    for(i in hindernis){
        hindernis[i].kill();
    }
    for(i in spiegelSprs){
        spiegelSprs[i].kill();
    }
    for(i in spiegel){
        delete spiegel[i];
    }
}
