import { useState, useEffect } from "react"
import PostCard from "./PostCard"
import ProfileSettings from "./ProfileSettings"

export default function Profile({ userId, isOwnProfile = false }) {
  const [activeTab, setActiveTab] = useState("posts")
  const [profile, setProfile] = useState(null)
  const [posts, setPosts] = useState([])
  const [friends, setFriends] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [showSettings, setShowSettings] = useState(false)

  useEffect(() => {
    // Mock profile data
    setProfile({
      id: userId || "1",
      name: "Rafiur Rahman",
      studentId: "011233055",
      email: "rafiur.rahman@uiu.ac.bd",
      avatar: "https://i.pravatar.cc/150?u=uiu",
      coverPhoto: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      bio: "Computer Science Student at UIU | Passionate about Web Development | Always learning something new 🚀",
      department: "CSE",
      batch: "2020",
      semester: "8th",
      location: "Dhaka, Bangladesh",
      joinDate: "2020",
      isPrivate: false,
      friendCount: 245,
      postCount: 89,
      mutualFriends: 12,
      isFriend: true,
    })

    // Mock posts
    setPosts([
      {
        name: "Rafiur Rahman",
        time: "2 hours ago",
        avatar: "https://i.pravatar.cc/150?u=uiu",
        content:
          "Just finished my final year project! It's been an incredible journey. Thanks to everyone who supported me along the way. 🎓✨",
        image:
          "https://images.unsplash.com/photo-1504384308090-c54be3855833?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        likes: 342,
        comments: 67,
        shares: 23,
      },
      {
        name: "Rafiur Rahman",
        time: "Yesterday",
        avatar: "https://i.pravatar.cc/150?u=uiu",
        content:
          "Excited to share that I'll be presenting my research paper at the upcoming conference! 🎉",
        image: null,
        likes: 189,
        comments: 45,
        shares: 12,
      },
    ])

    // Mock friends
    setFriends([
      { id: 1, name: "Jane Smith", avatar: "https://i.pravatar.cc/150?u=1", mutual: 5 },
      { id: 2, name: "Mike Johnson", avatar: "https://i.pravatar.cc/150?u=2", mutual: 3 },
      { id: 3, name: "Sarah Williams", avatar: "https://i.pravatar.cc/150?u=3", mutual: 8 },
      { id: 4, name: "David Brown", avatar: "https://i.pravatar.cc/150?u=4", mutual: 2 },
      { id: 5, name: "Emma Davis", avatar: "https://i.pravatar.cc/150?u=5", mutual: 7 },
      { id: 6, name: "Chris Wilson", avatar: "https://i.pravatar.cc/150?u=6", mutual: 4 },
    ])

    setIsLoading(false)
  }, [userId])

  if (isLoading || !profile) {
    return (
      <main className="flex-1 max-w-2xl h-full overflow-y-auto pb-20 scroll-smooth no-scrollbar relative">
        <div className="flex items-center justify-center h-full">
          <div className="loader"></div>
        </div>
      </main>
    )
  }

  return (
    <main className="flex-1 max-w-2xl h-full overflow-y-auto pb-20 scroll-smooth no-scrollbar relative">
      {/* Cover Photo */}
      <div className="relative h-64 w-full overflow-hidden bg-gradient-to-br from-uiu-blue to-uiu-crimson">
        <img
          src={profile.coverPhoto || "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        {isOwnProfile && (
          <button className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-gray-700 px-4 py-2 rounded-lg font-medium transition-all shadow-md flex items-center gap-2">
            <i className="fas fa-camera"></i>
            Edit Cover Photo
          </button>
        )}
      </div>

      <div className="px-4 pb-6">
        {/* Profile Info Section */}
        <div className="relative -mt-8 sm:-mt-12 md:-mt-16 lg:-mt-20 mb-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div className="flex flex-col md:flex-row md:items-end gap-4">
              {/* Profile Picture */}
              <div className="relative">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
                />
                {isOwnProfile && (
                  <button className="absolute bottom-0 right-0 w-10 h-10 bg-uiu-blue text-white rounded-full flex items-center justify-center shadow-md hover:bg-uiu-lightBlue transition-colors">
                    <i className="fas fa-camera text-sm"></i>
                  </button>
                )}
              </div>

              {/* Profile Details */}
              <div className="pt-2 mt-2 sm:mt-3 md:mt-4 max-w-full relative z-10">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-1 leading-tight break-words">
                  {profile.name}
                </h1>
                <p className="text-xs sm:text-sm text-gray-500 mb-2 leading-snug break-words mt-3 sm:mt-4 md:mt-5 lg:mt-6">
                  {profile.studentId} • {profile.department} • Batch {profile.batch}
                </p>
                <p className="text-sm md:text-base text-gray-600 mb-2 leading-snug break-words">
                  {profile.bio}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <i className="fas fa-map-marker-alt"></i>
                    {profile.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <i className="fas fa-users"></i>
                    {profile.friendCount} friends
                  </span>
                  {!isOwnProfile && profile.mutualFriends > 0 && (
                    <span className="flex items-center gap-1 text-uiu-blue">
                      <i className="fas fa-user-friends"></i>
                      {profile.mutualFriends} mutual friends
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              {isOwnProfile ? (
                <button
                  onClick={() => setShowSettings(true)}
                  className="px-6 py-2 bg-uiu-blue text-white rounded-lg font-medium hover:bg-uiu-lightBlue transition-colors flex items-center gap-2"
                >
                  <i className="fas fa-edit"></i>
                  Edit Profile
                </button>
              ) : (
                <>
                  {profile.isFriend ? (
                    <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center gap-2">
                      <i className="fas fa-user-check"></i>
                      Friends
                    </button>
                  ) : (
                    <button className="px-6 py-2 bg-uiu-blue text-white rounded-lg font-medium hover:bg-uiu-lightBlue transition-colors flex items-center gap-2">
                      <i className="fas fa-user-plus"></i>
                      Add Friend
                    </button>
                  )}
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                    <i className="fas fa-envelope"></i>
                  </button>
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                    <i className="fas fa-ellipsis-h"></i>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar border-b border-gray-200">
          <button
            onClick={() => setActiveTab("posts")}
            className={`px-4 py-3 font-medium text-sm transition-all duration-300 whitespace-nowrap border-b-2 ${
              activeTab === "posts"
                ? "border-uiu-blue text-uiu-blue"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Posts ({profile.postCount})
          </button>
          <button
            onClick={() => setActiveTab("about")}
            className={`px-4 py-3 font-medium text-sm transition-all duration-300 whitespace-nowrap border-b-2 ${
              activeTab === "about"
                ? "border-uiu-blue text-uiu-blue"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            About
          </button>
          <button
            onClick={() => setActiveTab("friends")}
            className={`px-4 py-3 font-medium text-sm transition-all duration-300 whitespace-nowrap border-b-2 ${
              activeTab === "friends"
                ? "border-uiu-blue text-uiu-blue"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Friends ({profile.friendCount})
          </button>
          <button
            onClick={() => setActiveTab("photos")}
            className={`px-4 py-3 font-medium text-sm transition-all duration-300 whitespace-nowrap border-b-2 ${
              activeTab === "photos"
                ? "border-uiu-blue text-uiu-blue"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Photos
          </button>
        </div>

        {/* Tab Content */}
        <div className="animate-fade-in-up">
          {activeTab === "posts" && (
            <div className="space-y-6">
              {posts.map((post, idx) => (
                <PostCard key={idx} post={post} index={idx} />
              ))}
              {posts.length === 0 && (
                <div className="text-center py-12">
                  <i className="fas fa-file-alt text-6xl text-gray-300 mb-4"></i>
                  <p className="text-gray-500">No posts yet</p>
                </div>
              )}
            </div>
          )}

          {activeTab === "about" && (
            <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
              <div>
                <h3 className="font-bold text-gray-800 mb-4">Basic Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <i className="fas fa-id-card text-gray-400 w-5"></i>
                    <div>
                      <p className="text-sm text-gray-500">Student ID</p>
                      <p className="font-medium text-gray-800">{profile.studentId}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="fas fa-envelope text-gray-400 w-5"></i>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium text-gray-800">{profile.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="fas fa-building text-gray-400 w-5"></i>
                    <div>
                      <p className="text-sm text-gray-500">Department</p>
                      <p className="font-medium text-gray-800">{profile.department}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="fas fa-calendar text-gray-400 w-5"></i>
                    <div>
                      <p className="text-sm text-gray-500">Batch</p>
                      <p className="font-medium text-gray-800">{profile.batch}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="fas fa-book text-gray-400 w-5"></i>
                    <div>
                      <p className="text-sm text-gray-500">Semester</p>
                      <p className="font-medium text-gray-800">{profile.semester}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="fas fa-map-marker-alt text-gray-400 w-5"></i>
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium text-gray-800">{profile.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="fas fa-clock text-gray-400 w-5"></i>
                    <div>
                      <p className="text-sm text-gray-500">Joined</p>
                      <p className="font-medium text-gray-800">{profile.joinDate}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "friends" && (
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {friends.map((friend) => (
                  <div
                    key={friend.id}
                    className="flex flex-col items-center p-4 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <img
                      src={friend.avatar}
                      alt={friend.name}
                      className="w-20 h-20 rounded-full object-cover mb-2 border-2 border-gray-200"
                    />
                    <h4 className="font-semibold text-sm text-gray-800 text-center mb-1">{friend.name}</h4>
                    {friend.mutual > 0 && (
                      <p className="text-xs text-gray-500 text-center">{friend.mutual} mutual friends</p>
                    )}
                  </div>
                ))}
              </div>
              {friends.length === 0 && (
                <div className="text-center py-12">
                  <i className="fas fa-users text-6xl text-gray-300 mb-4"></i>
                  <p className="text-gray-500">No friends yet</p>
                </div>
              )}
            </div>
          )}

          {activeTab === "photos" && (
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                  >
                    <img
                      src={`https://images.unsplash.com/photo-${1500000000000 + i}?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80`}
                      alt={`Photo ${i}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              {[1, 2, 3, 4, 5, 6].length === 0 && (
                <div className="text-center py-12">
                  <i className="fas fa-images text-6xl text-gray-300 mb-4"></i>
                  <p className="text-gray-500">No photos yet</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && <ProfileSettings onClose={() => setShowSettings(false)} />}
    </main>
  )
}

