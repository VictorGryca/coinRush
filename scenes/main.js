// Importação das cenas do jogo
import Welcome from './welcome.js';
import Jogo from './jogo.js';

// Configuração inicial do jogo usando Phaser
const config = {
    type: Phaser.AUTO, // Seleciona automaticamente entre WebGL e Canvas, dependendo da compatibilidade do navegador

    width: 720,  // Largura fixa do jogo
    height: 480, // Altura fixa do jogo

    scale: {
        mode: Phaser.Scale.ENVELOP,        // Ajusta automaticamente o jogo para caber na janela sem distorcer
        autoCenter: Phaser.Scale.CENTER_BOTH // Centraliza o jogo na tela
    },

    physics: {
        default: "matter", // Utiliza o sistema de física Matter.js para detecção de colisões e movimentação realista
        matter: {
            debug: false // Desativa o modo de depuração da física para evitar informações desnecessárias na tela
        }
    },

    parent: "game", // Define o elemento HTML onde o jogo será renderizado

    dom: {
        createContainer: true, // Habilita a criação de elementos DOM dentro do jogo (útil para inputs ou HUDs)
    },

    scene: [Jogo, Welcome] // Define as cenas disponíveis no jogo
};

// Criação da instância do jogo com base na configuração acima
var game = new Phaser.Game(config);

// Inicia a cena "welcome" como a primeira tela exibida ao jogador
game.scene.start('welcome');
