import { useState } from "react"
import Chat from "./Chat"

export default function ChatList({ onClose }) {
  const [activeChat, setActiveChat] = useState(null)

  const chats = [
    {
      id: 1,
      name: "Jane Smith",
      avatar: "https://i.pravatar.cc/150?u=1",
      lastMessage: "Great! Just finished my project. Want to study together later?",
      time: "10:35 AM",
      unread: 2,
      online: true,
    },
    {
      id: 2,
      name: "Mike Johnson",
      avatar: "https://i.pravatar.cc/150?u=2",
      lastMessage: "Thanks for the notes!",
      time: "Yesterday",
      unread: 0,
      online: false,
    },
    {
      id: 3,
      name: "Sarah Williams",
      avatar: "https://i.pravatar.cc/150?u=3",
      lastMessage: "See you at the library",
      time: "2 days ago",
      unread: 1,
      online: true,
    },
    {
      id: 4,
      name: "David Brown",
      avatar: "https://i.pravatar.cc/150?u=4",
      lastMessage: "The assignment is due tomorrow",
      time: "3 days ago",
      unread: 0,
      online: false,
    },
  ]

  if (activeChat) {
    return (
      <Chat
        chatId={activeChat.id}
        recipient={activeChat}
        onClose={() => setActiveChat(null)}
      />
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white lg:absolute lg:inset-auto lg:right-0 lg:top-0 lg:w-96 lg:h-full lg:border-l lg:border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
        <h2 className="text-xl font-bold text-gray-800">Messages</h2>
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200">
            <i className="fas fa-search"></i>
          </button>
          <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200">
            <i className="fas fa-edit"></i>
          </button>
          <button onClick={onClose} className="lg:hidden w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200">
            <i className="fas fa-times"></i>
          </button>
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => setActiveChat(chat)}
            className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 text-left"
          >
            <div className="relative">
              <img src={chat.avatar} alt={chat.name} className="w-12 h-12 rounded-full object-cover" />
              {chat.online && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-gray-800 truncate">{chat.name}</h3>
                <span className="text-xs text-gray-500 flex-shrink-0 ml-2">{chat.time}</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                {chat.unread > 0 && (
                  <span className="bg-uiu-blue text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 ml-2">
                    {chat.unread}
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

