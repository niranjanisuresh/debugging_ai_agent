import React from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import './Login.css';

function Login() {
  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await setDoc(
        doc(db, 'users', user.uid),
        {
          name: user.displayName,
          email: user.email,
          role: 'user',
        },
        { merge: true }
      );
    } catch (error) {
      console.error('Login failed:', error);
      alert('Oops! Something went wrong. Check the console for details.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo-brand">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
            height="40" width="40">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
          </svg>
          <h1>Crash IQ</h1>
        </div>
        <p className="tagline">Real-time error tracking and insights</p>
        <button className="login-btn" onClick={loginWithGoogle}>
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default Login;
