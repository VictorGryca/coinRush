
// Definindo a cena principal do jogo usando a biblioteca Phaser
export default class Jogo extends Phaser.Scene {

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
  // Carrega o atlas do personagem com suas imagens e dados de animação
  this.load.atlas('chris', '../assets/chris/chris.png', '../assets/chris/chris.json');

  // Carrega a imagem do terreno
  this.load.image('fase', '../assets/estrutura/terreno/Terrain (16x16).png');
  // Carrega o arquivo JSON do mapa de tiles
  this.load.tilemapTiledJSON('tilefase', '../assets/estrutura/terreno/fase2.json');
  
  }

  create(){

  // Define as animações do personagem (idle, andando e pulo)
  this.animacao = () => {
    this.anims.create({
      key: 'idle',
      frames: [{ key: 'chris', frame: 'respirando1.png' }]
    });
    this.anims.create({
      key: 'andando',
      frameRate: 10,
      frames: this.anims.generateFrameNames('chris', { start: 1, end: 2, prefix: 'andada', suffix: '.png' }),
      repeat: -1
    });
    this.anims.create({
      key: 'pulo',
      frameRate: 10,
      frames: this.anims.generateFrameNames('chris', { start: 0, end: 8, prefix: 'pulo', suffix: '.png' }),
      repeat: -1
    });
  };
  this.animacao();

    // Cria o mapa de tiles a partir do JSON carregado
  const map = this.make.tilemap({ key: 'tilefase' });
  // Adiciona as imagens dos tilesets ao mapa
  const tileset = map.addTilesetImage('tiles', 'fase');

  const ground = map.createLayer('camada1', tileset);
  //const ground = map.createLayer('ground', tileset)

  // Adiciona o personagem principal à cena com escala reduzida e rotação fixa
  this.chris = this.matter.add.sprite(125, 200, 'chris').setScale(0.25).setFixedRotation();
  // Inicia a animação de pulo para o personagem
  this.chris.play('pulo', true);

  // Captura as teclas de seta para controlar o personagem
  this.cursors = this.input.keyboard.createCursorKeys();

  
  ground.setCollisionByProperty({ collides: true });
  this.matter.world.convertTilemapLayer(ground);

  
  }

  update(){

  const velocidadeMovimento = 4; // Velocidade horizontal do personagem

  // Movimentação para a esquerda
  if (this.cursors.left.isDown) {
    this.chris.setVelocityX(-velocidadeMovimento);
    this.chris.play("andando", true);
    this.chris.flipX = true;
  }
  // Movimentação para a direita
  else if (this.cursors.right.isDown) {
    this.chris.setVelocityX(velocidadeMovimento);
    this.chris.play("andando", true);
    this.chris.flipX = false;
  }
  // Sem movimento horizontal
  else {
    this.chris.setVelocityX(0);
    this.chris.play("idle", true);
  }

  // Lógica de pulo: se a tecla para cima é pressionada e o personagem está no chão, ele pula
  if (this.cursors.up.isDown && this.chris.body.velocity.y === 0) {
    this.chris.setVelocityY(-8);
  }

  // Enquanto o personagem estiver no ar, a animação de pulo é forçada
  if (this.chris.body.velocity.y !== 0) {
    this.chris.play("pulo", true);
  }

  if(this.chris.y >= 480){
    this.chris.x = 125;
    this.chris.y = 300;
    
  }


  }
  


}