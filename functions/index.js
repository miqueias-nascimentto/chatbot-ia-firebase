// O SDK do Firebase Functions para criar funções de Cloud e configurar os triggers
const functions = require('firebase-functions/v1');

// O SDK Admin do Firebase para acessar o Firestore
const admin = require('firebase-admin');
admin.initializeApp();

// Função HTTP que recebe o parâmetro 'text' e o insere no Firestore
exports.addMessage = functions.https.onRequest(async (req, res) => {
  // Pega o parâmetro 'text' passado na requisição HTTP
  const original = req.query.text;

  try {
    // Insere a mensagem original no Firestore
    const writeResult = await admin.firestore().collection('messages').add({ original: original });

    // Retorna um JSON com a confirmação de que a mensagem foi inserida
    res.json({ result: `Message with ID: ${writeResult.id} added.` });
  } catch (error) {
    // Em caso de erro, retorna uma mensagem de erro
    res.status(500).json({ error: error.message });
  }
});

// Trigger do Firestore que escuta novos documentos e cria a versão em maiúsculas da mensagem
exports.makeUppercase = functions.firestore.document('/messages/{documentId}').onCreate((snap, context) => {
  // Pega o valor original da mensagem
  const original = snap.data().original;

  // Log para depuração
  functions.logger.log('Uppercasing', context.params.documentId, original);

  // Cria a versão em maiúsculas da mensagem
  const uppercase = original.toUpperCase();

  // Retorna uma Promise que atualiza o documento com a versão em maiúsculas
  return snap.ref.set({ uppercase }, { merge: true });
});export default {
  env: {
    es6: true,
    node: true,
  },
  parserOptions: {
    "ecmaVersion": 2018,
  },
  extends: [
    "eslint:recommended",
    "google",
  ],
  rules: {
    "no-restricted-globals": ["error", "name", "length"],
    "prefer-arrow-callback": "error",
    "quotes": ["error", "double", { "allowTemplateLiterals": true }],
  },
  overrides: [
    {
      files: ["**/*.spec.*"],
      env: {
        mocha: true,
      },
      rules: {},
    },
  ],
  globals: {},
};

