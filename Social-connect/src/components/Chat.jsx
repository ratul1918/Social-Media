import { useState, useRef, useEffect } from "react"

export default function Chat({ onClose, chatId, recipient }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "other",
      text: "Hey! How are you doing?",
      time: "10:30 AM",
      read: true,
    },
    {
      id: 2,
      sender: "me",
      text: "I'm doing great! Thanks for asking. How about you?",
      time: "10:32 AM",
      read: true,
    },
    {
      id: 3,
      sender: "other",
      text: "Great! Just finished my project. Want to study together later?",
      time: "10:35 AM",
      read: true,
    },
  ])
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSend = (e) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const message = {
      id: messages.length + 1,
      sender: "me",
      text: newMessage.trim(),
      time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      read: false,
    }

    setMessages([...messages, message])
    setNewMessage("")

    // Simulate typing indicator
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      const reply = {
        id: messages.length + 2,
        sender: "other",
        text: "That sounds good! Let me know when you're ready.",
        time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
        read: false,
      }
      setMessages((prev) => [...prev, reply])
    }, 2000)
  }

  const mockRecipient = recipient || {
    name: "Jane Smith",
    avatar: "https://i.pravatar.cc/150?u=1",
    online: true,
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white lg:absolute lg:inset-auto lg:right-0 lg:top-0 lg:w-96 lg:h-full lg:border-l lg:border-gray-200">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-3">
          <button onClick={onClose} className="lg:hidden w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200">
            <i className="fas fa-arrow-left"></i>
          </button>
          <div className="relative">
            <img src={mockRecipient.avatar} alt={mockRecipient.name} className="w-10 h-10 rounded-full object-cover" />
            {mockRecipient.online && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            )}
          </div>
          <div>
            <h3 className="font-bold text-gray-800">{mockRecipient.name}</h3>
            <p className="text-xs text-gray-500">{mockRecipient.online ? "Online" : "Offline"}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200">
            <i className="fas fa-phone"></i>
          </button>
          <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200">
            <i className="fas fa-video"></i>
          </button>
          <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200">
            <i className="fas fa-ellipsis-v"></i>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
          >
            <div className={`max-w-[75%] ${message.sender === "me" ? "order-2" : "order-1"}`}>
              {message.sender === "other" && (
                <img
                  src={mockRecipient.avatar}
                  alt={mockRecipient.name}
                  className="w-6 h-6 rounded-full object-cover mb-1"
                />
              )}
              <div
                className={`rounded-2xl px-4 py-2 ${
                  message.sender === "me"
                    ? "bg-uiu-blue text-white rounded-br-sm"
                    : "bg-white text-gray-800 rounded-bl-sm shadow-sm"
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <div className={`flex items-center gap-1 mt-1 text-xs ${
                  message.sender === "me" ? "text-blue-100" : "text-gray-400"
                }`}>
                  <span>{message.time}</span>
                  {message.sender === "me" && (
                    <i className={`fas ${message.read ? "fa-check-double text-blue-300" : "fa-check"}`}></i>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-2 shadow-sm">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef}></div>
      </div>

      {/* Message Input */}
      <form onSubmit={handleSend} className="p-4 border-t border-gray-200 bg-white">
        <div className="flex items-center gap-2">
          <button type="button" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200">
            <i className="fas fa-paperclip"></i>
          </button>
          <input
            ref={inputRef}
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-uiu-blue focus:bg-white"
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="w-10 h-10 rounded-full bg-uiu-blue text-white flex items-center justify-center hover:bg-uiu-lightBlue transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </form>
    </div>
  )
}

