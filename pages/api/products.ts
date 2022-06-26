import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../db/firebase';
import { get, ref } from 'firebase/database';

export default (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req);
  const productsRef = ref(db, 'products');
  console.log(process.env.CLIENT_EMAIL);
  console.log(process.env.DATABASE_NAME);
  get(productsRef).then((snapshot) => {
    if (snapshot.exists()) {
      // fake loading time
      setTimeout(() => {
        res.status(200).json(snapshot.val());
      }, 800);
    } else {
      console.log("No data available.");
    }
  }).catch((error) => {
    console.error(error);
  });
}
