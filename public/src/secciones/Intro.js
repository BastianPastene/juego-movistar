class Intro extends Phaser.Scene {

    preload() {

        this.load.image('fondo', '../img/fondo.svg');
        this.load.image('preparate', '../img/preparate.svg');
        this.load.image('robot-gris', '../img/robot-gris.svg');
        this.load.image('robot-fuego', '../img/robot-fuego.svg');
        this.load.image('boton', '../img/tap.svg');
    }

    create() {
        this.background = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2 - 7, 'fondo');
        this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2 - 250, 'preparate');
        this.add.image(this.sys.game.canvas.width / 2 + 10, this.sys.game.canvas.height / 2 - 125, 'robot-gris');
        this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'robot-fuego');
        this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2 + 200, 'boton')
            .setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                this.iniciarJuego();
            });
    }

    update() {
        this.background.tilePositionX -= 0.05;
     }

    iniciarJuego() {
        this.scene.start('Juego');
    }

}

export default Intro;


