class Juego extends Phaser.Scene {
    constructor() {
        super('Juego');
    }

    init() {
        this.puntos = 0;
        this.txtPuntos;
    }

    preload() {
        this.load.image('fondo', '../img/fondo.svg');
        this.load.spritesheet('robot', '../img/robot.svg', { frameWidth: 50, frameHeight: 63 });
        this.load.image('tubo-abajo', '../img/pilar-abajo.svg');
        this.load.image('tubo-arriba', '../img/pilar-arriba.svg');
        this.load.image('score', '../img/score-container.svg');
    }

    create() {
        this.background = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2 - 7, 'fondo').setScrollFactor(0);
        this.add.image(this.sys.game.canvas.width / 2 - 100, this.sys.game.canvas.height / 2 - 260, 'score');
        this.puntos = -1;
        this.txtPuntos = this.add.text(this.sys.game.canvas.width / 2 - 110, this.sys.game.canvas.height / 2 - 280, '0', { font: "32px Telefonica-Bold", fill: "#5CB615", align: "center" });
        this.add.text(this.sys.game.canvas.width / 2 - 165, this.sys.game.canvas.height / 2 - 250, 'Puntaje', { font: "14px Telefonica-Regular", fill: "#86888C", align: "center" });
        this.player = this.physics.add.sprite(50, 100, 'robot');
        this.anims.create({
            key: 'volar',
            frames: this.anims.generateFrameNumbers('robot', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1,
        });

        this.player.play('volar');

        this.input.keyboard.on('keydown', (event) => {
            if (event.keyCode === 32) {
                this.saltar();
            }
        });

        this.anims.create({
            key: 'saltar',
            frames: this.anims.generateFrameNumbers('robot', { start: 0, end: 0.5 }),
            frameRate: 10,
            repeat: 1,
        });

        this.input.on('pointerdown', () => this.saltar());

        this.player.on('animationcomplete', this.animationComplete, this);

        this.nuevaColumna();

        this.physics.world.on('worldbounds', (body) => {
            this.hitColumna();
        });

        this.player.setCollideWorldBounds(true);
        this.player.body.onWorldBounds = true;
    }

    update(time) {
        this.background.tilePositionX -= 1;
    }


    animationComplete(animation, frame, sprite) {
        if (animation.key === 'saltar') {
            this.player.play('volar');
        }
    }

    saltar() {
        this.player.setVelocityY(-200);
        this.player.play('saltar');
    }

    nuevaColumna() {
        //Una columna es un grupo de cubos
        const columna = this.physics.add.group();
        //Cada columna tendrá un hueco (zona en la que no hay cubos) por dónde pasará el super héroe
        const hueco = Math.floor(Math.random() * 5) + 1;
        const tuboArribaY = Phaser.Math.Between(-120, 120);
        for (let i = 0; i < 10; i++) {
            //El hueco estará compuesto por dos posiciones en las que no hay cubos, por eso ponemos hueco +1
            if (i !== hueco && i !== hueco + 1 && i !== hueco - 1) {
                let cubo;
                if (i == hueco - 2) {
                    cubo = columna.create(370, tuboArribaY, 'tubo-arriba');
                } else {
                    cubo = columna.create(370, tuboArribaY + 620, 'tubo-abajo');
                }
                cubo.body.allowGravity = false;
            }
        }

        this.puntos += 1;
        this.txtPuntos.text = this.puntos;

        columna.setVelocityX(-200);
        //Detectaremos cuando las columnas salen de la pantalla...
        columna.checkWorldBounds = true;
        //... y con la siguiente línea las eliminaremos
        columna.outOfBoundsKill = true;
        //Cada 1000 milisegundos llamaremos de nuevo a esta función para que genere una nueva columna
        this.time.delayedCall(1500, this.nuevaColumna, [], this);
        this.physics.add.overlap(this.player, columna, this.hitColumna, null, this);
    }

    hitColumna() {
        this.scene.start('GameOver', { score: this.puntos });
    }
}

export default Juego;