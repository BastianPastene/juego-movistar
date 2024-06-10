// IMPORTAR LA PRIMERA ESCENA
import Juego from './secciones/Juego.js'
import Intro from './secciones/Intro.js'
import GameOver from './secciones/GameOver.js';

const config = {

    // OPCIONALES
    // title: '',
    // url: '',
    // version: '',

    // OPCIONAL
    // REMARCAR LOS PIXELES DE LAS IMAGENES
    pixelArt: false,

    // OBLIGATORIO
    type: Phaser.WEBGL, // WEBGL O CANVAS O AUTOMATICO
    backgroundColor: '#0B2739', // FONDO DEL LIENZO
    scale: {
        width: 370, // TAMAÑO DEL LIENZO
        height: 640,
        parent: 'container', // ID DEL CONTENEDOR
        mode: Phaser.Scale.FIT,
        // autoCenter: Phaser.Scale.CENTER_BOTH
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
    },

    // INFORMACIÓN DE LA CONSOLA
    banner: {
        hidePhaser: true, // OCULTAR TEXTO DE PHASER EN CONSOLA
        text: '#000000', // CAMBIAR COLOR DEL TEXTO DEL TITULO DEL JUEGO EN CONSOLA
         // PALETA DE COLORES DE ADORNO EN CONSOLA
        background: [
            'red',
            'yellow',
            'red',
            'transparent'
        ]
       
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },

    //ESCENAS DEL JUEGO
    scene: [
        Intro,
        Juego,
        GameOver
        ]

};


// CREAR LA INSTANCIA DEL JUEGO
const game = new Phaser.Game(config);


