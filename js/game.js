window.onload = function(){
    dogtoaster();
};

function dogtoaster(){
    var HEIGHT = 600;
    var WIDTH = 800;
    var percent = (1.0/100.0);
    var game = new Phaser.Game(WIDTH, HEIGHT, Phaser.AUTO, '',{preload:preload, create:create, update:update});
    var graLines;

    var keys;
    var geoLines = [];
    var objects = [];

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
        console.log(geoLines[0].start.x + " " + geoLines[0].start.y);
        console.log(geoLines[0].end.x + " " + geoLines[0].end.y);
    }

    function update() {
        dt = game.time.elapsed;

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
    }

    function addLaser(x1,y1,x2,y2) {
        var child = game.add.graphics(0,0);
        child.lineStyle(3,0xff0000,1);
        child.moveTo(x1,y1);
        child.lineTo(x2,y2);
        graLines.addChild(child);
        geoLines.push(new Phaser.Line(x1, y1, x2, y2));
    }

    function createLaser(x, y, dir) {
        var xTo = 0, yTo = 0;
        switch (dir) {
            case "oben":
                for (; inside(y + yTo, 0, HEIGHT); yTo += tilesize) {
                    for (var i in objects) {
                        if (objects[i].sprite.x === x + xTo && objects[i].sprite.y === y + yTo) {
                            objects[i].laserHit(dir);
                            break;
                        }
                    }
                }
                break;
            case "unten":
                for (; inside(y + yTo, 0, HEIGHT); yTo -= tilesize) {
                    for (var i in objects) {
                        if (objects[i].sprite.x === x + xTo && objects[i].sprite.y === y + yTo) {
                            objects[i].laserHit(dir);
                            break;
                        }
                    }
                }
                break;
            case "links":
                for (; inside(x + xTo, 0, WIDTH); xTo -= tilesize) {
                    for (var i in objects) {
                        if (objects[i].sprite.x === x + xTo && objects[i].sprite.y === y + yTo) {
                            objects[i].laserHit(dir);
                            break;
                        }
                    }
                }
                break;
            case "rechts":
                for (; inside(x + xTo, 0, WIDTH); xTo -= tilesize) {
                    for (var i in objects) {
                        if (objects[i].sprite.x === x + xTo && objects[i].sprite.y === y + yTo) {
                            objects[i].laserHit(dir);
                            break;
                        }
                    }
                }
                break;
            default:
                return null;
        }

        var child = game.add.graphics(0,0);
        child.moveTo(x,y);
        child.lineTo(x+xTo,y+yTo);
        graLines.addChild(child);
        geoLines.push(new Line(x, y, x + xTo, y + yTo));
    }

    //Entfernt alle Laserobjekte ab einem bestimmten Laserobjekt (d.h. alle darauffolgende Laserobjekte)
    function deleteLasers(laser) {
        geoLines.indexOf(laser);
        graLines.removeChildren(geoLines.indexOf(laser),geoLines.length);
        geoLines.splice(geoLines.indexOf(laser),geoLines.length-geoLines.indexOf(laser));
    }

    function inside(i, a, b) {
        return ((i >= a) && (i <= b));
    }
}