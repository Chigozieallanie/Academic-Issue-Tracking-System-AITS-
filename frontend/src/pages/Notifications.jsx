import React from "react";
import "./notification.css";
const Notifications = () => {
  const notifications = [
    {
      id: 1,
      message: "Your issue #1 has been resolved.",
      timestamp: "2025-03-27 10:00 AM"
    },
    {
      id: 2,
      message: "A lecturer commented on your issue #2.",
      timestamp: "2025-03-27 11:30 AM"
    },
    {
      id: 3,
      message: "Your issue #3 is pending review.",
      timestamp: "2025-03-27 01:15 PM"
    }
  ];

  return (
    <div className="notifications-page">
      <h2>Notifications</h2>
      {notifications.length > 0 ? (
        <ul>
          {notifications.map((notification) => (
            <li key={notification.id} className="notification-item">
              <p className="notification-message">{notification.message}</p>
              <p className="notification-timestamp">{notification.timestamp}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No notifications</p>
      )}
    </div>
  );
};

export default Notifications;
