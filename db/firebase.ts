import { applicationDefault } from 'firebase-admin/app';

var admin = require('firebase-admin');

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: applicationDefault(),
    databaseURL: `https://${process.env.DATABASE_NAME}.${process.env.REGION}.firebasedatabase.app`,
  });
}

const db = admin.database();

export { db }