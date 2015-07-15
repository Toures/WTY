window.onload = function(){
    dogtoaster();
};

function dogtoaster(){
    var game = new Phaser.Game(WIDTH, HEIGHT, Phaser.AUTO, '',{preload:preload, create:create, update:update});
    //Dimensionen des Spielfeldes (sollte ein Vielfaches der tilesize sein)
    var tilesize = 64; //Groesse der Felder
    var HEIGHT = (10*tilesize);
    var WIDTH = (14*tilesize);
    var timer, time; //Zeitanzeige
    var keys; //Tasteneingabe
    //Laserobjekte
    var graLines;
    var geoLines = [];
    var objects = [];//Alle Spielobjekte welche mit den Lasern interagieren

    function preload(){
        keys = {
            up: game.input.keyboard.addKey(Phaser.Keyboard.UP),
            down: game.input.keyboard.addKey(Phaser.Keyboard.DOWN),
            left: game.input.keyboard.addKey(Phaser.Keyboard.LEFT),
            right: game.input.keyboard.addKey(Phaser.Keyboard.RIGHT),
            shift: game.input.keyboard.addKey(Phaser.Keyboard.SHIFT)
        }
    }

    function create(){
        graLines = game.add.graphics(0,0);
        graLines.lineStyle(3,0xff0000,1);
        addLaser(300,300,400,300);
        castLaser(400,300,"oben");

        time = 11;
        timer = game.add.text(20,20,time+"", {font: '15px Arial', fill:'#ffffff', align: 'center'});
    }

    function update() {
        dt = game.time.elapsed;
        //Countdown, wenn abgelaufen -> GameOver bzw. Neustart des Levels
        time -= dt/1000;
        timer.text = Phaser.Math.truncate(time)+"";
        if(Phaser.Math.truncate(time) <= 0) {
            gameOver();
        }

        if (keys.up.isDown) {
            console.log(geoLines.length + "");
            addLaser(geoLines[geoLines.length-1].end.x,
                geoLines[geoLines.length-1].end.y,
                geoLines[geoLines.length-1].end.x+game.rnd.integerInRange(-10,10),
                geoLines[geoLines.length-1].end.y+game.rnd.integerInRange(-10,10));
        }

        if (game.rnd.integerInRange(0,30) === 0 && geoLines.length > 30) {
            deleteLasers(geoLines[20]);
        }
        var line = castLaser(0,100,'rechts');
        deleteLasers(line);
    }

    function addLaser(x1,y1,x2,y2) {
        var child = game.add.graphics(0,0);
        child.lineStyle(3,0xff0000,1);
        child.moveTo(x1,y1);
        child.lineTo(x2,y2);
        graLines.addChild(child);
        geoLines.push(new Phaser.Line(x1, y1, x2, y2));
    }

    function castLaser(x, y, dir) {
        var xTo = 0, yTo = 0;
        switch (dir) {
            case "oben":
                for (; inside(y + yTo, 0, HEIGHT); yTo -= tilesize) {
                    console.log(yTo+"");
                    for (var i in objects) {
                        if (Phaser.Math.within(objects[i].sprite.x,x+xTo,10) && Phaser.Math.within(objects[i].sprite.y,y+yTo,10)) {
                            objects[i].laserHit(dir);
                            break;
                        }
                    }
                }
                break;
            case "unten":
                for (; inside(y + yTo, 0, HEIGHT); yTo += tilesize) {
                    for (var i in objects) {
                        if (Phaser.Math.within(objects[i].sprite.x,x+xTo,10) && Phaser.Math.within(objects[i].sprite.y,y+yTo,10)) {
                            objects[i].laserHit(dir);
                            break;
                        }
                    }
                }
                break;
            case "links":
                for (; inside(x + xTo, 0, WIDTH); xTo -= tilesize) {
                    for (var i in objects) {
                        if (Phaser.Math.within(objects[i].sprite.x,x+xTo,10) && Phaser.Math.within(objects[i].sprite.y,y+yTo,10)) {
                            objects[i].laserHit(dir);
                            break;
                        }
                    }
                }
                break;
            case "rechts":
                for (; inside(x + xTo, 0, WIDTH); xTo += tilesize) {
                    for (var i in objects) {
                        if (Phaser.Math.within(objects[i].sprite.x,x+xTo,10) && Phaser.Math.within(objects[i].sprite.y,y+yTo,10)) {
                            objects[i].laserHit(dir);
                            break;
                        }
                    }
                }
                break;
            default:
                console.log("Und castLaser() so: \"NOPE\"");
                return null;
        }

        var child = game.add.graphics(0,0);
        child.lineStyle(3,0xff0000,1);
        child.moveTo(x,y);
        child.lineTo(x+xTo,y+yTo);
        graLines.addChild(child);
        geoLines.push(new Phaser.Line(x, y, x + xTo, y + yTo));
    }

    //Entfernt alle Laserobjekte ab einem bestimmten Laserobjekt (d.h. alle darauffolgende Laserobjekte)
    function deleteLasers(laser) {
        geoLines.indexOf(laser);
        graLines.removeChildren(geoLines.indexOf(laser),geoLines.length);
        geoLines.splice(geoLines.indexOf(laser),geoLines.length-geoLines.indexOf(laser));
    }

    //Bei uebergabe der Level wird ein Levelobjekt zur�ckgegeben mit allen Informationen �ber das Level
    //In default ist eine Vorlage f�r ein Level, kopiert diese einfach in die verschiedenen cases f�r
    //die verschiedenen Level.
    function levelData(levelNumber){
        var level;
        switch (levelNumber) {
            case 1:
                break;
            case 2:
                break;
            //etc. etc.
            default:
                level = {
                    time: 10,
                    posDogX: 2 * tilesize,
                    posDogY: 2 * tilesize,
                    posLaserX: 5 * tilesize,
                    posLaserY: 0,
                    dirLaser: "unten",
                    generateObjects: function () {
                        //Hier wird alles zum setup des levels gemacht, unter anderem:
                        //Spielobjekte erschaffen
                    },
                    postInit: function() {
                        //Hier k�nnen nachdem das Level initialisiert wurde weitere Einstellungen
                        //vorgenommen werden, z.b. spawnrate der Zeitpacks(Batterien) ge�ndert werden
                    }
                }
        }

        return level;
    }

    function inside(i, a, b) {
        return ((i >= a) && (i <= b));
    }

    function gameOver() {

    }
}