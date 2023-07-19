import * as Speech from "expo-speech"
export const startRecognizing = async () => {
    try {
      await Speech.startListeningAsync(); // Inicia a captura da voz
      Speech.addListener(this.onSpeechRecognized); // Adiciona um listener para os resultados da fala
    } catch (error) {
      console.error(error); // Tratamento de erro ao iniciar a captura da voz
    }
  }
  
  export const stopRecognizing = async () => {
    try {
      Speech.stopListeningAsync(); // Encerra a captura da voz
      Speech.removeListener(this.onSpeechRecognized); // Remove o listener dos resultados da fala
    } catch (error) {
      console.error(error); // Tratamento de erro ao encerrar a captura da voz
    }
  }
  
 export const    onSpeechRecognized = (event) => {
    if (event.error) {
      console.error(event.error); // Erro durante a captura da voz
    } else if (event.results) {
      const transcription = event.results[0].transcript; // Texto transcrito da fala
      console.log(transcription);
      return {transcription};
    }
  }
  