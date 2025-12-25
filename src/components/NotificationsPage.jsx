import { useState } from "react"

export default function NotificationsPage() {
  const [activeFilter, setActiveFilter] = useState("all")

  const notifications = [
    {
      id: 1,
      type: "like",
      user: { name: "John Doe", avatar: "https://i.pravatar.cc/150?u=1" },
      action: "liked your post",
      target: "Just finished my final year project!",
      time: "5 minutes ago",
      read: false,
    },
    {
      id: 2,
      type: "comment",
      user: { name: "Jane Smith", avatar: "https://i.pravatar.cc/150?u=2" },
      action: "commented on your post",
      target: "Great work!",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      type: "friend_request",
      user: { name: "Mike Johnson", avatar: "https://i.pravatar.cc/150?u=3" },
      action: "sent you a friend request",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 4,
      type: "mention",
      user: { name: "Sarah Williams", avatar: "https://i.pravatar.cc/150?u=4" },
      action: "mentioned you in a post",
      target: "Check out this amazing project by @you",
      time: "3 hours ago",
      read: true,
    },
    {
      id: 5,
      type: "event",
      user: { name: "UIU Events", avatar: "https://i.pravatar.cc/150?u=events" },
      action: "New event: Hackathon 2024",
      target: "Register now!",
      time: "1 day ago",
      read: true,
    },
    {
      id: 6,
      type: "group",
      user: { name: "CSE Study Group", avatar: "https://i.pravatar.cc/150?u=group" },
      action: "You were added to",
      target: "CSE Study Group",
      time: "2 days ago",
      read: true,
    },
  ]

  const getIcon = (type) => {
    switch (type) {
      case "like":
        return "fa-thumbs-up text-blue-500"
      case "comment":
        return "fa-comment text-green-500"
      case "friend_request":
        return "fa-user-plus text-purple-500"
      case "mention":
        return "fa-at text-orange-500"
      case "event":
        return "fa-calendar text-red-500"
      case "group":
        return "fa-users text-indigo-500"
      default:
        return "fa-bell text-gray-500"
    }
  }

  const filteredNotifications =
    activeFilter === "all"
      ? notifications
      : notifications.filter((n) => n.type === activeFilter)

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <main className="flex-1 max-w-2xl h-full overflow-y-auto pb-20 scroll-smooth no-scrollbar relative">
      <div className="py-6 px-4">
        {/* Header */}
        <div className="mb-6 animate-fade-in-up">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Notifications</h1>
          <p className="text-gray-500">
            {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}` : "All caught up!"}
          </p>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          {[
            { key: "all", label: "All", icon: "fa-bell" },
            { key: "like", label: "Likes", icon: "fa-thumbs-up" },
            { key: "comment", label: "Comments", icon: "fa-comment" },
            { key: "friend_request", label: "Requests", icon: "fa-user-plus" },
            { key: "mention", label: "Mentions", icon: "fa-at" },
          ].map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                activeFilter === filter.key
                  ? "bg-uiu-blue text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <i className={`fas ${filter.icon} mr-2`}></i>
              {filter.label}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="space-y-2 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          {filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`glass-card bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer ${
                !notification.read ? "bg-blue-50 border-l-4 border-uiu-blue" : ""
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="relative">
                  <img
                    src={notification.user.avatar}
                    alt={notification.user.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <i className={`fas ${getIcon(notification.type)} text-sm`}></i>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-800 mb-1">
                    <span className="font-semibold">{notification.user.name}</span> {notification.action}
                    {notification.target && (
                      <span className="text-uiu-blue"> "{notification.target}"</span>
                    )}
                  </p>
                  <p className="text-xs text-gray-500">{notification.time}</p>
                </div>
                {!notification.read && (
                  <div className="w-2 h-2 bg-uiu-blue rounded-full flex-shrink-0 mt-2"></div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredNotifications.length === 0 && (
          <div className="text-center py-12 animate-fade-in-up">
            <i className="fas fa-bell-slash text-6xl text-gray-300 mb-4"></i>
            <p className="text-gray-500">No notifications found</p>
          </div>
        )}
      </div>
    </main>
  )
}

