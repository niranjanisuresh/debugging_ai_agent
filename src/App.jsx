import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebaseConfig';
import Login from './components/Login';           // 🔥 make sure this points to the new Login.jsx
import Dashboard from './components/Dashboard';   // your main dashboard component

function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        const ref = doc(db, 'users', u.uid);
        const snap = await getDoc(ref);
        setRole(snap.exists() ? snap.data().role : 'user');
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <p className="centered">Loading...</p>;
  if (!user) return <Login />;
  return <Dashboard role={role} />;
}

export default App;
