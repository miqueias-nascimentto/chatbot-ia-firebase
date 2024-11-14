const functions = require("firebase-functions");
const dialogflow = require("dialogflow");

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(async (request, response) => {
  
  const sessionClient = new dialogflow.SessionsClient();
 
  const sessionPath = sessionClient.projectAgentSessionPath("chatbot-ia-49080", "uma-sessao-unica"); 

  const requestText = request.body.queryResult.queryText;

 
  const requestDialogflow = {
    session: sessionPath,
    queryInput: {
      text: {
        text: requestText,
        languageCode: "pt-BR",
      },
    },
  };

  
  const responses = await sessionClient.detectIntent(requestDialogflow);
  const result = responses[0].queryResult;

  
  response.send({
    fulfillmentText: result.fulfillmentText,
  });
})