/**
 * Created by Ping on 16.07.15.
 */

var s = [[355,255,true,true,0],
    [550,200,false,true,0],
    [100,200,true,true,0],
    [530,398,true,true,0]];

var h = [
    [700,400,true,0],
    [455,200,false,50],
    [500,330,true,0]
];

var t = [
    [600,200,true]
];

function ladeLevel1(){
    startZeit = 30;
    setlaserUrsprung(0,laserVelocity);
    erzeugeUrsprung(100,80);
    erzeugeKristall(300,200);
    erzeugeToast(t);
    erzeugeHindernis(h);
    erzeugeSpiegel(s);
}

function ladeLevel2(){
    startZeit = 20;
    //TODO
    setlaserUrsprung(0,laserVelocity);
    erzeugeUrsprung(100,80);
    erzeugeKristall(300,200);
    erzeugeToast(t);
    erzeugeHindernis(h);
    erzeugeSpiegel(s);
}

function ladeLevel3(){
    startZeit = 10;
    //TODO
    setlaserUrsprung(0,laserVelocity);
    erzeugeUrsprung(100,80);
    erzeugeKristall(300,200);
    erzeugeToast(t);
    erzeugeHindernis(h);
    erzeugeSpiegel(s);
}

function ladeLevel4(){
    startZeit = 10;
    //TODO
    setlaserUrsprung(0,laserVelocity);
    erzeugeUrsprung(100,80);
    erzeugeKristall(300,200);
    erzeugeToast(t);
    erzeugeHindernis(h);
    erzeugeSpiegel(s);
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
