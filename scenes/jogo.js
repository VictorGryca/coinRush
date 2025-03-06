export default class Jogo extends Phaser.Scene {
  constructor() {
    super({ key: 'jogo' });

    // Inicializa o contador de moedas coletadas
    this.contadorMoedas = 0;
  }

  // Precarregamento de assets do jogo
  preload() {
    this.load.atlas('fighter', '../assets/personagem/fighter2.png', '../assets/personagem/fighter2.json');
    this.load.image('fase', '../assets/estrutura/terreno/Terrain (16x16).png');
    this.load.tilemapTiledJSON('tilefase', '../assets/estrutura/terreno/fase2.json');
    this.load.image('moeda', '../assets/icon/coletaveis/coin.png');
  }


  create() {
    this.animacao(); // Configura as animações do personagem

    // Criação do mapa do jogo
    const map = this.make.tilemap({ key: 'tilefase' });
    const tileset = map.addTilesetImage('tiles', 'fase');
    const ground = map.createLayer('camada1', tileset);
    ground.setCollisionByProperty({ collides: true });
    this.matter.world.convertTilemapLayer(ground);

    // Criação do personagem e suas propriedades
    this.fighter = this.matter.add.sprite(125, 200, 'fighter').setScale(0.5).setFixedRotation();
    this.fighter.play('pulo', true);
    this.cursors = this.input.keyboard.createCursorKeys();

    // Criar grupo para armazenar as moedas
    this.moedas = this.add.group();
    this.spawnMoedas(); // Gera moedas no jogo

    // Texto na tela para exibir o número de moedas coletadas
    this.textoMoedas = this.add.text(50, 32, 'Moedas: 0', { fontSize: '20px', fill: '#fff' });

    // Ativar o modo debug para exibir coordenadas do personagem
    this.debugMode = false;
    if (this.debugMode) {
      this.debugText = this.add.text(16, 40, '', { fontSize: '16px', fill: '#0f0' });
    }

    // Texto de objetivo para o jogador
    this.textoObjetivo = this.add.text(240, 50, 'Obtenha 15 moedas', {
      fontSize: '24px',
      fill: '#fff'
    });

    // Iniciar respawn automático das moedas a cada 1 segundo
    this.time.addEvent({
      delay: 1000, // 1 segundo
      callback: this.spawnMoedas,
      callbackScope: this,
      loop: true // Faz o evento repetir continuamente
    });

    // Detectar colisões entre o personagem e as moedas
    this.matter.world.on("collisionstart", function (event) {
      const pairs = event.pairs;
      pairs.forEach(pair => {
        this.moedas.getChildren().forEach(moeda => {
          if ((pair.bodyA === this.fighter.body && pair.bodyB === moeda.body) || 
              (pair.bodyB === this.fighter.body && pair.bodyA === moeda.body)) {
            this.coletarMoeda(moeda); // Coleta a moeda quando o personagem colide com ela
          }
        });
      });
    }, this);
  }

  // Configuração das animações do personagem
  animacao() {
    this.anims.create({
      key: 'idle',
      frameRate: 5,
      frames: this.anims.generateFrameNames('fighter', { start: 0, end: 5, prefix: 'fighterIdle', suffix: '.png' }),
      repeat: -1
    });

    this.anims.create({
      key: 'andando',
      frameRate: 15,
      frames: this.anims.generateFrameNames('fighter', { start: 0, end: 7, prefix: 'fighterRun', suffix: '.png' }),
      repeat: -1
    });

    this.anims.create({
      key: 'pulo',
      frameRate: 10,
      frames: this.anims.generateFrameNames('fighter', { start: 0, end: 9, prefix: 'fighterJump', suffix: '.png' }),
      repeat: -1
    });
  }

  // Função que gera uma nova moeda aleatoriamente em uma das posições predefinidas
  spawnMoedas() {
    const posicoes = [
      { x: 256, y: 384 },
      { x: 362, y: 336 },
      { x: 489, y: 272 },
      { x: 565, y: 208 },
      { x: 644, y: 144 }
    ];
  
    // Escolhe uma posição aleatória da lista para spawnar a moeda
    const pos = Phaser.Utils.Array.GetRandom(posicoes);
  
    let moeda = this.matter.add.sprite(pos.x, pos.y - 20, 'moeda').setScale(0.1);
  
    // Define a hitbox da moeda como circular para colisões mais naturais
    moeda.setCircle(moeda.width / 2 * 0.1);
    moeda.setBounce(0.5);
    moeda.setFriction(0.2);
    moeda.setData('coletavel', true);
  
    this.moedas.add(moeda); // Adiciona a moeda ao grupo de moedas
  }

  // Função chamada quando uma moeda é coletada pelo personagem
  coletarMoeda(moeda) {
    moeda.destroy(); // Remove a moeda do jogo
    this.contadorMoedas++; // Incrementa o contador de moedas coletadas
    this.textoMoedas.setText('Moedas: ' + this.contadorMoedas);

    // Se o jogador coletar 15 moedas, reinicia o contador e muda para a cena "welcome"
    if (this.contadorMoedas >= 15) {
      this.contadorMoedas = 0;
      this.scene.start('welcome');
    }
  }


  update() {
    const velocidadeMovimento = 2;

    // Controles de movimentação do personagem
    if (this.cursors.left.isDown) {
      this.fighter.setVelocityX(-velocidadeMovimento);
      this.fighter.play('andando', true);
      this.fighter.flipX = true; // Vira o personagem para a esquerda
    } else if (this.cursors.right.isDown) {
      this.fighter.setVelocityX(velocidadeMovimento);
      this.fighter.play('andando', true);
      this.fighter.flipX = false; // Vira o personagem para a direita
    } else {
      this.fighter.setVelocityX(0);
      this.fighter.play('idle', true);
    }

    // Permitir pulo apenas se o personagem estiver no chão
    if (this.cursors.up.isDown && this.fighter.body.velocity.y === 0) {
      this.fighter.setVelocityY(-8);
    }

    // Se o personagem cair muito, reposicioná-lo no início
    if (this.fighter.y >= 480) {
      this.fighter.x = 125;
      this.fighter.y = 300;
    }

    // Atualiza as coordenadas do personagem na tela, se o modo debug estiver ativado
    if (this.debugMode) {
      this.debugText.setText(`X: ${Math.floor(this.fighter.x)}, Y: ${Math.floor(this.fighter.y)}`);
    }
  }
}
