var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {
    game.load.image('arrow', 'assets/spaceship.png');
    game.load.image('background','assets/crappyStarfield.png');
}

var sprite;
var spritex;
var spriteY;
var graphics;

function create() {
    spritex = game.add.sprite(200,200,'arrow');
    game.physics.enable(spritex, Phaser.Physics.ARCADE);
    spritex.body.immovable = true;
    spritex.anchor.set(0.5);
    spritex.angle = -135;
    spritex.body.setSize(10,10);

    spritey = game.add.sprite(200,500,'arrow');
    game.physics.enable(spritey, Phaser.Physics.ARCADE);
    spritey.body.immovable = true;
    spritey.anchor.set(0.5);
    spritey.angle = -45;
    spritey.body.setSize(20,20);

    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  Click on the left or right of the game to shoot the space ship in that direction

    game.stage.backgroundColor = '#124184';

    graphics = game.add.graphics(0, 0);
    starteGraphicsNeu();

    sprite = game.add.sprite(100, 200, 'arrow');
    sprite.scale.set(0.001);
    sprite.anchor.set(0);

    game.physics.enable(sprite, Phaser.Physics.ARCADE);

    sprite.body.collideWorldBounds = true;
    sprite.body.bounce.set(0.8);

    launch();

    game.input.onDown.add(starteGraphicsNeu, this);

}

function starteGraphicsNeu(){
    graphics.clear();
    //beginFill(color, alpha)
    graphics.beginFill(0x00FF00,1);
    //lineStyle(lineWidth, color, alpha);
    graphics.lineStyle(1, 0x0000FF, 1);
}

function launch() {
    sprite.body.velocity.setTo(100, 0);
}

function update() {

    if(sprite.x<0||sprite.y<0||sprite.x>game.world.width||sprite.y>game.world.height){
        sprite.body.velocity.setTo(0,0);
    }else{
        graphics.drawRect(sprite.x, sprite.y, 1, 1);
    }

    sprite.rotation = sprite.body.angle;



    game.physics.arcade.collide(spritex, sprite,colised);
    game.physics.arcade.collide(spritey, sprite,colised2);


}
function colised(s1,s2){
    s2.body.velocity.setTo(0,100);
    var background = game.add.sprite(0,0,'background');
}
function colised2(s1,s2){
    s2.body.velocity.setTo(-100,0);
}
function render() {

    //game.debug.bodyInfo(sprite, 32, 32);
    game.debug.body(spritex);
    game.debug.body(spritey);
}