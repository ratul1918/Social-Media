import { useState, useEffect, useRef } from "react"
import Comments from "./Comments"
import ImageGallery from "./ImageGallery"
import ShareModal from "./ShareModal"
import HashtagParser from "./HashtagParser"

export default function PostCard({ post, index = 0 }) {
  const [liked, setLiked] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [showGallery, setShowGallery] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [galleryImages, setGalleryImages] = useState([])
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef(null)

  // Mock comments data
  const mockComments = post.commentsData || [
    {
      id: 1,
      author: "Jane Smith",
      avatar: "https://i.pravatar.cc/150?u=1",
      content: "Great post! Thanks for sharing.",
      time: "1 hour ago",
      likes: 5,
      replies: [
        {
          id: 11,
          author: "John Doe",
          avatar: "https://i.pravatar.cc/150?u=uiu",
          content: "Thanks!",
          time: "30 mins ago",
          likes: 2,
        },
      ],
    },
    {
      id: 2,
      author: "Mike Johnson",
      avatar: "https://i.pravatar.cc/150?u=2",
      content: "This is really helpful!",
      time: "2 hours ago",
      likes: 3,
      replies: [],
    },
  ]

  useEffect(() => {
    // Staggered animation
    const timer = setTimeout(() => {
      setIsVisible(true)
      if (cardRef.current) {
        cardRef.current.classList.remove("opacity-0", "translate-y-4")
      }
    }, index * 150)

    return () => clearTimeout(timer)
  }, [index])

  const toggleLike = (e) => {
    e.preventDefault()
    const icon = e.currentTarget.querySelector("i")
    if (!liked) {
      setLiked(true)
      if (icon) {
        icon.classList.remove("far")
        icon.classList.add("fas", "text-uiu-blue", "animate-bounce-slight")
        setTimeout(() => {
          icon.classList.remove("animate-bounce-slight")
        }, 1000)
      }
    } else {
      setLiked(false)
      if (icon) {
        icon.classList.remove("fas", "text-uiu-blue")
        icon.classList.add("far")
      }
    }
  }

  return (
    <div
      ref={cardRef}
      className="glass-card bg-white rounded-2xl p-4 shadow-sm opacity-0 transform translate-y-4 transition-all duration-500 ease-out post-item"
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <img
            src={post.avatar || "https://i.pravatar.cc/150?u=default"}
            alt={post.name}
            className="w-10 h-10 rounded-full object-cover border border-gray-200"
          />
          <div>
            <h4 className="font-bold text-gray-800 text-sm hover:underline cursor-pointer">{post.name || "Unknown User"}</h4>
            <p className="text-xs text-gray-500">
              {post.time || "Just now"} • <i className="fas fa-globe-americas"></i>
            </p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <i className="fas fa-ellipsis-h"></i>
        </button>
      </div>

      {post.content && (
        <p className="mt-3 text-sm text-gray-800 leading-relaxed">
          <HashtagParser text={post.content} />
        </p>
      )}

      {post.image && (
        <div
          className="mt-3 rounded-xl overflow-hidden shadow-sm cursor-pointer group relative"
          onClick={() => {
            const images = Array.isArray(post.image) ? post.image : [post.image]
            setGalleryImages(images)
            setShowGallery(true)
          }}
        >
          <img
            src={post.image || "https://via.placeholder.com/800"}
            alt="post"
            className="w-full object-cover max-h-96 group-hover:opacity-90 transition-opacity"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none rounded-xl"></div>
        </div>
      )}

      {/* Multiple Images Grid */}
      {post.images && post.images.length > 0 && (
        <div className="mt-3 grid grid-cols-2 gap-2 rounded-xl overflow-hidden">
          {post.images.slice(0, 4).map((img, idx) => (
            <div
              key={idx}
              onClick={() => {
                setGalleryImages(post.images)
                setShowGallery(true)
              }}
              className={`relative cursor-pointer group ${
                post.images.length === 1
                  ? "col-span-2"
                  : post.images.length === 3 && idx === 0
                  ? "col-span-2 row-span-2"
                  : ""
              }`}
            >
              <img
                src={img}
                alt={`Post image ${idx + 1}`}
                className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                style={{ height: post.images.length === 1 ? "400px" : "200px" }}
              />
              {idx === 3 && post.images.length > 4 && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-bold text-xl">
                  +{post.images.length - 4} more
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100 text-gray-500 text-sm">
        <div className="flex items-center gap-1">
          <div className="flex -space-x-2 overflow-hidden">
            <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white border border-white text-[10px]">
              <i className="fas fa-thumbs-up"></i>
            </div>
            <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white border border-white text-[10px]">
              <i className="fas fa-heart"></i>
            </div>
          </div>
          <span className="ml-2 text-xs hover:underline cursor-pointer">{post.likes || 0}</span>
        </div>
        <div className="flex gap-3 text-xs">
          <span className="hover:underline cursor-pointer">{post.comments || 0} Comments</span>
          <span className="hover:underline cursor-pointer">{post.shares || 0} Shares</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mt-3 pt-2">
        <button
          onClick={toggleLike}
          className="flex items-center justify-center gap-2 py-2 hover:bg-gray-50 rounded-lg transition-colors group"
        >
          <i
            className={`${liked ? "fas" : "far"} fa-thumbs-up ${liked ? "text-uiu-blue" : "group-hover:text-uiu-blue"} transition-colors transform group-active:scale-125`}
          ></i>
          <span className={`text-xs font-medium ${liked ? "text-uiu-blue" : "group-hover:text-uiu-blue"}`}>Like</span>
        </button>
        <button
          onClick={() => setShowComments(!showComments)}
          className={`flex items-center justify-center gap-2 py-2 hover:bg-gray-50 rounded-lg transition-colors group ${
            showComments ? "bg-gray-50" : ""
          }`}
        >
          <i className={`far fa-comment ${showComments ? "text-uiu-blue" : "group-hover:text-gray-700"}`}></i>
          <span className={`text-xs font-medium ${showComments ? "text-uiu-blue" : "group-hover:text-gray-700"}`}>Comment</span>
        </button>
        <button
          onClick={() => setShowShareModal(true)}
          className="flex items-center justify-center gap-2 py-2 hover:bg-gray-50 rounded-lg transition-colors group"
        >
          <i className="fas fa-share group-hover:text-gray-700"></i>
          <span className="text-xs font-medium group-hover:text-gray-700">Share</span>
        </button>
      </div>

      {/* Comments Section */}
      {showComments && <Comments postId={post.id || index} initialComments={mockComments} />}

      {/* Image Gallery */}
      {showGallery && galleryImages.length > 0 && (
        <ImageGallery images={galleryImages} initialIndex={0} onClose={() => setShowGallery(false)} />
      )}

      {/* Share Modal */}
      {showShareModal && <ShareModal post={post} onClose={() => setShowShareModal(false)} />}
    </div>
  )
}
