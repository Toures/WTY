/**
 * Created by Ping on 16.07.15.
 */

function ladeLevel1(){
    startZeit = 30;
    setlaserUrsprung(0,laserVelocity);
    erzeugeUrsprung(100,80);
    erzeugeKristall(300,200);
    erzeugeToast();
    erzeugeHindernis();
    erzeugeSpiegel();
}

function ladeLevel2(){
    startZeit = 20;
    //TODO
    setlaserUrsprung(0,laserVelocity);
    erzeugeUrsprung(100,80);
    erzeugeKristall();
    erzeugeToast();
    erzeugeHindernis();
    erzeugeSpiegel();
}

function ladeLevel3(){
    startZeit = 10;
    //TODO
    setlaserUrsprung(0,laserVelocity);
    erzeugeUrsprung(100,80);
    erzeugeKristall();
    erzeugeToast();
    erzeugeHindernis();
    erzeugeSpiegel();
}

function ladeLevel4(){
    startZeit = 10;
    //TODO
    setlaserUrsprung(0,laserVelocity);
    erzeugeUrsprung(100,80);
    erzeugeKristall();
    erzeugeToast();
    erzeugeHindernis();
    erzeugeSpiegel();
}

function entferneLevel(){
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
