// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBBYvMMxTmIIxRQcS_3MWf_BV2jrOIjILc",
  authDomain: "debuggingaiagent.firebaseapp.com",
  projectId: "debuggingaiagent",
  storageBucket: "debuggingaiagent.firebasestorage.app",
  messagingSenderId: "346610902903",
  appId: "1:346610902903:web:59b8c5fc371530a0e1a372",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
