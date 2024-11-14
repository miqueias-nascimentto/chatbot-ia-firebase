import * as functions from "firebase-functions/v1";
import admin from "firebase-admin";

admin.initializeApp();

export const addMessage = functions.https.onRequest(async (req, res) => {
  const original = req.query.text;

  try {
    const writeResult = await admin.firestore().collection("messages").add({ original: original });
    res.json({ result: `Message with ID: ${writeResult.id} added.` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export const makeUppercase = functions.firestore.document("/messages/{documentId}").onCreate((snap, context) => {
  const original = snap.data().original;
  functions.logger.log("Uppercasing", context.params.documentId, original);

  const uppercase = original.toUpperCase();
  return snap.ref.set({ uppercase }, { merge: true });
});
