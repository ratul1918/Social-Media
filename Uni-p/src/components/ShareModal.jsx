import { useState } from "react"

export default function ShareModal({ post, onClose }) {
  const [shareOption, setShareOption] = useState("share")
  const [shareMessage, setShareMessage] = useState("")
  const [selectedFriends, setSelectedFriends] = useState([])

  const friends = [
    { id: 1, name: "Jane Smith", avatar: "https://i.pravatar.cc/150?u=1" },
    { id: 2, name: "Mike Johnson", avatar: "https://i.pravatar.cc/150?u=2" },
    { id: 3, name: "Sarah Williams", avatar: "https://i.pravatar.cc/150?u=3" },
    { id: 4, name: "David Brown", avatar: "https://i.pravatar.cc/150?u=4" },
  ]

  const handleShare = () => {
    console.log("Sharing:", { shareOption, shareMessage, selectedFriends })
    onClose()
  }

  const toggleFriend = (friendId) => {
    setSelectedFriends((prev) =>
      prev.includes(friendId) ? prev.filter((id) => id !== friendId) : [...prev, friendId]
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-800">Share Post</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Options */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex gap-2">
            <button
              onClick={() => setShareOption("share")}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                shareOption === "share"
                  ? "bg-uiu-blue text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <i className="fas fa-share mr-2"></i>Share Now
            </button>
            <button
              onClick={() => setShareOption("send")}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                shareOption === "send"
                  ? "bg-uiu-blue text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <i className="fas fa-paper-plane mr-2"></i>Send Message
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {shareOption === "share" ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Add a message (optional)</label>
                <textarea
                  value={shareMessage}
                  onChange={(e) => setShareMessage(e.target.value)}
                  rows={3}
                  placeholder="Write something..."
                  className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-200 focus:border-uiu-blue focus:ring-2 focus:ring-uiu-blue/20 outline-none transition-all resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Share to</label>
                <select className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-200 focus:border-uiu-blue focus:ring-2 focus:ring-uiu-blue/20 outline-none transition-all">
                  <option value="public">Public</option>
                  <option value="friends">Friends</option>
                  <option value="only-me">Only Me</option>
                </select>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Send to</label>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {friends.map((friend) => (
                    <button
                      key={friend.id}
                      onClick={() => toggleFriend(friend.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                        selectedFriends.includes(friend.id) ? "bg-uiu-blue/10 border-2 border-uiu-blue" : "bg-gray-50 hover:bg-gray-100 border-2 border-transparent"
                      }`}
                    >
                      <img src={friend.avatar} alt={friend.name} className="w-10 h-10 rounded-full object-cover" />
                      <span className="flex-1 text-left font-medium text-gray-800">{friend.name}</span>
                      {selectedFriends.includes(friend.id) && (
                        <i className="fas fa-check text-uiu-blue"></i>
                      )}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                <textarea
                  value={shareMessage}
                  onChange={(e) => setShareMessage(e.target.value)}
                  rows={3}
                  placeholder="Write a message..."
                  className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-200 focus:border-uiu-blue focus:ring-2 focus:ring-uiu-blue/20 outline-none transition-all resize-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleShare}
            disabled={shareOption === "send" && selectedFriends.length === 0}
            className="px-6 py-2 bg-uiu-blue text-white rounded-lg font-medium hover:bg-uiu-lightBlue transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {shareOption === "share" ? "Share" : "Send"}
          </button>
        </div>
      </div>
    </div>
  )
}

