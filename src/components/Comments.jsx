import { useState } from "react"

export default function Comments({ postId, initialComments = [] }) {
  const [comments, setComments] = useState(initialComments)
  const [newComment, setNewComment] = useState("")
  const [showComments, setShowComments] = useState(false)
  const [replyingTo, setReplyingTo] = useState(null)
  const [replyText, setReplyText] = useState("")

  const handleAddComment = (e) => {
    e.preventDefault()
    if (newComment.trim()) {
      const comment = {
        id: Date.now(),
        author: "You",
        avatar: "https://i.pravatar.cc/150?u=uiu",
        content: newComment,
        time: "Just now",
        likes: 0,
        replies: [],
      }
      setComments([...comments, comment])
      setNewComment("")
    }
  }

  const handleAddReply = (commentId, e) => {
    e.preventDefault()
    if (replyText.trim()) {
      const reply = {
        id: Date.now(),
        author: "You",
        avatar: "https://i.pravatar.cc/150?u=uiu",
        content: replyText,
        time: "Just now",
        likes: 0,
      }
      setComments(
        comments.map((comment) =>
          comment.id === commentId
            ? { ...comment, replies: [...(comment.replies || []), reply] }
            : comment
        )
      )
      setReplyText("")
      setReplyingTo(null)
    }
  }

  const toggleLike = (commentId, replyId = null) => {
    setComments(
      comments.map((comment) => {
        if (comment.id === commentId) {
          if (replyId) {
            return {
              ...comment,
              replies: (comment.replies || []).map((reply) =>
                reply.id === replyId ? { ...reply, likes: (reply.likes || 0) + 1 } : reply
              ),
            }
          } else {
            return { ...comment, likes: (comment.likes || 0) + 1 }
          }
        }
        return comment
      })
    )
  }

  return (
    <div className="mt-4 border-t border-gray-100 pt-4">
      {/* Comments Toggle */}
      <button
        onClick={() => setShowComments(!showComments)}
        className="text-sm text-gray-500 hover:text-gray-700 mb-4 flex items-center gap-2 transition-colors"
      >
        <i className={`fas fa-comments ${showComments ? "text-uiu-blue" : ""}`}></i>
        <span>{comments.length} {comments.length === 1 ? "comment" : "comments"}</span>
        <i className={`fas fa-chevron-${showComments ? "up" : "down"} text-xs`}></i>
      </button>

      {/* Comments List */}
      {showComments && (
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {/* Add Comment */}
          <form onSubmit={handleAddComment} className="flex gap-2">
            <img
              src="https://i.pravatar.cc/150?u=uiu"
              alt="You"
              className="w-8 h-8 rounded-full object-cover flex-shrink-0"
            />
            <div className="flex-1">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                className="w-full px-3 py-2 bg-gray-100 rounded-full text-sm focus:bg-white focus:ring-2 focus:ring-uiu-blue outline-none transition-all"
              />
            </div>
          </form>

          {/* Comments */}
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              <img
                src={comment.avatar}
                alt={comment.author}
                className="w-8 h-8 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1">
                <div className="bg-gray-50 rounded-2xl px-3 py-2">
                  <div className="flex items-center gap-2 mb-1">
                    <h5 className="font-semibold text-sm text-gray-800">{comment.author}</h5>
                    <span className="text-xs text-gray-500">{comment.time}</span>
                  </div>
                  <p className="text-sm text-gray-700">{comment.content}</p>
                </div>
                <div className="flex items-center gap-4 mt-1 ml-2">
                  <button
                    onClick={() => toggleLike(comment.id)}
                    className="text-xs text-gray-500 hover:text-uiu-blue transition-colors flex items-center gap-1"
                  >
                    <i className="far fa-thumbs-up"></i>
                    {comment.likes > 0 && <span>{comment.likes}</span>}
                  </button>
                  <button
                    onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                    className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    Reply
                  </button>
                </div>

                {/* Reply Input */}
                {replyingTo === comment.id && (
                  <form
                    onSubmit={(e) => handleAddReply(comment.id, e)}
                    className="flex gap-2 mt-2 ml-4"
                  >
                    <img
                      src="https://i.pravatar.cc/150?u=uiu"
                      alt="You"
                      className="w-6 h-6 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1">
                      <input
                        type="text"
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Write a reply..."
                        className="w-full px-3 py-1.5 bg-gray-100 rounded-full text-sm focus:bg-white focus:ring-2 focus:ring-uiu-blue outline-none transition-all"
                        autoFocus
                      />
                    </div>
                  </form>
                )}

                {/* Replies */}
                {comment.replies && comment.replies.length > 0 && (
                  <div className="ml-4 mt-2 space-y-2">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="flex gap-2">
                        <img
                          src={reply.avatar}
                          alt={reply.author}
                          className="w-6 h-6 rounded-full object-cover flex-shrink-0"
                        />
                        <div className="flex-1">
                          <div className="bg-gray-50 rounded-2xl px-3 py-2">
                            <div className="flex items-center gap-2 mb-1">
                              <h5 className="font-semibold text-xs text-gray-800">{reply.author}</h5>
                              <span className="text-xs text-gray-500">{reply.time}</span>
                            </div>
                            <p className="text-xs text-gray-700">{reply.content}</p>
                          </div>
                          <button
                            onClick={() => toggleLike(comment.id, reply.id)}
                            className="text-xs text-gray-500 hover:text-uiu-blue transition-colors flex items-center gap-1 mt-1 ml-2"
                          >
                            <i className="far fa-thumbs-up"></i>
                            {reply.likes > 0 && <span>{reply.likes}</span>}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {comments.length === 0 && (
            <p className="text-sm text-gray-500 text-center py-4">No comments yet. Be the first to comment!</p>
          )}
        </div>
      )}
    </div>
  )
}

