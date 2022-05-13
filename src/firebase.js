import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import env from "react-dotenv";

const firebaseConfig = {
  apiKey: env.API_KEY,
  authDomain: "switch-database-25a62.firebaseapp.com",
  projectId: "switch-database-25a62",
  storageBucket: "switch-database-25a62.appspot.com",
  messagingSenderId: "42922575747",
  appId: "1:42922575747:web:0a0b2548d6c9a5ac8218b6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;

