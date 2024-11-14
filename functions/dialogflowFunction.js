const functions = require("firebase-functions");
const dialogflow = require("dialogflow");

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(async (request, response) => {
  // Crie um novo cliente Dialogflow
  const sessionClient = new dialogflow.SessionsClient();
  // ID do projeto no Dialogflow
  const sessionPath = sessionClient.projectAgentSessionPath("chatbot-ia-49080", "uma-sessao-unica"); 

  // Obtenha o texto da solicitação
  const requestText = request.body.queryResult.queryText;

  // Crie uma nova solicitação de detecção de intenção
  const requestDialogflow = {
    session: sessionPath,
    queryInput: {
      text: {
        text: requestText,
        languageCode: "pt-BR",
      },
    },
  };

  // Envie a solicitação para o Dialogflow
  const responses = await sessionClient.detectIntent(requestDialogflow);
  const result = responses[0].queryResult;

  // Envie a resposta do Dialogflow para o usuário
  response.send({
    fulfillmentText: result.fulfillmentText,
  });
});