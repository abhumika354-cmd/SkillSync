import { useEffect, useState } from "react";
import "../styles/messages.css";

function Messages() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="messages-page messages-loading">
        <div className="loading-spinner"></div>
        <h2>Loading Messages...</h2>
        <p>Preparing your conversations...</p>
      </div>
    );
  }

  return (
    <div className="messages-page">

      {/* Background Glows */}
      <div className="messages-glow messages-glow-one"></div>
      <div className="messages-glow messages-glow-two"></div>
      <div className="messages-glow messages-glow-three"></div>

      {/* Header */}
      <div className="messages-header">
        <div>
          <span className="messages-label">COMMUNICATION HUB</span>

          <h1>💬 Messages</h1>

          <p>
            Connect and communicate with your career network.
          </p>
        </div>

        <div className="message-count-card">
          <span>💬</span>
          <div>
            <strong>0</strong>
            <small>Conversations</small>
          </div>
        </div>
      </div>

      {/* Main Messages Card */}
      <div className="messages-container">

        <div className="empty-messages">

          <div className="empty-message-icon">
            💬
          </div>

          <h2>No Messages Yet</h2>

          <p>
            Your conversations will appear here when you start
            communicating with recruiters or other users.
          </p>

          <button className="messages-action-btn">
            🔍 Explore Jobs
          </button>

        </div>

      </div>

    </div>
  );
}

export default Messages;