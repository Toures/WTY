/**
 * Created by Ping on 16.07.15.
 */
var popup;
var button;
var buttonText;
var popupAktiv = false;
var buttonTextstyle = { font: "18px Arial", fill: "#ffffff", align: "center" };

function stelleEin(){
    popupAktiv = true;
    popup.anchor.set(0.5);
    popup.scale.set(0.7);
    popup.alpha = 0;

    button.anchor.set(0.5);
    button.scale.set(0.8);
    button.alpha = 0;

    buttonText.anchor.set(0.5);
    buttonText.alpha = 0;

    game.world.bringToTop(popup);
    game.world.bringToTop(button);
    game.world.bringToTop(buttonText);

    game.add.tween(popup).to( {alpha: 0.9 }, 500, 'Linear', true);
    game.add.tween(button).to( {alpha: 1 }, 500, 'Linear', true);
    game.add.tween(buttonText).to( {alpha: 1 }, 500, 'Linear', true);

}

function popupLevel1() {
    popup = game.add.sprite(game.world.centerX, game.world.centerY, 'hintergrund');
    button = game.add.button(popup.x, popup.y+90, 'start',removePopup,this,2,1,0);
    buttonText = game.add.text(popup.x, popup.y+90,'Start',buttonTextstyle);

    stelleEin();
}

function popupLevel2(){
    popup = game.add.sprite(game.world.centerX, game.world.centerY, 'hintergrund');
    button = game.add.button(popup.x, popup.y+90, 'nextLevel',removePopup,this,2,1,0);
    buttonText = game.add.text(popup.x, popup.y+90,'Next level',buttonTextstyle);
    stelleEin();
}

function popupLevel3(){
    popup = game.add.sprite(game.world.centerX, game.world.centerY, 'hintergrund');
    button = game.add.button(popup.x, popup.y+90, 'nextLevel',removePopup,this,2,1,0);
    buttonText = game.add.text(popup.x, popup.y+90,'Next level',buttonTextstyle);
    stelleEin();
}

function popupLevel4(){
    popup = game.add.sprite(game.world.centerX, game.world.centerY, 'hintergrund');
    button = game.add.button(popup.x, popup.y+90, 'nextLevel',removePopup,this,2,1,0);
    buttonText = game.add.text(popup.x, popup.y+90,'Next level',buttonTextstyle);
    stelleEin();
}

function popupRestart(){
    popup = game.add.sprite(game.world.centerX, game.world.centerY, 'hintergrund');
    button = game.add.button(popup.x, popup.y+90, 'nextLevel',removePopup,this,2,1,0);
    buttonText = game.add.text(popup.x, popup.y+90,'Restart',buttonTextstyle);
    stelleEin();
}

function popupEnde(){
    popup = game.add.sprite(game.world.centerX, game.world.centerY, 'hintergrund');
    stelleEin();
}

function removePopup(){
    popup.kill();
    button.kill();
    buttonText.kill();
    popupAktiv = false;

    timer.start();
}