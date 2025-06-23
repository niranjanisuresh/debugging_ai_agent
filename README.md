 🚧 Crash Intelligence Dashboard

A real-time monitoring dashboard for visualizing frontend crashes, debugging logs, and crash trends using **React**, **Vite**, **Firebase**, and **Chart.js**.

[![Vercel Status](https://vercel.com/api/ping/debugging-ai-agent-79z4)](https://debugging-ai-agent-79z4-qtnctyqi7-niranjani-ss-projects.vercel.app)

 🔗 Live Preview  
🌍 [Open the Dashboard](https://debugging-ai-agent-79z4-qtnctyqi7-niranjani-ss-projects.vercel.app)



 🧠 Features

- 🔐 Google Authentication (Firebase Auth)
- 📊 Real-time crash logs displayed on a timeline chart
- 🧪 Simulate app errors to test logging
- 🧾 Admin-only debug log viewer
- 🎯 Role-based access via Firestore
- ⚡ Fast build with Vite + React

 🛠️ Stack

- **Frontend**: React + Vite
- **Backend**: Firebase Firestore
- **Authentication**: Firebase Auth (Google Sign-In)
- **Charts**: Chart.js + adapter-date-fns
- **Deployment**: Vercel



## ⚙️ Getting Started

```bash
git clone https://github.com/niranjanisuresh/debugging_ai_agent.git
cd debugging_ai_agent
npm install


Create a `.env` file in the root:

VITE_FIREBASE_API_KEY=your-key
VITE_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-id
VITE_FIREBASE_STORAGE_BUCKET=your-app.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

Then run:

bash
npm run dev
🚀 Deployment

🟢 Deploy to Vercel

bash
vercel prod


Or connect the GitHub repo in your Vercel dashboard and push changes via Git.



🧑‍💻 Author

Built with 🧠 and 💻 by **[Niranjani Suresh](https://github.com/niranjanisuresh)**

 🌱 Future Enhancements

- Add crash filtering by timestamp/severity  
- Email alerts for spikes in error frequency  
- Session replay integration
