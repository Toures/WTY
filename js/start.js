/**
 * Created by Thea on 15.07.15.
 */

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'dogtoaster', { preload: preload, create: create,
    update: update, render: render });

var dog;
var keys;

function preload(){
    //game.load.image('hund','assets/hund.png');
    /*
    game.load.image('left','assets/hund.png');
    game.load.image('right','assets/hund.png');
    game.load.image('up','assets/hund.png');
    game.load.image('down','assets/hund.png');
    */

    game.load.image('hintergrund','assets/crappyStarfield.png');
    //game.load.image('spiegel','assets/spiegel.png');
    //game.load.image('buttonLinks','assets/buttonLinks.png');
    //game.load.image('buttonRechts','assets/buttonRechts.png');
    //game.load.image('toast','assets/toast.png');
    game.load.image('kristall','assets/kristall.png');
    //game.load.image('ursprung','assets/ursprung.png');
    //game.load.image('hindernis','assets/hindernis.png');
}

function create(){
    game.physics.startSystem(Phaser.Physics.ARCADE);
    //game.add.sprite(0,0,'hintergrund');
    var k = game.add.sprite(64,64,'kristall');
    k.scale.x = 1;
    k.scale.y = 1;

}

function update(){
    /*
    //dog.body.velocity.set(0);

    controlDog();

    function controlDog() {


        //bewegung
        if(keys.up.isDown) {
            dog.body.velocity.y  = -dogVelocity;
            dog.play('up');
        }

        else if(keys.down.isDown ) {
            dog.body.velocity.y = dogVelocity;
            dog.play('down');
        }

        else if(keys.left.isDown) {
            dog.body.velocity.x = -dogVelocity;
            dog.play('left');
        }

        else if(keys.right.isDown ) {
            dog.body.velocity.x = dogVelocity;
            dog.play('right');
        }
        else {
            //player.animations.stop();
        }
    }
*/

}

function render(){

}