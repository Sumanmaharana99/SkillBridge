import {
  useEffect,
  useState,
} from "react";

import API from "../api/axios";

function Notifications() {

  const [notifications,
  setNotifications] =
    useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications =
    async () => {

      const res =
        await API.get(
          "/notifications"
        );

      setNotifications(
        res.data.notifications
      );
    };

  const markRead =
    async (id) => {

      await API.patch(
        `/notifications/${id}/read`
      );

      fetchNotifications();
    };

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-4">
        Notifications
      </h1>

      {notifications.map(
        (item) => (
          <div
            key={item._id}
            className="border p-4 mb-3 rounded"
          >
            <p>
              {item.message}
            </p>

            <p className="text-sm text-gray-500">
              {item.type}
            </p>

            {!item.isRead && (
              <button
                onClick={() =>
                  markRead(item._id)
                }
              >
                Mark Read
              </button>
            )}
          </div>
        )
      )}
    </div>
  );
}

export default Notifications;