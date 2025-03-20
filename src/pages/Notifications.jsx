import { useContext } from "react";

const Notifications = () => {
  //   const { notifications } = useContext(NotificationContext);
  const notifications = [
    { id: 1, message: "hello" },
    { id: 2, message: "world" }
  ];
  return (
    <div className="notifications-page">
      <h2>Notifications</h2>
      {notifications.length > 0 ? (
        <ul>
          {notifications.map((notification) => (
            <li key={notification.id}>{notification.message}</li>
          ))}
        </ul>
      ) : (
        <p>No notifications</p>
      )}
    </div>
  );
};

export default Notifications;
