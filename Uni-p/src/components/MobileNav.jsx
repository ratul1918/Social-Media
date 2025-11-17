import { useState } from "react"

export default function MobileNav({ onCreatePost, activeView, onViewChange }) {
  const [showMore, setShowMore] = useState(false)

  const handleClick = (e, view) => {
    e.preventDefault()
    onViewChange(view)
  }

  return (
    <>
      <div className="lg:hidden fixed bottom-0 w-full bg-white border-t border-gray-200 flex justify-around items-center py-2 z-30 safe-area-bottom">
        <button
          onClick={(e) => handleClick(e, "feed")}
          className={`flex flex-col items-center transition-all duration-300 ${
            activeView === "feed"
              ? "text-uiu-blue transform scale-110"
              : "text-gray-400 hover:text-uiu-blue"
          }`}
          title="Feed"
        >
          <i className={`fas fa-home text-xl mb-1 transition-transform duration-300 ${activeView === "feed" ? "scale-110" : ""}`}></i>
        </button>
        <button
          onClick={(e) => handleClick(e, "connections")}
          className={`flex flex-col items-center transition-all duration-300 ${
            activeView === "connections"
              ? "text-uiu-blue transform scale-110"
              : "text-gray-400 hover:text-uiu-blue"
          }`}
          title="Connections"
        >
          <i className={`fas fa-user-friends text-xl mb-1 transition-transform duration-300 ${activeView === "connections" ? "scale-110" : ""}`}></i>
        </button>
        <div className="relative -top-6">
          <div
            onClick={onCreatePost}
            className="w-12 h-12 bg-uiu-crimson rounded-full flex items-center justify-center text-white shadow-lg shadow-orange-500/40 transform active:scale-90 transition-all cursor-pointer hover:scale-110"
          >
            <i className="fas fa-plus text-lg"></i>
          </div>
        </div>
        <button
          onClick={(e) => handleClick(e, "groups")}
          className={`flex flex-col items-center transition-all duration-300 ${
            activeView === "groups"
              ? "text-uiu-blue transform scale-110"
              : "text-gray-400 hover:text-uiu-blue"
          }`}
          title="Groups"
        >
          <i className={`fas fa-users text-xl mb-1 transition-transform duration-300 ${activeView === "groups" ? "scale-110" : ""}`}></i>
        </button>
        <button
          onClick={() => setShowMore(!showMore)}
          className={`flex flex-col items-center transition-all duration-300 ${
            showMore || activeView === "events" || activeView === "saved"
              ? "text-uiu-blue"
              : "text-gray-400 hover:text-uiu-blue"
          }`}
          title="More"
        >
          <i className={`fas ${showMore ? "fa-times" : "fa-ellipsis-h"} text-xl mb-1 transition-transform duration-300 ${showMore ? "scale-110" : ""}`}></i>
        </button>
      </div>

          {/* More Menu */}
          {showMore && (
            <div className="lg:hidden fixed bottom-20 right-4 bg-white rounded-2xl shadow-xl border border-gray-200 p-2 z-[40] animate-fade-in-up max-h-96 overflow-y-auto">
              <button
                onClick={(e) => {
                  handleClick(e, "events")
                  setShowMore(false)
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  activeView === "events"
                    ? "bg-uiu-blue text-white"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <i className="fas fa-calendar-alt"></i>
                <span>Events</span>
              </button>
              <button
                onClick={(e) => {
                  handleClick(e, "saved")
                  setShowMore(false)
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  activeView === "saved"
                    ? "bg-uiu-blue text-white"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <i className="fas fa-bookmark"></i>
                <span>Saved</span>
              </button>
              <button
                onClick={(e) => {
                  handleClick(e, "jobs")
                  setShowMore(false)
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  activeView === "jobs"
                    ? "bg-uiu-blue text-white"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <i className="fas fa-briefcase"></i>
                <span>Job Board</span>
              </button>
              <button
                onClick={(e) => {
                  handleClick(e, "alumni")
                  setShowMore(false)
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  activeView === "alumni"
                    ? "bg-uiu-blue text-white"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <i className="fas fa-user-graduate"></i>
                <span>Alumni</span>
              </button>
              <button
                onClick={(e) => {
                  handleClick(e, "marketplace")
                  setShowMore(false)
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  activeView === "marketplace"
                    ? "bg-uiu-blue text-white"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <i className="fas fa-shopping-cart"></i>
                <span>Marketplace</span>
              </button>
              <button
                onClick={(e) => {
                  handleClick(e, "study-groups")
                  setShowMore(false)
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  activeView === "study-groups"
                    ? "bg-uiu-blue text-white"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <i className="fas fa-book-reader"></i>
                <span>Study Groups</span>
              </button>
            </div>
          )}

      {/* Backdrop */}
      {showMore && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-20 z-[35]"
          onClick={() => setShowMore(false)}
        ></div>
      )}
    </>
  )
}
