window.onload = function(){
    dogtoaster();
};

function dogtoaster(){
    var HEIGHT = 600;
    var WIDTH = 800;
    var percent = (1.0/100.0);
    var game = new Phaser.Game(WIDTH, HEIGHT, Phaser.AUTO, '',{preload:preload, create:create, update:update});

    var keys;

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

    }

    function update() {
        dt = game.time.elapsed;
    }
}