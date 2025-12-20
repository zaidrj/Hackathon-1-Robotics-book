import React, { useState } from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './ask.module.css';

interface Message {
  text: string;
  isUser: boolean;
  citations?: any[];
}

export default function AskTheBook(): React.JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  // Use relative URLs in production (Vercel), absolute URLs in development
  const isProduction = typeof window !== 'undefined' && window.location.hostname !== 'localhost';
  const apiUrl = isProduction 
    ? '' // Use relative URLs in production
    : ((siteConfig.customFields?.apiUrl as string) || 'http://localhost:8001');

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // Removed error state as it's now handled within messages for better user experience
  // const [error, setError] = useState<string | null>(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { text: input, isUser: true };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);
    // setError(null); // Clear previous error

    try {
      const response = await fetch(`${apiUrl}/api/ask`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: currentInput }),
      });

      const data = await response.json();
      console.log("Ask API result", data); // Updated for debugging

      if (!response.ok) {
        console.error("Ask API error:", data);
        setMessages(prev => [...prev, { text: "Error: " + (data.detail || "Backend error"), isUser: false }]);
        return;
      }
      setMessages(prev => [...prev, { text: data.answer, isUser: false }]);

    } catch (e) {
      console.error("Fetch error:", e);
      setMessages((prev) => [...prev, { text: "Error: Sorry, something went wrong. Please check console for details.", isUser: false }]);
      // setError('Sorry, something went wrong. Please try again.'); // Removed explicit error state
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout title="Ask the Book" description="Ask a question to the Physical AI textbook">
      <div className={styles.chatContainer}>
        <div className={styles.messageList}>
          {messages.map((msg, index) => (
            <div key={index} className={msg.isUser ? styles.userMessage : styles.botMessage}>
              <p>{msg.text}</p>
              {msg.citations && msg.citations.length > 0 && (
                <div className={styles.citations}>
                  <strong>Sources:</strong>
                  <ul>
                    {msg.citations.map((citation, i) => (
                      <li key={i}>
                        <a href={citation.url} target="_blank" rel="noopener noreferrer">
                          {citation.chapter || 'Reference'}
                          {citation.heading && `: ${citation.heading}`}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
          {isLoading && <div className={styles.loading}>Thinking...</div>}
          {/* Removed explicit error display as it's now part of messages */}
          {/* {error && <div className={styles.errorMessage}>{error}</div>} */}
        </div>
        <div className={styles.inputArea}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask anything about Physical AI & Humanoid Robotics..."
            disabled={isLoading}
          />
          <button onClick={handleSend} disabled={isLoading}>
            Send
          </button>
        </div>
      </div>
    </Layout>
  );
}