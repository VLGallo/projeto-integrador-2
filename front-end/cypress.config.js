module.exports = {
  e2e: {
    baseUrl: 'http://localhost:3000',  //URL onde o React está rodando antes do deploy
    video: true, // Certifica-se de que a gravação de vídeo está ativada
    videosFolder: 'cypress/videos', // Diretório onde os vídeos serão armazenados 
    setupNodeEvents(on, config) {
      // configurar eventos de node, se necessário
    },
  },
}

