export default function RightSidebar() {
  const suggestions = [
    {
      name: "Dr. A. Rahman",
      role: "Faculty, CSE",
      avatar: "https://i.pravatar.cc/150?u=5",
    },
    {
      name: "Sarah Khan",
      role: "BBA, 4th Year",
      avatar: "https://i.pravatar.cc/150?u=6",
    },
  ]

  const trending = [
    {
      rank: "01",
      category: "Academic",
      title: "Midterm Routine Published",
      posts: "2.4k posts",
    },
    {
      rank: "02",
      category: "Club Activity",
      title: "Robotics Contest 2023",
      posts: "1.1k posts",
    },
  ]

  return (
    <aside className="hidden xl:block w-80 py-6 pr-8 pl-4 overflow-y-auto">
      {/* Suggestions */}
      <div className="bg-white rounded-2xl shadow-sm p-4 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-gray-700">Suggestions for you</h3>
          <a href="#" className="text-xs text-uiu-crimson font-semibold">
            See All
          </a>
        </div>
        <div className="space-y-4">
          {suggestions.map((person, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={person.avatar || "/placeholder.svg"}
                  alt={person.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-sm font-semibold text-gray-800">{person.name}</h4>
                  <p className="text-xs text-gray-500">{person.role}</p>
                </div>
              </div>
              <button className="text-xs bg-uiu-blue/10 text-uiu-blue hover:bg-uiu-blue hover:text-white px-3 py-1.5 rounded-full font-medium transition-all">
                Follow
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Trending */}
      <div className="bg-white rounded-2xl shadow-sm p-4">
        <h3 className="font-bold text-gray-700 mb-4">Trending at UIU</h3>
        <div className="space-y-3">
          {trending.map((item, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <span className="text-lg font-bold text-gray-300">{item.rank}</span>
              <div>
                <p className="text-xs font-semibold text-gray-500">{item.category}</p>
                <h4 className="text-sm font-bold text-gray-800 leading-tight">{item.title}</h4>
                <p className="text-xs text-gray-400 mt-1">{item.posts}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}
