import { useState, useRef, useEffect } from "react"
import Search from "./Search"
import ProfileSettings from "./ProfileSettings"

export default function Navbar({ onViewChange, activeView }) {
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const profileMenuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target)) {
        setShowProfileMenu(false)
        setShowNotifications(false)
      }
    }
    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [])

  const handleProfileClick = () => {
    if (onViewChange) {
      onViewChange("profile")
    }
    setShowProfileMenu(false)
  }

  return (
    <nav className="glass-panel sticky top-0 z-30 px-4 md:px-8 py-3 flex justify-between items-center shadow-sm">
      {/* Logo */}
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => {
          window.scrollTo(0, 0)
          if (onViewChange) {
            onViewChange("feed")
          }
        }}
      >
        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
          U
        </div>
        <span className="font-bold text-xl text-blue-600 tracking-tight hidden sm:block">
          unip
        </span>
      </div>

      {/* Search */}
      <div className="hidden md:flex flex-1 max-w-lg mx-8 relative">
        <button
          onClick={() => setShowSearch(true)}
          className="w-full flex items-center gap-3 pl-10 pr-4 py-2.5 rounded-full bg-gray-100 border-none hover:bg-gray-200 focus:bg-white focus:shadow-md transition-all-300 text-sm text-left text-gray-500"
        >
          <i className="fas fa-search absolute left-4 text-gray-400"></i>
          <span>Search for students, faculty, or posts...</span>
        </button>
      </div>

      {/* Right Icons */}
      <div className="flex items-center gap-4 md:gap-6">
        {/* Notifications */}
        <div className="relative">
              <button
                onClick={() => {
                  if (onViewChange) {
                    onViewChange("notifications")
                  }
                  setShowNotifications(false)
                  setShowProfileMenu(false)
                }}
                className="relative text-gray-500 hover:text-uiu-blue transition-colors"
              >
                <i className="fas fa-bell text-xl"></i>
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-uiu-crimson text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  3
                </span>
              </button>
          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 p-4 z-50 animate-fade-in-up">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-gray-800">Notifications</h3>
                <button className="text-sm text-uiu-blue hover:underline">Mark all as read</button>
              </div>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                    <div className="flex gap-3">
                      <img
                        src={`https://i.pravatar.cc/150?u=${i}`}
                        alt="user"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <p className="text-sm text-gray-800">
                          <span className="font-semibold">John Doe</span> liked your post
                        </p>
                        <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-3 text-sm text-uiu-blue font-medium hover:underline">
                See all notifications
              </button>
            </div>
          )}
        </div>

            {/* Messages */}
            <button
              onClick={() => {
                if (onViewChange) {
                  onViewChange("messages")
                }
              }}
              className="text-gray-500 hover:text-uiu-blue transition-colors hidden sm:block relative"
            >
              <i className="fas fa-comment-dots text-xl"></i>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-uiu-crimson text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                2
              </span>
            </button>

        {/* Profile Dropdown */}
        <div className="relative" ref={profileMenuRef}>
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu)
              setShowNotifications(false)
            }}
            className="w-9 h-9 rounded-full bg-gradient-to-tr from-uiu-blue to-uiu-crimson p-[2px] cursor-pointer hover:ring-2 hover:ring-uiu-blue transition-all"
          >
            <img
              src="https://i.pravatar.cc/150?u=uiu"
              alt="Profile"
              className="w-full h-full rounded-full border-2 border-white object-cover"
            />
          </button>
          {showProfileMenu && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50 animate-fade-in-up">
              <button
                onClick={handleProfileClick}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3"
              >
                <i className="fas fa-user text-gray-400 w-5"></i>
                <span className="text-sm font-medium text-gray-700">My Profile</span>
              </button>
              <button
                onClick={() => {
                  setShowSettings(true)
                  setShowProfileMenu(false)
                }}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3"
              >
                <i className="fas fa-cog text-gray-400 w-5"></i>
                <span className="text-sm font-medium text-gray-700">Settings</span>
              </button>
              <button
                onClick={() => {
                  if (onViewChange) {
                    onViewChange("saved")
                  }
                  setShowProfileMenu(false)
                }}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3"
              >
                <i className="fas fa-bookmark text-gray-400 w-5"></i>
                <span className="text-sm font-medium text-gray-700">Saved</span>
              </button>
              <hr className="my-2 border-gray-200" />
              <button className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 text-red-500">
                <i className="fas fa-sign-out-alt w-5"></i>
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Search Modal */}
      {showSearch && <Search onClose={() => setShowSearch(false)} onViewChange={onViewChange} />}

      {/* Settings Modal */}
      {showSettings && <ProfileSettings onClose={() => setShowSettings(false)} />}
    </nav>
  )
}
