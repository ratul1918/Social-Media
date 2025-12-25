import { useState, useEffect, useRef } from "react"
import PostCard from "./PostCard"

export default function Feed({ onCreatePost }) {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const feedRef = useRef(null)

  const postTemplates = [
    {
      name: "UIU Computer Club",
      time: "2 hours ago",
      avatar: "https://i.pravatar.cc/150?u=club",
      content:
        "Join us this Friday for the annual Hackathon! Registration opens at 10:00 AM in the main lobby. Don't miss out on the chance to win exciting prizes. 🚀💻 #UIU #CSE #Hackathon",
      image:
        "https://images.unsplash.com/photo-1504384308090-c54be3855833?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      likes: 245,
      comments: 45,
      shares: 12,
    },
    {
      name: "Sadia Islam",
      time: "4 hours ago",
      avatar: "https://i.pravatar.cc/150?u=8",
      content:
        "Just finished my final year project presentation! It's been a long journey but totally worth it. Thanks to my supervisor for the guidance. 🎓✨",
      image: null,
      likes: 120,
      comments: 32,
      shares: 8,
    },
    {
      name: "Tanvir Ahmed",
      time: "Yesterday",
      avatar: "https://i.pravatar.cc/150?u=9",
      content:
        "Does anyone have the notes for Data Structures (CSE-221)? I missed the last lecture due to illness. Please DM me!",
      image: null,
      likes: 15,
      comments: 8,
      shares: 2,
    },
    {
      name: "UIU Photography",
      time: "Yesterday",
      avatar: "https://i.pravatar.cc/150?u=photo",
      content: "Capturing the golden hour at our beautiful campus. 📸🧡",
      image:
        "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      likes: 512,
      comments: 89,
      shares: 45,
    },
  ]

  const generatePosts = (count) => {
    const newPosts = Array.from(
      { length: count },
      () => postTemplates[Math.floor(Math.random() * postTemplates.length)],
    )
    setPosts((prev) => [...prev, ...newPosts])
  }

  useEffect(() => {
    // Generate initial posts
    generatePosts(5)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleScroll = () => {
    if (!feedRef.current) return
    const { scrollTop, clientHeight, scrollHeight } = feedRef.current

    if (scrollTop + clientHeight >= scrollHeight - 100 && !isLoading) {
      setIsLoading(true)
      setTimeout(() => {
        generatePosts(3)
        setIsLoading(false)
      }, 1000)
    }
  }

  const stories = [
    { id: "add", name: "Add Story" },
    {
      id: 1,
      name: "Campus",
      image:
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      user: 2,
    },
    {
      id: 2,
      name: "Lab",
      image:
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      user: 3,
    },
    {
      id: 3,
      name: "Events",
      image:
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      user: 4,
    },
  ]

  return (
    <main
      id="feed-container"
      ref={feedRef}
      onScroll={handleScroll}
      className="flex-1 max-w-2xl h-full overflow-y-auto pb-20 scroll-smooth no-scrollbar relative"
    >
      <div className="py-6 px-4">
        {/* Stories / Highlights */}
        <div className="flex gap-4 overflow-x-auto no-scrollbar mb-6 pb-2">
          {stories.map((story) => (
            <div
              key={story.id}
              className="flex-shrink-0 relative w-20 h-32 rounded-xl overflow-hidden cursor-pointer group"
            >
              <img
                src={story.image || "https://i.pravatar.cc/150?u=uiu"}
                alt={story.name}
                className={`w-full h-full object-cover ${story.id === "add" ? "brightness-75" : "brightness-90"} group-hover:scale-110 transition-transform duration-500`}
              />
              {story.id === "add" && (
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-uiu-blue border-2 border-white rounded-full flex items-center justify-center text-white">
                  <i className="fas fa-plus text-xs"></i>
                </div>
              )}
              {story.id !== "add" && (
                <>
                  <div className="absolute top-2 left-2 w-8 h-8 rounded-full border-2 border-uiu-crimson p-[1px] z-10">
                    <img
                      src={`https://i.pravatar.cc/150?u=${story.user}`}
                      alt="user"
                      className="rounded-full w-full h-full object-cover"
                    />
                  </div>
                  <span className="absolute bottom-2 left-2 text-white text-xs font-medium">{story.name}</span>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Create Post Widget */}
        <div className="bg-white rounded-2xl shadow-sm p-4 mb-6">
          <div className="flex items-center gap-3 mb-3">
            <img src="https://i.pravatar.cc/150?u=uiu" alt="user" className="w-10 h-10 rounded-full object-cover" />
            <div
              onClick={onCreatePost}
              className="flex-1 bg-gray-100 hover:bg-gray-200 transition-colors rounded-full px-4 py-2.5 cursor-pointer text-gray-500 text-sm"
            >
              What's on your mind, Student?
            </div>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-gray-100">
            <button className="flex items-center gap-2 text-gray-500 hover:bg-gray-50 px-3 py-1.5 rounded-lg transition-colors text-sm">
              <i className="fas fa-video text-red-500"></i> Live
            </button>
            <button className="flex items-center gap-2 text-gray-500 hover:bg-gray-50 px-3 py-1.5 rounded-lg transition-colors text-sm">
              <i className="fas fa-image text-green-500"></i> Photo
            </button>
            <button className="flex items-center gap-2 text-gray-500 hover:bg-gray-50 px-3 py-1.5 rounded-lg transition-colors text-sm">
              <i className="fas fa-smile text-yellow-500"></i> Feeling
            </button>
          </div>
        </div>

        {/* Feed Stream */}
        <div id="feed-stream" className="space-y-6">
          {posts.map((post, idx) => (
            <PostCard key={idx} post={post} index={idx} />
          ))}
        </div>

        {/* Infinite Scroll Loader */}
        <div id="scroll-loader" className={`py-6 flex justify-center transition-opacity duration-300 ${isLoading ? "opacity-100" : "opacity-0"}`}>
          <div className="loader"></div>
        </div>
      </div>
    </main>
  )
}
