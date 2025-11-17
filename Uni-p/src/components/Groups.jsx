import { useState, useEffect } from "react"

export default function Groups() {
  const [myGroups, setMyGroups] = useState([])
  const [discoverGroups, setDiscoverGroups] = useState([])
  const [activeTab, setActiveTab] = useState("my")

  useEffect(() => {
    // Mock data for my groups
    setMyGroups([
      {
        id: 1,
        name: "UIU Computer Science Forum",
        avatar: "https://i.pravatar.cc/150?u=cse",
        description: "Discussion forum for CSE students",
        members: 1250,
        posts: "2.5K",
        isAdmin: false,
        cover: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      },
      {
        id: 2,
        name: "Photography Club",
        avatar: "https://i.pravatar.cc/150?u=photo",
        description: "Share your photography and get feedback",
        members: 450,
        posts: "890",
        isAdmin: true,
        cover: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      },
      {
        id: 3,
        name: "Study Group - Data Structures",
        avatar: "https://i.pravatar.cc/150?u=ds",
        description: "Study together and solve problems",
        members: 85,
        posts: "120",
        isAdmin: false,
        cover: null,
      },
    ])

    // Mock data for discover groups
    setDiscoverGroups([
      {
        id: 4,
        name: "UIU Hackathon Community",
        avatar: "https://i.pravatar.cc/150?u=hack",
        description: "Join hackathons and coding competitions",
        members: 890,
        posts: "1.2K",
        isPrivate: false,
        cover: "https://images.unsplash.com/photo-1504384308090-c54be3855833?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      },
      {
        id: 5,
        name: "AI & Machine Learning",
        avatar: "https://i.pravatar.cc/150?u=ai",
        description: "Discuss AI, ML, and Deep Learning",
        members: 650,
        posts: "980",
        isPrivate: false,
        cover: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      },
      {
        id: 6,
        name: "UIU Sports Club",
        avatar: "https://i.pravatar.cc/150?u=sports",
        description: "Stay active and join sports events",
        members: 320,
        posts: "450",
        isPrivate: true,
        cover: "https://images.unsplash.com/photo-1576678927484-cc907957088c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      },
      {
        id: 7,
        name: "Web Development Bootcamp",
        avatar: "https://i.pravatar.cc/150?u=web",
        description: "Learn web development together",
        members: 1120,
        posts: "2.1K",
        isPrivate: false,
        cover: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      },
    ])
  }, [])

  const handleJoin = (id) => {
    const group = discoverGroups.find((g) => g.id === id)
    if (group) {
      setDiscoverGroups(discoverGroups.filter((g) => g.id !== id))
      setMyGroups([...myGroups, { ...group, isAdmin: false }])
    }
  }

  const handleLeave = (id) => {
    const group = myGroups.find((g) => g.id === id)
    if (group) {
      setMyGroups(myGroups.filter((g) => g.id !== id))
      setDiscoverGroups([...discoverGroups, { ...group, isPrivate: false }])
    }
  }

  const displayData = activeTab === "my" ? myGroups : discoverGroups

  return (
    <main
      className="flex-1 max-w-2xl h-full overflow-y-auto pb-20 scroll-smooth no-scrollbar relative"
    >
      <div className="py-6 px-4">
        {/* Header */}
        <div className="mb-6 animate-fade-in-up">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Groups</h1>
          <p className="text-sm text-gray-500">Join groups and connect with like-minded people</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar animate-slide-in-right">
          <button
            onClick={() => setActiveTab("my")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
              activeTab === "my"
                ? "bg-uiu-blue text-white shadow-md"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            My Groups ({myGroups.length})
          </button>
          <button
            onClick={() => setActiveTab("discover")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
              activeTab === "discover"
                ? "bg-uiu-blue text-white shadow-md"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            Discover ({discoverGroups.length})
          </button>
        </div>

        {/* Group Cards */}
        <div className="space-y-4">
          {displayData.map((group, idx) => (
            <div
              key={group.id}
              className="bg-white rounded-2xl shadow-sm overflow-hidden animate-fade-in-up"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {/* Cover Image */}
              {group.cover && (
                <div className="h-32 w-full overflow-hidden">
                  <img
                    src={group.cover}
                    alt={group.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
              )}
              
              <div className="p-4">
                <div className="flex items-start gap-4">
                  <img
                    src={group.avatar}
                    alt={group.name}
                    className={`w-16 h-16 rounded-full object-cover border-2 border-white ${group.cover ? "-mt-8 bg-white" : ""}`}
                  />
                  <div className="flex-1 mt-2">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-gray-800 hover:text-uiu-blue cursor-pointer transition-colors">
                        {group.name}
                      </h3>
                      {group.isPrivate && (
                        <i className="fas fa-lock text-gray-400 text-xs" title="Private Group"></i>
                      )}
                      {group.isAdmin && (
                        <span className="px-2 py-0.5 bg-uiu-blue text-white text-xs rounded-full">Admin</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mb-3">{group.description}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                      <span>
                        <i className="fas fa-users mr-1"></i>
                        {group.members.toLocaleString()} members
                      </span>
                      <span>
                        <i className="fas fa-comments mr-1"></i>
                        {group.posts} posts
                      </span>
                    </div>
                    <div className="flex gap-2">
                      {activeTab === "my" ? (
                        <>
                          <button className="flex-1 px-4 py-2 bg-uiu-blue text-white rounded-lg text-sm font-medium hover:bg-uiu-lightBlue transition-colors">
                            <i className="fas fa-door-open mr-2"></i>Open
                          </button>
                          <button
                            onClick={() => handleLeave(group.id)}
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                          >
                            <i className="fas fa-sign-out-alt"></i>
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handleJoin(group.id)}
                          className="flex-1 px-4 py-2 bg-uiu-blue text-white rounded-lg text-sm font-medium hover:bg-uiu-lightBlue transition-colors"
                        >
                          <i className="fas fa-user-plus mr-2"></i>Join Group
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {displayData.length === 0 && (
          <div className="text-center py-12 animate-fade-in-up">
            <i className="fas fa-users text-6xl text-gray-300 mb-4"></i>
            <p className="text-gray-500">No groups found</p>
          </div>
        )}
      </div>
    </main>
  )
}

