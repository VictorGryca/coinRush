// Definição da cena de boas-vindas do jogo usando a biblioteca Phaser
export default class Welcome extends Phaser.Scene {

  // Construtor da cena
  constructor() {
      super({
          key: 'welcome', // Identificador da cena
      });
  }

  // Método para carregar os arquivos de mídia antes da cena ser criada
  preload() {
    // Carrega a imagem de fundo da tela inicial
    this.load.image("fundo", "../assets/diversos/FUNDO.png");

    // Carrega a imagem do botão de iniciar o jogo
    this.load.image("botao", "../assets/diversos/BOTAO.png");
  }

  // Método que cria os elementos da cena
  create() {
    // Adiciona a imagem de fundo na posição (0,0) com origem no canto superior esquerdo
    this.quadro = this.add.image(0, 0, "fundo").setOrigin(0, 0);

    // Ajusta a escala do fundo para cobrir toda a tela corretamente
    let scaleX = this.cameras.main.width / this.quadro.width;
    let scaleY = this.cameras.main.height / this.quadro.height;
    let scale = Math.min(scaleX, scaleY); // Usa o menor valor para manter a proporção da imagem

    this.quadro.setScale(scale).setScrollFactor(0); // Aplica a escala e impede que a imagem role com a câmera

    // Adiciona o botão centralizado na tela
    const botao = this.add.image(
      this.cameras.main.width / 2 - 11,  // Posição X (centro da tela)
      this.cameras.main.height / 2 + 12, // Posição Y (centro da tela)
      "botao" // Chave da imagem carregada no preload
    ).setOrigin(0.5).setScale(1); // Centraliza o botão e define a escala inicial

    // Torna o botão interativo para detectar eventos do usuário
    botao.setInteractive();

    // Efeito visual ao passar o mouse sobre o botão
    botao.on("pointerover", () => {
      botao.setScale(1.2); // Aumenta o botão ligeiramente
    });

    botao.on("pointerout", () => {
      botao.setScale(1); // Retorna ao tamanho original quando o mouse sai
    });

    // Evento de clique no botão para iniciar o jogo
    botao.on("pointerdown", () => {
      this.scene.start("jogo"); // Muda para a cena do jogo
      console.log("Jogo carregado!"); // Exibe uma mensagem no console para depuração
    });
  }
}
