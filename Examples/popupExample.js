var game = new Phaser.Game(1000, 800, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, render: render });

function preload() {

    game.load.image('background', 'assets/crappyStarfield.png');
    game.load.image('close', 'assets/meteor.png');

}

var popup;
var tween;

function create() {

    game.stage.backgroundColor = '#4b0049';

    //  You can drag the pop-up window around
    popup = game.add.sprite(game.world.centerX, game.world.centerY, 'background');
    popup.anchor.set(0.5);
    popup.alpha = 0.5;

    //  Position the close button to the top-right of the popup sprite (minus 8px for spacing)
    var pw = (popup.width / 2) - 50;
    var ph = (popup.height / 2) - 8;

    //  And click the close button to close it down again
    var closeButton = game.make.sprite(pw, -ph, 'close');
    closeButton.inputEnabled = true;
    closeButton.input.priorityID = 0;
    closeButton.events.onInputDown.add(closeWindow, this);

    //  Add the "close button" to the popup window image
    popup.addChild(closeButton);

    //  Hide it awaiting a click
   // popup.scale.set(0);
    popup.alpha = 0;

    //  Pop the window open
    game.input.onDown.add(openWindow, this);
    game.input.onDown.add(closeWindow, this);


}

function openWindow() {

    if ((tween && tween.isRunning) || popup.alpha === 1)
    {
        return;
    }

    //  Create a tween that will pop-open the window, but only if it's not already tweening or open
    tween = game.add.tween(popup).to( {alpha: 1 }, 2000, 'Linear', true);

}

function closeWindow() {

    if (tween.isRunning || popup.alpha === 0)
    {
        return;
    }

    //  Create a tween that will close the window, but only if it's not already tweening or closed
    tween = game.add.tween(popup).to( {alpha: 0 }, 200, Phaser.Easing.Elastic.In, true);

}

function render() {

    game.debug.text("Click to open window + drag + close", 32, 32);

}