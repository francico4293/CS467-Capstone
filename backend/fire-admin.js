const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const { getAuth } = require('firebase-admin/auth');


const serviceAccount = process.env.GOOGLE_CREDENTIALS;

initializeApp({
  credential: cert(JSON.parse(serviceAccount))
});

const auth = getAuth();
const db = getFirestore();

module.exports = {auth, db};