/**
 * Created by Ping on 16.07.15.
 */
var popup;
var button;
var popupAktiv = false;

function stelleEin(){
    popupAktiv = true;
    popup.anchor.set(0.5);
    popup.scale.set(0.7);
    popup.alpha = 0.9;

    button.anchor.set(0.5);
    button.scale.set(0.8);

    game.world.bringToTop(popup);
    game.world.bringToTop(button);
}

function popupLevel1() {
    popup = game.add.sprite(game.world.centerX, game.world.centerY, 'hintergrund');
    button = game.add.button(popup.x, popup.y+90, 'start',removePopup,this,2,1,0);
    stelleEin();
}

function popupLevel2(){
    popup = game.add.sprite(game.world.centerX, game.world.centerY, 'hintergrund');
    button = game.add.button(popup.x, popup.y+90, 'start',removePopup,this,2,1,0);
    stelleEin();
}

function popupLevel3(){
    popup = game.add.sprite(game.world.centerX, game.world.centerY, 'hintergrund');
    button = game.add.button(popup.x, popup.y+90, 'start',removePopup,this,2,1,0);
    stelleEin();
}

function popupLevel4(){
    popup = game.add.sprite(game.world.centerX, game.world.centerY, 'hintergrund');
    button = game.add.button(popup.x, popup.y+90, 'start',removePopup,this,2,1,0);
    stelleEin();
}

function popupRestart(){
    popup = game.add.sprite(game.world.centerX, game.world.centerY, 'hintergrund');
    button = game.add.button(popup.x, popup.y+90, 'start',removePopup,this,2,1,0);
    stelleEin();
}

function popupEnde(){
    popup = game.add.sprite(game.world.centerX, game.world.centerY, 'hintergrund');
    stelleEin();
}

function removePopup(){
    popup.kill();
    button.kill();
    popupAktiv = false;

    timer.start();
}