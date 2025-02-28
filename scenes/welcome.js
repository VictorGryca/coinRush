
// Definindo a cena principal do jogo usando a biblioteca Phaser
export default class Welcome extends Phaser.Scene {

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

  // Carrega a imagem de fundo
  this.load.image("fundo", "../assets/diversos/FUNDO.png");
    
  // Carrega a imagem do botão
  this.load.image("botao", "../assets/diversos/BOTAO.png");

  }

  create(){
      // Adiciona a imagem de fundo
      this.cidadeBg = this.add.image(0, 0, "fundo").setOrigin(0, 0);
  
      // Calcula a escala necessária para cobrir toda a tela
      let scaleX = this.cameras.main.width / this.cidadeBg.width;
      let scaleY = this.cameras.main.height / this.cidadeBg.height;
      let scale = Math.min(scaleX, scaleY); // Usa o menor valor para garantir que a imagem seja exibida inteira
  
      // Aplica a escala e fixa a imagem de fundo
      this.cidadeBg.setScale(scale).setScrollFactor(0);
  
      // Adiciona a imagem do botão com escala inicial de 0.2
      const botao = this.add.image(
        this.cameras.main.width / 2 - 11, // Posição X (centro da tela)
        this.cameras.main.height / 2 + 12, // Posição Y (centro da tela)
        "botao" // Chave da imagem do botão
      ).setOrigin(0.5).setScale(1); // Define a escala inicial como 0.2
  
      // Torna o botão interativo
      botao.setInteractive();
  
      // Adiciona efeitos visuais ao passar o mouse sobre o botão
      botao.on("pointerover", () => {
        botao.setScale(1.2); // Aumenta ligeiramente o tamanho do botão
      });
  
      botao.on("pointerout", () => {
        botao.setScale(1); // Volta ao tamanho original
      });
  
      // Adiciona o evento de clique no botão
      botao.on("pointerdown", () => {
        this.scene.start("jogo"); // Muda para a cena2
  
          console.log("jogo carregado!");
        
        
  
  
      });

  }

  // update(){

  // }
  


}