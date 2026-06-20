import { useEffect, useState } from "react";
import API from "../api/axios";

function Notifications() {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        const res = await API.get("/notifications");
        setNotifications(res.data.notifications);
    };

    const markRead = async (id) => {
        await API.patch(`/notifications/${id}/read`);
        fetchNotifications();
    };

    // Count unread notifications
    const unreadCount = notifications.filter((n) => !n.isRead).length;

    // Mark all as read
    const markAllRead = async () => {
        await API.patch("/notifications/read-all");
        fetchNotifications();
    };

    // Get icon based on notification type
    const getTypeIcon = (type) => {
        const icons = {
            info: "ℹ️",
            success: "✅",
            warning: "⚠️",
            error: "❌",
            message: "💬",
            alert: "🔔",
            update: "🔄",
        };
        return icons[type?.toLowerCase()] || "📌";
    };

    // Get color based on notification type
    const getTypeColor = (type) => {
        const colors = {
            info: "border-blue-400 bg-blue-50",
            success: "border-green-400 bg-green-50",
            warning: "border-yellow-400 bg-yellow-50",
            error: "border-red-400 bg-red-50",
            message: "border-purple-400 bg-purple-50",
            alert: "border-orange-400 bg-orange-50",
            update: "border-cyan-400 bg-cyan-50",
        };
        return colors[type?.toLowerCase()] || "border-gray-200 bg-white";
    };

    // Format relative time
    const getRelativeTime = (date) => {
        if (!date) return "";
        const now = new Date();
        const diff = Math.floor((now - new Date(date)) / 1000);
        if (diff < 60) return `${diff}s ago`;
        if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
        if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
        if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
        return new Date(date).toLocaleDateString();
    };

    return (
        <div className="max-w-3xl mx-auto p-4 md:p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white text-lg shadow-md">
                        🔔
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
                            Notifications
                        </h1>
                        {unreadCount > 0 && (
                            <span className="text-sm text-gray-500">
                                {unreadCount} unread
                            </span>
                        )}
                    </div>
                </div>

                {unreadCount > 0 && (
                    <button
                        onClick={markAllRead}
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 px-3 py-1.5 rounded-lg transition-all duration-200"
                    >
                        Mark all read
                    </button>
                )}
            </div>

            {/* Notification list */}
            {notifications.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
                    <div className="text-5xl mb-4">📭</div>
                    <p className="text-gray-500 font-medium">No notifications</p>
                    <p className="text-sm text-gray-400 mt-1">
                        You're all caught up!
                    </p>
                </div>
            ) : (
                <div className="space-y-3">
                    {notifications.map((item) => (
                        <div
                            key={item._id}
                            className={`relative p-4 rounded-xl border-l-4 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${getTypeColor(
                                item.type
                            )} ${!item.isRead ? "bg-white" : "bg-gray-50/80"}`}
                        >
                            <div className="flex items-start gap-3">
                                {/* Icon */}
                                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-white/80 shadow-sm flex items-center justify-center text-base border border-gray-100">
                                    {getTypeIcon(item.type)}
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2">
                                        <p
                                            className={`text-sm ${!item.isRead ? "text-gray-800 font-medium" : "text-gray-600"
                                                }`}
                                        >
                                            {item.message}
                                        </p>

                                        {!item.isRead && (
                                            <span className="flex-shrink-0 w-2 h-2 mt-1.5 rounded-full bg-indigo-500 shadow-sm shadow-indigo-200"></span>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                                        <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                                            {item.type || "General"}
                                        </span>
                                        {item.createdAt && (
                                            <>
                                                <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                                <span className="text-xs text-gray-400">
                                                    {getRelativeTime(item.createdAt)}
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Action */}
                                {!item.isRead && (
                                    <button
                                        onClick={() => markRead(item._id)}
                                        className="flex-shrink-0 text-xs font-medium text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-all duration-200"
                                    >
                                        Mark read
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Notifications;