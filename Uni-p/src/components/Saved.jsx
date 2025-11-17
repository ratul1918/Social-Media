import { useState, useEffect } from "react"
import PostCard from "./PostCard"

export default function Saved() {
  const [savedPosts, setSavedPosts] = useState([])
  const [savedCollections, setSavedCollections] = useState([])
  const [activeTab, setActiveTab] = useState("posts")

  useEffect(() => {
    // Mock data for saved posts
    setSavedPosts([
      {
        name: "UIU Computer Club",
        time: "3 days ago",
        avatar: "https://i.pravatar.cc/150?u=club",
        content:
          "Check out these amazing resources for learning React! 🚀 Perfect for beginners and advanced developers alike. #React #WebDev #Learning",
        image:
          "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        likes: 342,
        comments: 67,
        shares: 23,
        savedDate: "2024-03-10",
      },
      {
        name: "Dr. Ahmed Hassan",
        time: "1 week ago",
        avatar: "https://i.pravatar.cc/150?u=prof",
        content:
          "Important announcement: The deadline for submitting final year project proposals has been extended to March 20th. Please submit your proposals through the portal.",
        image: null,
        likes: 189,
        comments: 45,
        shares: 12,
        savedDate: "2024-03-05",
      },
      {
        name: "UIU Career Services",
        time: "2 weeks ago",
        avatar: "https://i.pravatar.cc/150?u=career",
        content:
          "Top companies are hiring! Check out the latest job openings for software engineers, data scientists, and more. Apply now! 💼",
        image:
          "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        likes: 512,
        comments: 89,
        shares: 156,
        savedDate: "2024-02-28",
      },
      {
        name: "Study Group - Algorithms",
        time: "2 weeks ago",
        avatar: "https://i.pravatar.cc/150?u=study",
        content:
          "Solved this interesting dynamic programming problem today. Here's my approach and solution. Feel free to share your thoughts!",
        image: null,
        likes: 78,
        comments: 34,
        shares: 8,
        savedDate: "2024-02-27",
      },
    ])

    // Mock data for collections
    setSavedCollections([
      {
        id: 1,
        name: "Web Development Resources",
        description: "Useful links and tutorials for web development",
        count: 12,
        color: "blue",
        icon: "fa-code",
      },
      {
        id: 2,
        name: "Job Opportunities",
        description: "Saved job postings and career tips",
        count: 8,
        color: "green",
        icon: "fa-briefcase",
      },
      {
        id: 3,
        name: "Study Materials",
        description: "Important notes and study resources",
        count: 15,
        color: "purple",
        icon: "fa-book",
      },
      {
        id: 4,
        name: "Events",
        description: "Events I want to attend",
        count: 5,
        color: "orange",
        icon: "fa-calendar",
      },
    ])
  }, [])

  const handleUnsave = (index) => {
    setSavedPosts(savedPosts.filter((_, i) => i !== index))
  }

  const formatSavedDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) return "Saved yesterday"
    if (diffDays < 7) return `Saved ${diffDays} days ago`
    if (diffDays < 30) return `Saved ${Math.floor(diffDays / 7)} weeks ago`
    return `Saved ${Math.floor(diffDays / 30)} months ago`
  }

  return (
    <main
      className="flex-1 max-w-2xl h-full overflow-y-auto pb-20 scroll-smooth no-scrollbar relative"
    >
      <div className="py-6 px-4">
        {/* Header */}
        <div className="mb-6 animate-fade-in-up">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Saved</h1>
          <p className="text-sm text-gray-500">Posts and content you've saved for later</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar animate-slide-in-right">
          <button
            onClick={() => setActiveTab("posts")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
              activeTab === "posts"
                ? "bg-uiu-blue text-white shadow-md"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            Saved Posts ({savedPosts.length})
          </button>
          <button
            onClick={() => setActiveTab("collections")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
              activeTab === "collections"
                ? "bg-uiu-blue text-white shadow-md"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            Collections ({savedCollections.length})
          </button>
        </div>

        {/* Content */}
        {activeTab === "posts" ? (
          <div className="space-y-6">
            {savedPosts.map((post, idx) => (
              <div key={idx} className="relative animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                <PostCard post={post} index={idx} />
                <div className="absolute top-4 right-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400 bg-white px-2 py-1 rounded-full shadow-sm">
                      {formatSavedDate(post.savedDate)}
                    </span>
                    <button
                      onClick={() => handleUnsave(idx)}
                      className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors text-uiu-crimson"
                      title="Remove from saved"
                    >
                      <i className="fas fa-bookmark text-sm"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {savedPosts.length === 0 && (
              <div className="text-center py-12 animate-fade-in-up">
                <i className="fas fa-bookmark text-6xl text-gray-300 mb-4"></i>
                <p className="text-gray-500">No saved posts yet</p>
                <p className="text-sm text-gray-400 mt-2">Save posts to view them here later</p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {savedCollections.map((collection, idx) => (
              <div
                key={collection.id}
                className="bg-white rounded-2xl shadow-sm p-4 animate-fade-in-up cursor-pointer hover:shadow-md transition-shadow"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center text-white ${
                      collection.color === "blue"
                        ? "bg-blue-500"
                        : collection.color === "green"
                        ? "bg-green-500"
                        : collection.color === "purple"
                        ? "bg-purple-500"
                        : "bg-orange-500"
                    }`}
                  >
                    <i className={`fas ${collection.icon} text-lg`}></i>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 hover:text-uiu-blue transition-colors mb-1">
                      {collection.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">{collection.description}</p>
                    <p className="text-xs text-gray-400">
                      <i className="fas fa-bookmark mr-1"></i>
                      {collection.count} items
                    </p>
                  </div>
                  <button className="px-4 py-2 text-uiu-blue hover:bg-gray-50 rounded-lg transition-colors">
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </div>
              </div>
            ))}
            {savedCollections.length === 0 && (
              <div className="text-center py-12 animate-fade-in-up">
                <i className="fas fa-folder text-6xl text-gray-300 mb-4"></i>
                <p className="text-gray-500">No collections yet</p>
                <p className="text-sm text-gray-400 mt-2">Create collections to organize your saved items</p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  )
}

