import React, { useState, useRef, useEffect } from 'react';
import './ChatBot.css';
import { LightAsync as SyntaxHighlighter } from 'react-syntax-highlighter';
import { github } from 'react-syntax-highlighter/dist/esm/styles/hljs';

function ChatBot() {
  const [messages, setMessages] = useState([
    { role: 'bot', text: '🤖 Hi! Paste your error message and I’ll help you debug it.' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [lastTopic, setLastTopic] = useState(null);
  const [techStack, setTechStack] = useState('General');
  const bottomRef = useRef(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    const vaguePhrases = ['error', 'issue', 'bug', 'problem'];
    const isVague = vaguePhrases.some(word => input.toLowerCase() === word || input.toLowerCase().startsWith(word + ' '));

    if (isVague) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'bot',
          text: '🤖 Can you share the full error message or the code around it?',
        },
      ]);
      setLoading(false);
      return;
    }

    let topicHint = '';
    if (input.includes('auth/') || input.toLowerCase().includes('firebase')) {
      topicHint = 'The user is working with Firebase authentication.';
      setLastTopic('Firebase Auth');
    } else if (input.toLowerCase().includes('vite')) {
      topicHint = 'The user is using Vite.';
      setLastTopic('Vite');
    } else if (input.toLowerCase().includes('react')) {
      topicHint = 'The user is working with React.';
      setLastTopic('React');
    } else {
      topicHint = 'No specific stack detected.';
      setLastTopic(null);
    }

    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: `
You are Crash IQ, a debugging assistant helping developers fix code issues.

User selected: ${techStack}.
Detected context: ${topicHint}.

Format response like:
✅ Problem Summary  
🧠 What Went Wrong  
🛠️ How to Fix It

If needed, include short code snippets and highlight them with \`\`\`. Keep answers precise.`,
            },
            { role: 'user', content: input },
          ],
          temperature: 0.5,
          max_tokens: 600,
        }),
      });

      const data = await res.json();
      const replyText = data.choices?.[0]?.message?.content ?? '🤖 Hmm, I couldn’t understand that error.';
      const botReply = { role: 'bot', text: replyText };
      setMessages((prev) => [...prev, botReply]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'bot', text: '⚠️ I couldn’t connect to the AI. Check your API key or network.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const renderMessage = (msg, index) => {
    const parts = msg.text.split(/```/);
    return (
      <div key={index} className={`bubble ${msg.role}`}>
        <div className="avatar">{msg.role === 'bot' ? '🤖' : '🧑‍💻'}</div>
        <div className="text">
          {parts.map((part, i) =>
            i % 2 === 1 ? (
              <SyntaxHighlighter key={i} style={github} language="javascript">
                {part.trim()}
              </SyntaxHighlighter>
            ) : (
              <span
                key={i}
                dangerouslySetInnerHTML={{
                  __html: part
                    .replace(/✅ (.+)/g, '<strong>✅ $1</strong>')
                    .replace(/🧠 (.+)/g, '<em>🧠 $1</em>')
                    .replace(/🛠️ (.+)/g, '<u>🛠️ $1</u>')
                    .replace(/\n/g, '<br />'),
                }}
              />
            )
          )}
        </div>
      </div>
    );
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  return (
    <div className="chatbot-container">
      <div className="chat-header">
        Crash IQ Assistant
        <select
          className="tech-select"
          value={techStack}
          onChange={(e) => setTechStack(e.target.value)}
        >
          <option value="General">General</option>
          <option value="React">React</option>
          <option value="Vite">Vite</option>
          <option value="Firebase">Firebase</option>
        </select>
        <button className="clear-btn" onClick={() =>
          setMessages([
            { role: 'bot', text: '🤖 Hi! Paste your error message and I’ll help you debug it.' }
          ])
        }>
          Clear Chat
        </button>
      </div>

      <div className="chat-window">
        {messages.map(renderMessage)}
        {loading && (
          <div className="bubble bot">
            <div className="avatar">🤖</div>
            <div className="text loading"><span>.</span><span>.</span><span>.</span></div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="input-area">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your error message or code snippet..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default ChatBot;
