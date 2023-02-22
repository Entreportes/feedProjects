import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: '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',
  organization: 'org-HGPvqXrCggEGWu7RBg32NLVq',
  

});

// Crie uma instância do cliente OpenAI
const openAI = new OpenAIApi(configuration);
export {openAI}
// // Parâmetros para a solicitação
// const prompt = 'Escreva três posts sobre o tema contabilidade, cada um com no máximo 500 caracteres:';
// const maxTokens = 500;
// const n = 3;
// const engine = 'text-davinci-002';
// const temperature = 0.7;

// // Chame o método Completion.create() para gerar o texto
// openAI.createCompletion({
//   prompt,
//   max_tokens: maxTokens,
//   n: n,
//   model: engine,
//   temperature: temperature
// }).then((response: any) => {
//   const choices = response.choices;

//   // Itere sobre as escolhas e imprima o texto gerado
//   for (let i = 0; i < choices.length; i++) {
//     console.log(`Post ${i+1}: ${choices[i].text}`);
//   }
// }).catch((error: any) => {
//   console.log(error);
// });
