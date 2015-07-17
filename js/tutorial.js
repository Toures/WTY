/**
 * Created by Ping on 16.07.15.
 */
//TODO tutorial Text schreiben

var beschreibungTextstyle = { font: "25px Arial", fill: "#ffffff", align: "center" };
//var t = game.add.text(x, y, text, style);

var toastUndZeit = 'Toast holen';
var hindernisText ='Hindernis bewegbar/nicht bewegbar';
var spiegelDrehbar = 'Spiegel drehber, teilweise bewegbar';

var checkHindernis = false;
var checkSpiegel = false;

function zeigeText(text){
    var t = game.add.text(400,560,text,beschreibungTextstyle);
    t.anchor.set(0.5);
    var delText = function(){
        t.kill();
    }
    game.time.events.add(6000,delText);
}