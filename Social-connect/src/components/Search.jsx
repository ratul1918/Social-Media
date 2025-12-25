import { useState, useEffect, useRef } from "react"

export default function Search({ onClose, onViewChange }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState("all")
  const [searchResults, setSearchResults] = useState({
    users: [],
    posts: [],
    groups: [],
    events: [],
  })
  const [isSearching, setIsSearching] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      setIsSearching(true)
      // Simulate search delay
      const timer = setTimeout(() => {
        performSearch(searchQuery)
        setIsSearching(false)
      }, 300)

      return () => clearTimeout(timer)
    } else {
      setSearchResults({ users: [], posts: [], groups: [], events: [] })
    }
  }, [searchQuery])

  const performSearch = (query) => {
    // Mock search results
    const mockUsers = [
      { id: 1, name: "John Doe", studentId: "011233055", department: "CSE", avatar: "https://i.pravatar.cc/150?u=1" },
      { id: 2, name: "Jane Smith", studentId: "011233056", department: "BBA", avatar: "https://i.pravatar.cc/150?u=2" },
      { id: 3, name: "Mike Johnson", studentId: "011233057", department: "EEE", avatar: "https://i.pravatar.cc/150?u=3" },
    ]

    const mockPosts = [
      {
        id: 1,
        content: "Just finished my final year project!",
        author: "John Doe",
        avatar: "https://i.pravatar.cc/150?u=1",
        time: "2 hours ago",
        likes: 45,
      },
      {
        id: 2,
        content: "Looking for study partners for Data Structures exam",
        author: "Jane Smith",
        avatar: "https://i.pravatar.cc/150?u=2",
        time: "5 hours ago",
        likes: 12,
      },
    ]

    const mockGroups = [
      { id: 1, name: "CSE Study Group", members: 125, avatar: "https://i.pravatar.cc/150?u=cse" },
      { id: 2, name: "Web Development Club", members: 89, avatar: "https://i.pravatar.cc/150?u=web" },
    ]

    const mockEvents = [
      { id: 1, title: "Hackathon 2024", date: "2024-03-15", location: "Main Campus", attendees: 245 },
      { id: 2, title: "Career Fair", date: "2024-03-25", location: "Convention Center", attendees: 520 },
    ]

    // Filter based on query (mock filtering)
    const filteredUsers = mockUsers.filter((user) =>
      user.name.toLowerCase().includes(query.toLowerCase()) ||
      user.studentId.includes(query) ||
      user.department.toLowerCase().includes(query.toLowerCase())
    )

    const filteredPosts = mockPosts.filter((post) => post.content.toLowerCase().includes(query.toLowerCase()))

    const filteredGroups = mockGroups.filter((group) => group.name.toLowerCase().includes(query.toLowerCase()))

    const filteredEvents = mockEvents.filter((event) => event.title.toLowerCase().includes(query.toLowerCase()))

    setSearchResults({
      users: filteredUsers,
      posts: filteredPosts,
      groups: filteredGroups,
      events: filteredEvents,
    })
  }

  const handleUserClick = (userId) => {
    if (onViewChange) {
      onViewChange("profile")
    }
    if (onClose) {
      onClose()
    }
  }

  const displayResults = () => {
    if (activeFilter === "all") {
      return {
        users: searchResults.users.slice(0, 3),
        posts: searchResults.posts.slice(0, 3),
        groups: searchResults.groups.slice(0, 2),
        events: searchResults.events.slice(0, 2),
      }
    }
    return {
      [activeFilter]: searchResults[activeFilter] || [],
    }
  }

  const results = displayResults()
  const hasResults = Object.values(results).some((arr) => arr.length > 0)

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-0" onClick={onClose}></div>
      <div
        className="absolute top-20 left-1/2 transform -translate-x-1/2 w-full max-w-2xl bg-white rounded-2xl shadow-2xl max-h-[80vh] overflow-hidden animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <i className="fas fa-search text-gray-400"></i>
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for students, posts, groups, events..."
              className="flex-1 text-lg outline-none border-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
              >
                <i className="fas fa-times text-sm"></i>
              </button>
            )}
          </div>

          {/* Filters */}
          {searchQuery && (
            <div className="flex gap-2 mt-3 overflow-x-auto no-scrollbar">
              {[
                { key: "all", label: "All", icon: "fa-th" },
                { key: "users", label: "People", icon: "fa-user" },
                { key: "posts", label: "Posts", icon: "fa-file-alt" },
                { key: "groups", label: "Groups", icon: "fa-users" },
                { key: "events", label: "Events", icon: "fa-calendar" },
              ].map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setActiveFilter(filter.key)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                    activeFilter === filter.key
                      ? "bg-uiu-blue text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <i className={`fas ${filter.icon} mr-2`}></i>
                  {filter.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Search Results */}
        <div className="overflow-y-auto max-h-[60vh] p-4">
          {isSearching ? (
            <div className="flex items-center justify-center py-12">
              <div className="loader"></div>
            </div>
          ) : searchQuery.trim().length === 0 ? (
            <div className="text-center py-12">
              <i className="fas fa-search text-6xl text-gray-300 mb-4"></i>
              <p className="text-gray-500">Start typing to search...</p>
            </div>
          ) : !hasResults ? (
            <div className="text-center py-12">
              <i className="fas fa-search text-6xl text-gray-300 mb-4"></i>
              <p className="text-gray-500">No results found for "{searchQuery}"</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Users Results */}
              {(activeFilter === "all" || activeFilter === "users") && results.users && results.users.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-gray-400 uppercase mb-3">People</h3>
                  <div className="space-y-2">
                    {results.users.map((user) => (
                      <button
                        key={user.id}
                        onClick={() => handleUserClick(user.id)}
                        className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
                      >
                        <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full object-cover" />
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800">{user.name}</h4>
                          <p className="text-sm text-gray-500">
                            {user.studentId} • {user.department}
                          </p>
                        </div>
                        <i className="fas fa-chevron-right text-gray-400"></i>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Posts Results */}
              {(activeFilter === "all" || activeFilter === "posts") && results.posts && results.posts.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-gray-400 uppercase mb-3">Posts</h3>
                  <div className="space-y-3">
                    {results.posts.map((post) => (
                      <div key={post.id} className="p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-2 mb-2">
                          <img src={post.avatar} alt={post.author} className="w-8 h-8 rounded-full object-cover" />
                          <div>
                            <h4 className="font-semibold text-sm text-gray-800">{post.author}</h4>
                            <p className="text-xs text-gray-500">{post.time}</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 line-clamp-2">{post.content}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                          <span>
                            <i className="fas fa-thumbs-up mr-1"></i>
                            {post.likes}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Groups Results */}
              {(activeFilter === "all" || activeFilter === "groups") && results.groups && results.groups.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-gray-400 uppercase mb-3">Groups</h3>
                  <div className="space-y-2">
                    {results.groups.map((group) => (
                      <button
                        key={group.id}
                        onClick={() => {
                          if (onViewChange) {
                            onViewChange("groups")
                          }
                          if (onClose) {
                            onClose()
                          }
                        }}
                        className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
                      >
                        <img src={group.avatar} alt={group.name} className="w-12 h-12 rounded-full object-cover" />
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800">{group.name}</h4>
                          <p className="text-sm text-gray-500">{group.members} members</p>
                        </div>
                        <i className="fas fa-chevron-right text-gray-400"></i>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Events Results */}
              {(activeFilter === "all" || activeFilter === "events") && results.events && results.events.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-gray-400 uppercase mb-3">Events</h3>
                  <div className="space-y-2">
                    {results.events.map((event) => (
                      <button
                        key={event.id}
                        onClick={() => {
                          if (onViewChange) {
                            onViewChange("events")
                          }
                          if (onClose) {
                            onClose()
                          }
                        }}
                        className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
                      >
                        <div className="w-12 h-12 bg-uiu-blue rounded-lg flex items-center justify-center text-white">
                          <i className="fas fa-calendar"></i>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800">{event.title}</h4>
                          <p className="text-sm text-gray-500">
                            {event.date} • {event.location}
                          </p>
                          <p className="text-xs text-gray-400">{event.attendees} going</p>
                        </div>
                        <i className="fas fa-chevron-right text-gray-400"></i>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

