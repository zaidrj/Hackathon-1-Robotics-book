import React, { useState, useRef, useEffect } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './ChatWidget.module.css';

interface Message {
  text: string;
  isUser: boolean;
}

export default function ChatWidget(): React.JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const apiUrl = (siteConfig.customFields?.apiUrl as string) || 'http://localhost:8001';

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messageListRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { text: input, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(`${apiUrl}/api/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: currentInput }),
      });

      const data = await response.json();
      console.log("ChatWidget Ask API result", data);

      if (!response.ok) {
        setMessages(prev => [
          ...prev,
          { text: "Error: " + (data.detail || "Backend error"), isUser: false },
        ]);
      } else {
        setMessages(prev => [...prev, { text: data.answer, isUser: false }]);
      }
    } catch (err) {
      console.error("ChatWidget fetch error:", err);
      setMessages(prev => [
        ...prev,
        { text: "Error: Sorry, something went wrong. Please try again.", isUser: false },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        className={styles.chatButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className={styles.chatWindow}>
          <div className={styles.chatHeader}>
            Ask the Book
          </div>
          <div className={styles.messageList} ref={messageListRef}>
            {messages.length === 0 && (
              <div className={styles.welcomeMessage}>
                Hi! Ask me anything about Physical AI & Humanoid Robotics.
              </div>
            )}
            {messages.map((msg, index) => (
              <div
                key={index}
                className={msg.isUser ? styles.userMessage : styles.botMessage}
              >
                {msg.text}
              </div>
            ))}
            {isLoading && <div className={styles.loading}>Thinking...</div>}
          </div>
          <div className={styles.inputRow}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your question..."
              disabled={isLoading}
            />
            <button onClick={handleSend} disabled={isLoading || !input.trim()}>
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
