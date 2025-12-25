import { useState, useEffect, useRef } from "react"
import ImageUpload from "./ImageUpload"
import MentionAutocomplete from "./MentionAutocomplete"

export default function CreatePostModal({ onClose }) {
  const [content, setContent] = useState("")
  const [images, setImages] = useState([])
  const [privacy, setPrivacy] = useState("public")
  const [showPrivacyMenu, setShowPrivacyMenu] = useState(false)
  const [mentionQuery, setMentionQuery] = useState("")
  const [showMentions, setShowMentions] = useState(false)
  const [mentionPosition, setMentionPosition] = useState({ start: 0, end: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef(null)
  const textareaRef = useRef(null)

  useEffect(() => {
    // Trigger enter animation
    setIsVisible(true)
    setTimeout(() => {
      if (cardRef.current) {
        cardRef.current.classList.remove("translate-y-full", "scale-95", "opacity-0")
      }
    }, 10)

    // Close privacy menu when clicking outside
    const handleClickOutside = (e) => {
      if (showPrivacyMenu && !e.target.closest(".relative")) {
        setShowPrivacyMenu(false)
      }
    }
    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [showPrivacyMenu])

  const handleClose = () => {
    if (cardRef.current) {
      // Trigger exit animation
      cardRef.current.classList.add("translate-y-full", "scale-95", "opacity-0")
      setTimeout(() => {
        setIsVisible(false)
        onClose()
      }, 300)
    } else {
      onClose()
    }
  }

  const handlePost = () => {
    if (content.trim() || images.length > 0) {
      // Post would be submitted here
      // console.log("Posting:", { content, images, privacy })
      // Reset form
      setContent("")
      setImages([])
      setPrivacy("public")
      handleClose()
    }
  }

  const handleImagesChange = (newImages) => {
    setImages(newImages)
  }

  const privacyOptions = [
    { value: "public", icon: "fa-globe-americas", label: "Public" },
    { value: "friends", icon: "fa-users", label: "Friends" },
    { value: "only-me", icon: "fa-lock", label: "Only Me" },
  ]

  const selectedPrivacy = privacyOptions.find((opt) => opt.value === privacy) || privacyOptions[0]

  if (!isVisible) return null

  return (
    <div id="create-post-modal" className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            handleClose()
          }
        }}
      ></div>

      {/* Modal Content */}
      <div className="absolute inset-x-0 bottom-0 md:inset-0 md:flex md:items-center md:justify-center pointer-events-none">
        <div
          ref={cardRef}
          id="modal-card"
          className="bg-white w-full md:w-[500px] rounded-t-3xl md:rounded-2xl shadow-2xl transform transition-transform duration-300 translate-y-full md:translate-y-0 scale-95 opacity-0 pointer-events-auto"
        >
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-800">Create Post</h3>
            <button
              onClick={handleClose}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>

          {/* Body */}
          <div className="p-4">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="https://i.pravatar.cc/150?u=uiu"
                alt="user"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <h4 className="text-sm font-bold text-gray-800">John Doe</h4>
                <div className="relative">
                  <button
                    onClick={() => setShowPrivacyMenu(!showPrivacyMenu)}
                    className="flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded cursor-pointer hover:bg-gray-200 transition-colors"
                  >
                    <i className={`fas ${selectedPrivacy.icon} text-[10px]`}></i>
                    <span>{selectedPrivacy.label}</span>
                    <i className="fas fa-caret-down text-[10px]"></i>
                  </button>
                  {showPrivacyMenu && (
                    <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10 min-w-[150px]">
                      {privacyOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => {
                            setPrivacy(option.value)
                            setShowPrivacyMenu(false)
                          }}
                          className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors flex items-center gap-2 ${
                            privacy === option.value ? "text-uiu-blue font-medium" : "text-gray-700"
                          }`}
                        >
                          <i className={`fas ${option.icon} text-xs w-4`}></i>
                          {option.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="relative">
              <textarea
                ref={textareaRef}
                value={content}
                onChange={(e) => {
                  const value = e.target.value
                  setContent(value)

                  // Check for @ mentions
                  const cursorPos = e.target.selectionStart
                  const textBeforeCursor = value.substring(0, cursorPos)
                  const mentionMatch = textBeforeCursor.match(/@(\w*)$/)

                  if (mentionMatch) {
                    setMentionQuery(mentionMatch[1])
                    setShowMentions(true)
                    // Calculate position for autocomplete dropdown
                    const rect = e.target.getBoundingClientRect()
                    setMentionPosition({ start: cursorPos - mentionMatch[0].length, end: cursorPos })
                  } else {
                    setShowMentions(false)
                    setMentionQuery("")
                  }
                }}
                onKeyDown={(e) => {
                  if (showMentions && (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Enter")) {
                    e.preventDefault()
                  }
                }}
                className="w-full h-32 resize-none border-none text-lg placeholder-gray-400 focus:ring-0 p-0 outline-none"
                placeholder="What do you want to share? Use @ to mention someone, # for hashtags"
              />
              {showMentions && (
                <MentionAutocomplete
                  query={mentionQuery}
                  onSelect={(user) => {
                    const beforeMention = content.substring(0, mentionPosition.start)
                    const afterMention = content.substring(mentionPosition.end)
                    setContent(`${beforeMention}@${user.name} ${afterMention}`)
                    setShowMentions(false)
                    setMentionQuery("")
                    setTimeout(() => {
                      if (textareaRef.current) {
                        const newPos = mentionPosition.start + user.name.length + 2
                        textareaRef.current.setSelectionRange(newPos, newPos)
                        textareaRef.current.focus()
                      }
                    }, 0)
                  }}
                  onClose={() => setShowMentions(false)}
                />
              )}
            </div>

            {/* Image Upload */}
            {images.length > 0 && (
              <div className="mt-4">
                <ImageUpload
                  maxImages={5}
                  onImagesChange={handleImagesChange}
                  existingImages={images}
                />
              </div>
            )}

            {/* Rich Media Box */}
            <div className="border border-gray-200 rounded-xl p-3 flex justify-between items-center mt-4">
              <span className="text-sm font-semibold text-gray-600">Add to your post</span>
              <div className="flex gap-2">
                {images.length === 0 ? (
                  <button
                    onClick={() => {
                      const input = document.createElement("input")
                      input.type = "file"
                      input.accept = "image/*"
                      input.multiple = true
                      input.onchange = (e) => {
                        const files = Array.from(e.target.files).filter((file) => file.type.startsWith("image/"))
                        const newFiles = files.slice(0, 5)
                        if (newFiles.length > 0) {
                          handleImagesChange([...images, ...newFiles])
                        }
                      }
                      input.click()
                    }}
                    className="text-green-500 hover:bg-green-50 p-2 rounded-full transition-colors"
                    title="Add Photo"
                  >
                    <i className="fas fa-image text-xl"></i>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      if (images.length < 5) {
                        const input = document.createElement("input")
                        input.type = "file"
                        input.accept = "image/*"
                        input.multiple = true
                        input.onchange = (e) => {
                          const files = Array.from(e.target.files).filter((file) => file.type.startsWith("image/"))
                          const remaining = 5 - images.length
                          const newFiles = files.slice(0, remaining)
                          if (newFiles.length > 0) {
                            handleImagesChange([...images, ...newFiles])
                          }
                        }
                        input.click()
                      }
                    }}
                    className={`p-2 rounded-full transition-colors ${
                      images.length >= 5
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-green-500 hover:bg-green-50"
                    }`}
                    disabled={images.length >= 5}
                    title={images.length >= 5 ? "Maximum 5 images" : "Add More Photos"}
                  >
                    <i className="fas fa-image text-xl"></i>
                  </button>
                )}
                <button className="text-blue-500 hover:bg-blue-50 p-2 rounded-full transition-colors" title="Tag People">
                  <i className="fas fa-user-tag text-xl"></i>
                </button>
                <button className="text-yellow-500 hover:bg-yellow-50 p-2 rounded-full transition-colors" title="Feeling/Activity">
                  <i className="fas fa-smile text-xl"></i>
                </button>
                <button className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors" title="Location">
                  <i className="fas fa-map-marker-alt text-xl"></i>
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-100">
            <button
              onClick={handlePost}
              disabled={!content.trim() && images.length === 0}
              className="w-full bg-uiu-blue text-white font-bold py-3 rounded-xl hover:bg-uiu-lightBlue transition-all shadow-lg shadow-blue-900/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-uiu-blue"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
