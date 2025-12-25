import { useState, useEffect } from "react"

export default function Connections() {
  const [connections, setConnections] = useState([])
  const [requests, setRequests] = useState([])
  const [suggestions, setSuggestions] = useState([])
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    // Mock data for connections
    setConnections([
      {
        id: 1,
        name: "Ayesha Rahman",
        avatar: "https://i.pravatar.cc/150?u=ayesha",
        title: "Computer Science Student",
        mutual: 12,
        status: "online",
      },
      {
        id: 2,
        name: "Farhan Islam",
        avatar: "https://i.pravatar.cc/150?u=farhan",
        title: "Software Engineer",
        mutual: 8,
        status: "offline",
      },
      {
        id: 3,
        name: "Nadia Ahmed",
        avatar: "https://i.pravatar.cc/150?u=nadia",
        title: "Data Science Student",
        mutual: 15,
        status: "online",
      },
      {
        id: 4,
        name: "Rifat Hasan",
        avatar: "https://i.pravatar.cc/150?u=rifat",
        title: "Web Developer",
        mutual: 5,
        status: "offline",
      },
      {
        id: 5,
        name: "Tasnim Khan",
        avatar: "https://i.pravatar.cc/150?u=tasnim",
        title: "UI/UX Designer",
        mutual: 20,
        status: "online",
      },
      {
        id: 6,
        name: "Sakib Mahmud",
        avatar: "https://i.pravatar.cc/150?u=sakib",
        title: "Machine Learning Enthusiast",
        mutual: 3,
        status: "offline",
      },
    ])

    // Mock data for requests
    setRequests([
      {
        id: 7,
        name: "Mehrab Hossain",
        avatar: "https://i.pravatar.cc/150?u=mehrab",
        title: "Cybersecurity Student",
        mutual: 6,
      },
      {
        id: 8,
        name: "Jannatul Ferdous",
        avatar: "https://i.pravatar.cc/150?u=jannat",
        title: "Mobile App Developer",
        mutual: 10,
      },
    ])

    // Mock data for suggestions
    setSuggestions([
      {
        id: 9,
        name: "Arifuzzaman",
        avatar: "https://i.pravatar.cc/150?u=arif",
        title: "Full Stack Developer",
        mutual: 4,
      },
      {
        id: 10,
        name: "Fatima Jahan",
        avatar: "https://i.pravatar.cc/150?u=fatima",
        title: "AI Researcher",
        mutual: 7,
      },
      {
        id: 11,
        name: "Mahmudul Hasan",
        avatar: "https://i.pravatar.cc/150?u=mahmud",
        title: "DevOps Engineer",
        mutual: 2,
      },
    ])
  }, [])

  const handleConnect = (id) => {
    const suggestion = suggestions.find((s) => s.id === id)
    if (suggestion) {
      setSuggestions(suggestions.filter((s) => s.id !== id))
      setRequests([...requests, suggestion])
    }
  }

  const handleAccept = (id) => {
    const request = requests.find((r) => r.id === id)
    if (request) {
      setRequests(requests.filter((r) => r.id !== id))
      setConnections([...connections, { ...request, status: "offline" }])
    }
  }

  const handleReject = (id) => {
    setRequests(requests.filter((r) => r.id !== id))
  }

  const displayData = activeTab === "all" ? connections : activeTab === "requests" ? requests : suggestions

  return (
    <main
      className="flex-1 max-w-2xl h-full overflow-y-auto pb-20 scroll-smooth no-scrollbar relative"
    >
      <div className="py-6 px-4">
        {/* Header */}
        <div className="mb-6 animate-fade-in-up">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Connections</h1>
          <p className="text-sm text-gray-500">Manage your network and discover new connections</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar animate-slide-in-right">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
              activeTab === "all"
                ? "bg-uiu-blue text-white shadow-md"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            All ({connections.length})
          </button>
          <button
            onClick={() => setActiveTab("requests")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap relative ${
              activeTab === "requests"
                ? "bg-uiu-blue text-white shadow-md"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            Requests ({requests.length})
            {requests.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-uiu-crimson rounded-full flex items-center justify-center text-white text-xs">
                {requests.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("suggestions")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
              activeTab === "suggestions"
                ? "bg-uiu-blue text-white shadow-md"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            Suggestions ({suggestions.length})
          </button>
        </div>

        {/* Connection Cards */}
        <div className="space-y-4">
          {displayData.map((person, idx) => (
            <div
              key={person.id}
              className="bg-white rounded-2xl shadow-sm p-4 animate-fade-in-up"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="flex items-start gap-4">
                <div className="relative">
                  <img
                    src={person.avatar}
                    alt={person.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                  />
                  {person.status === "online" && (
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 hover:text-uiu-blue cursor-pointer transition-colors">
                    {person.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">{person.title}</p>
                  <p className="text-xs text-gray-400 mb-3">
                    <i className="fas fa-users mr-1"></i>
                    {person.mutual} mutual connections
                  </p>
                  <div className="flex gap-2">
                    {activeTab === "all" && (
                      <>
                        <button className="flex-1 px-4 py-2 bg-uiu-blue text-white rounded-lg text-sm font-medium hover:bg-uiu-lightBlue transition-colors">
                          <i className="fas fa-comment mr-2"></i>Message
                        </button>
                        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                          <i className="fas fa-user-minus"></i>
                        </button>
                      </>
                    )}
                    {activeTab === "requests" && (
                      <>
                        <button
                          onClick={() => handleAccept(person.id)}
                          className="flex-1 px-4 py-2 bg-uiu-blue text-white rounded-lg text-sm font-medium hover:bg-uiu-lightBlue transition-colors"
                        >
                          <i className="fas fa-check mr-2"></i>Accept
                        </button>
                        <button
                          onClick={() => handleReject(person.id)}
                          className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                        >
                          <i className="fas fa-times mr-2"></i>Reject
                        </button>
                      </>
                    )}
                    {activeTab === "suggestions" && (
                      <button
                        onClick={() => handleConnect(person.id)}
                        className="flex-1 px-4 py-2 bg-uiu-blue text-white rounded-lg text-sm font-medium hover:bg-uiu-lightBlue transition-colors"
                      >
                        <i className="fas fa-user-plus mr-2"></i>Connect
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {displayData.length === 0 && (
          <div className="text-center py-12 animate-fade-in-up">
            <i className="fas fa-users text-6xl text-gray-300 mb-4"></i>
            <p className="text-gray-500">No {activeTab} found</p>
          </div>
        )}
      </div>
    </main>
  )
}

