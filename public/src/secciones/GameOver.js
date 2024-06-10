class GameOver extends Phaser.Scene {
    constructor() {
        super('GameOver');
    }

    init(data) {
        this.puntos = data.score;
        this.highScore = 0;
    }
    preload() {
        this.load.image('perdiste', '../img/perdiste.svg');
        this.load.image('high-score', '../img/high-score.svg');
        this.load.image('puntaje', '../img/puntaje.svg');
        this.load.image('volver-jugar', '../img/volver-jugar.svg');
        this.load.image('volver-inicio', '../img/volver-inicio.svg');
        this.load.image('premios', '../img/premios.svg');
    }

    create() {
        this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'perdiste');
        this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2 - 100, 'high-score');
        this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'puntaje');

        this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2 + 130, 'volver-jugar')
            .setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                this.iniciarJuego();
            });

        this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2 + 200, 'volver-inicio')
            .setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                this.volverInicio();
            });

        const key = 'puntos'; // Cambiar por el dato del usuario que corresponda
        this.mejorPuntaje = parseInt(localStorage.getItem(key), 10);

        if (this.mejorPuntaje) {
            if (this.mejorPuntaje < this.puntos) {
                localStorage.setItem(key, this.puntos);
                this.highScore = this.puntos;
            } else {
                this.highScore = this.mejorPuntaje;
            }
        } else {
            localStorage.setItem(key, this.puntos);
            this.highScore = this.puntos;
        }

        this.add.text(this.sys.game.canvas.width / 2 - 15, this.sys.game.canvas.height / 2 - 130, this.highScore.toString(), { font: "32px Telefonica-Bold", fill: "#FFFFFF", align: "center" });

        this.add.text(this.sys.game.canvas.width / 2 - 15, this.sys.game.canvas.height / 2 - 30, this.puntos.toString(), { font: "32px Telefonica-Bold", fill: "#5CB615", align: "center" });

        this.add.text(this.sys.game.canvas.width / 2 - 91, this.sys.game.canvas.height / 2 + 60, "Todos pueden ganar", { font: "14px Telefonica-Regular", fill: "#86888C", align: "center" });

        this.add.image(this.sys.game.canvas.width / 2 + 60, this.sys.game.canvas.height / 2 + 70, 'premios')
            .setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                this.volverInicio();
            });
    }

    update() { }

    iniciarJuego() {
        this.scene.start('Juego');
    }

    volverInicio() {
        parent.postMessage({
            sec: 'jhframepass',
            location: location.href,
            evt: 'volverInicio'
          }, '*');
    }


}

export default GameOver;