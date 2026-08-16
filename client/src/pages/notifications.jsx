import { useState } from "react";
import "../styles/notifications.css";

function Notifications() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "application",
      title: "Application Submitted",
      message: "Your application for Frontend Developer has been submitted successfully.",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      type: "job",
      title: "New Job Match",
      message: "A new React Developer job matches your skills.",
      time: "5 hours ago",
      read: false,
    },
    {
      id: 3,
      type: "profile",
      title: "Complete Your Profile",
      message: "Add your skills and resume to improve your job opportunities.",
      time: "Yesterday",
      read: true,
    },
    {
      id: 4,
      type: "message",
      title: "New Message",
      message: "You received a new message from a recruiter.",
      time: "2 days ago",
      read: true,
    },
  ]);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  const clearNotification = (id) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  return (
    <div className="notifications-page">
      <div className="notifications-container">

        {/* Header */}
        <div className="notifications-header">
          <div>
            <h1>Notifications</h1>
            <p>
              Stay updated with your applications, jobs and messages.
            </p>
          </div>

          {unreadCount > 0 && (
            <button
              className="mark-all-btn"
              onClick={markAllAsRead}
            >
              Mark all as read
            </button>
          )}
        </div>

        {/* Notification count */}
        <div className="notification-summary">
          <span className="notification-bell">🔔</span>

          <div>
            <strong>{unreadCount}</strong>
            <span> unread notification{unreadCount !== 1 ? "s" : ""}</span>
          </div>
        </div>

        {/* Notifications */}
        <div className="notification-list">

          {notifications.length === 0 ? (
            <div className="empty-notifications">
              <div className="empty-icon">🔔</div>
              <h2>You're all caught up!</h2>
              <p>No new notifications at the moment.</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`notification-card ${
                  !notification.read ? "unread" : ""
                }`}
                onClick={() => markAsRead(notification.id)}
              >

                <div className={`notification-icon ${notification.type}`}>
                  {notification.type === "application" && "📄"}
                  {notification.type === "job" && "💼"}
                  {notification.type === "profile" && "👤"}
                  {notification.type === "message" && "💬"}
                </div>

                <div className="notification-content">
                  <div className="notification-title-row">
                    <h3>{notification.title}</h3>

                    {!notification.read && (
                      <span className="unread-dot"></span>
                    )}
                  </div>

                  <p>{notification.message}</p>

                  <span className="notification-time">
                    {notification.time}
                  </span>
                </div>

                <button
                  className="delete-notification"
                  onClick={(e) => {
                    e.stopPropagation();
                    clearNotification(notification.id);
                  }}
                  title="Remove notification"
                >
                  ×
                </button>

              </div>
            ))
          )}

        </div>

      </div>
    </div>
  );
}

export default Notifications;