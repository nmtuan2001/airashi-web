var admin = require('firebase-admin');

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert({
      project_id: 'airashi-web',
      private_key: process.env.PRIVATE_KEY,
      client_email: process.env.CLIENT_EMAIL,
    }),
    databaseURL: `https://${process.env.DATABASE_NAME}.${process.env.REGION}.firebasedatabase.app`,
  });
}

const db = admin.database();

export { db }