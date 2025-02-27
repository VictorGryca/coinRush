
// Definindo a cena principal do jogo usando a biblioteca Phaser
class welcome extends Phaser.Scene {

  // Construtor da cena
  constructor() {
      super({
          key: 'welcome',
          // Configurações específicas da cena podem ser adicionadas aqui
          /* physics: {
             arcade: {
              debug: false,
              gravity: { y: 500 }
             } 
          } */
      });
  }

  preload(){

  // Carrega a imagem do terreno
  this.load.image('fase', '../assets/estrutura/terreno/Terrain (16x16).png');
  // Carrega o arquivo JSON do mapa de tiles
  this.load.tilemapTiledJSON('tilefase', '../assets/estrutura/terreno/fase.json');
  // Carrega a imagem de fundo
  this.load.image('background', '../assets/estrutura/background/Purple.png');

  }

  create(){
    // Cria o mapa de tiles a partir do JSON carregado
  const map = this.make.tilemap({ key: 'tilefase' });
  // Adiciona as imagens dos tilesets ao mapa
  const tileset = map.addTilesetImage('fase1', 'fase');
  const bg = map.addTilesetImage('bg', 'background');

  map.createLayer('bg', bg);
  map.createLayer('fase1', tileset);
  


  }

  // update(){

  // }
  


}