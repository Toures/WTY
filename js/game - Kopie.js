window.onload = function(){
    meteorstorm();
};

function meteorstorm(){
    var HEIGHT = 600;
    var WIDTH = 800;
    var percent = (1.0/100.0);
    var game = new Phaser.Game(WIDTH, HEIGHT, Phaser.AUTO, '',{preload:preload, create:create, update:update});
	
	var keys;
    var SPEED = 0.2;
    meteors = [];

    function preload(){
		game.load.image('background', 'assets/crappyStarfield.png');
		game.load.image('spaceship', 'assets/spaceship.png');
        game.load.image('meteor', 'assets/meteor.png');
        game.load.audio('music', 'assets/music.mp3');
        game.load.audio('crash', 'assets/crash.ogg');
        game.load.spritesheet('animation', 'assets/animation.png', 90, 95);
		
    }
    function create(){
		game.add.sprite(0,0,'background');
		ship = game.add.sprite(0,0,'spaceship');
		text = game.add.text(20,20,'Hallo GameJam\nMeteorstorm', {font: '25px Arial', fill:'#3debe9', align: 'center'});
        music = game.add.audio('music');
        crash = game.add.audio('crash');

        music.loop = true;
        music.play();

        keys = {
            up: game.input.keyboard.addKey(Phaser.Keyboard.UP),
            down: game.input.keyboard.addKey(Phaser.Keyboard.DOWN),
            left: game.input.keyboard.addKey(Phaser.Keyboard.LEFT),
            right: game.input.keyboard.addKey(Phaser.Keyboard.RIGHT),
            shift: game.input.keyboard.addKey(Phaser.Keyboard.SHIFT)
        }
    }
    function update() {
        dt = game.time.elapsed;

        if (game.rnd.integerInRange(0,20) === 0) {
            var meteor = createMeteor();
            meteor.speedX = -(game.rnd.integerInRange(5, 25) * percent);
            meteor.speedY = (game.rnd.integerInRange(-10, 10) * percent);
            meteors.push(meteor);
        }

        updateMeteors();
        controlShip();

        function controlShip() {
            if(keys.shift.isDown) {
                dt = dt*3;
            }

            if(keys.up.isDown && ship.y > 0) {
                ship.y -= SPEED * dt;
            }

            if(keys.down.isDown && ship.y < HEIGHT-ship.height) {
                ship.y += SPEED * dt;
            }

            if(keys.left.isDown && ship.x > 0) {
                ship.x -= SPEED * dt;
            }

            if(keys.right.isDown && ship.x < WIDTH-ship.width) {
                ship.x += SPEED * dt;
            }
        }

        function updateMeteors() {
            for(var i = meteors.length - 1; i >= 0; i--) {
                meteors[i].update(dt);
                if(!meteors[i].visible)
                    meteors.splice(i,1);
            }
        }
    }

    function createMeteor(){
        var meteor;
        meteor = {
            sprite: game.add.sprite(game.world.width, game.rnd.integerInRange(0, HEIGHT), 'meteor'),
            scale: (game.rnd.integerInRange(5,15)*1.0/10.0),
            speedX: 0,
            speedY: 0,
            visible: true,
            crashed: false,
            update: function(dt) {
                this.sprite.x += this.speedX * dt;
                this.sprite.y += this.speedY * dt;
                if (this.sprite.x < 0 - this.sprite.width) {
                    this.visible = false;
                    this.sprite.kill();
                }

                if (this.sprite.overlap(ship) && !this.crashed) {
                    var x = this.sprite.x;
                    var y = this.sprite.y;
                    this.sprite.kill();
                    this.sprite = game.add.sprite(x, y, 'animation');
                    meteor.sprite.scale.x = meteor.scale;
                    meteor.sprite.scale.y = meteor.scale;
                    this.sprite.animations.add('animation');
                    this.sprite.animations.play('animation', 60, false, true);
                    this.crashed = true;
                }
            }
        };
        meteor.sprite.scale.x = meteor.scale;
        meteor.sprite.scale.y = meteor.scale;

        return meteor;
    }
}