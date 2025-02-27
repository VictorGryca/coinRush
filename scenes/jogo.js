
// Definindo a cena principal do jogo usando a biblioteca Phaser
class jogo extends Phaser.Scene {

  // Construtor da cena
  constructor() {
      super({
          key: 'jogo',
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
  this.load.tilemapTiledJSON('tilefase', '../assets/estrutura/terreno/fase2.json');
  
  }

  create(){
    // Cria o mapa de tiles a partir do JSON carregado
  const map = this.make.tilemap({ key: 'tilefase' });
  // Adiciona as imagens dos tilesets ao mapa
  const tileset = map.addTilesetImage('tiles', 'fase');

  map.createLayer('camada1', tileset);


  }

  // update(){

  // }
  


}