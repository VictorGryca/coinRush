import Welcome from './welcome.js';
import Jogo from './jogo.js';


        // Configuração inicial do jogo usando Phaser com o sistema de física Matter
        const config = {
            type: Phaser.AUTO, // Seleciona automaticamente entre WebGL e Canvas
            width: 720,                  // Resolução base fixa: largura
            height: 480,                 // Resolução base fixa: altura
            scale: {
            mode: Phaser.Scale.FIT,    // Ajusta o jogo para caber na janela mantendo a proporção
            autoCenter: Phaser.Scale.CENTER_BOTH  // Centraliza o canvas na tela
            },
            physics: {
            default: "matter", // Utiliza o sistema de física Matter
            matter: {
                debug: false // Desativa o modo de depuração da física
            }
            },
            parent: "game",
            dom:{
               createContainer: true,
            },
            scene: [Jogo, Welcome]
        };
        
        var game = new Phaser.Game(config);
        game.scene.start('jogo');