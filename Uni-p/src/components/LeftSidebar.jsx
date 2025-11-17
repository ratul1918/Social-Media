export default function LeftSidebar({ activeView, onViewChange }) {
  const navItems = [
    { icon: "fa-home", label: "Feed", view: "feed" },
    { icon: "fa-user-friends", label: "Connections", view: "connections" },
    { icon: "fa-users", label: "Groups", view: "groups" },
    { icon: "fa-calendar-alt", label: "Events", view: "events" },
    { icon: "fa-bookmark", label: "Saved", view: "saved" },
  ]

  const moreItems = [
    { icon: "fa-briefcase", label: "Job Board", view: "jobs" },
    { icon: "fa-user-graduate", label: "Alumni Network", view: "alumni" },
    { icon: "fa-shopping-cart", label: "Marketplace", view: "marketplace" },
    { icon: "fa-book-reader", label: "Study Groups", view: "study-groups" },
  ]

  const shortcuts = [
    { icon: "fa-code", label: "CSE Forum", color: "blue" },
    { icon: "fa-camera", label: "Photography Club", color: "orange" },
  ]

  const handleClick = (e, view) => {
    e.preventDefault()
    onViewChange(view)
  }

  return (
    <aside className="hidden lg:block w-64 py-6 pl-8 pr-4 overflow-y-auto">
      <div className="space-y-2">
        {navItems.map((item, idx) => (
          <button
            key={idx}
            onClick={(e) => handleClick(e, item.view)}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${
              activeView === item.view
                ? "bg-white shadow-sm text-uiu-blue font-semibold border-l-4 border-uiu-crimson transform scale-[1.02]"
                : "text-gray-600 hover:bg-white hover:shadow-sm hover:text-uiu-blue"
            }`}
          >
            <i className={`fas ${item.icon} text-lg w-6 transition-transform duration-300 ${activeView === item.view ? "scale-110" : ""}`}></i>
            {item.label}
          </button>
        ))}
      </div>

      <div className="mt-8">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-4">More</h3>
        <div className="space-y-2">
          {moreItems.map((item, idx) => (
            <button
              key={idx}
              onClick={(e) => handleClick(e, item.view)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${
                activeView === item.view
                  ? "bg-white shadow-sm text-uiu-blue font-semibold border-l-4 border-uiu-crimson transform scale-[1.02]"
                  : "text-gray-600 hover:bg-white hover:shadow-sm hover:text-uiu-blue"
              }`}
            >
              <i className={`fas ${item.icon} text-lg w-6 transition-transform duration-300 ${activeView === item.view ? "scale-110" : ""}`}></i>
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-4">My Shortcuts</h3>
        <div className="space-y-3 px-4">
          {shortcuts.map((shortcut, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 cursor-pointer opacity-80 hover:opacity-100 transition-all duration-300 hover:translate-x-1"
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-transform duration-300 hover:scale-110 ${
                  shortcut.color === "blue"
                    ? "bg-blue-100 text-blue-600"
                    : "bg-orange-100 text-orange-600"
                }`}
              >
                <i className={`fas ${shortcut.icon}`}></i>
              </div>
              <span className="text-sm font-medium text-gray-700">{shortcut.label}</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}
