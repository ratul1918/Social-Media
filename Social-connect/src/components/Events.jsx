import { useState, useEffect } from "react"

export default function Events() {
  const [upcomingEvents, setUpcomingEvents] = useState([])
  const [pastEvents, setPastEvents] = useState([])
  const [activeTab, setActiveTab] = useState("upcoming")

  useEffect(() => {
    // Mock data for upcoming events
    setUpcomingEvents([
      {
        id: 1,
        title: "Annual Hackathon 2024",
        description: "Join us for the biggest hackathon of the year! Build innovative solutions and win exciting prizes.",
        date: "2024-03-15",
        time: "10:00 AM - 6:00 PM",
        location: "Main Campus, Auditorium",
        organizer: "UIU Computer Club",
        organizerAvatar: "https://i.pravatar.cc/150?u=club",
        attendees: 245,
        interested: 320,
        image: "https://images.unsplash.com/photo-1504384308090-c54be3855833?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        isRegistered: false,
      },
      {
        id: 2,
        title: "Web Development Workshop",
        description: "Learn modern web development techniques with hands-on projects.",
        date: "2024-03-20",
        time: "2:00 PM - 5:00 PM",
        location: "Computer Lab, Room 302",
        organizer: "CSE Department",
        organizerAvatar: "https://i.pravatar.cc/150?u=cse",
        attendees: 45,
        interested: 78,
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        isRegistered: true,
      },
      {
        id: 3,
        title: "Career Fair 2024",
        description: "Meet top companies and explore career opportunities.",
        date: "2024-03-25",
        time: "9:00 AM - 4:00 PM",
        location: "Convention Center",
        organizer: "Career Services",
        organizerAvatar: "https://i.pravatar.cc/150?u=career",
        attendees: 520,
        interested: 890,
        image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        isRegistered: false,
      },
      {
        id: 4,
        title: "Photography Exhibition",
        description: "Showcase your photography skills and view amazing works by fellow students.",
        date: "2024-04-01",
        time: "11:00 AM - 7:00 PM",
        location: "Gallery Hall",
        organizer: "Photography Club",
        organizerAvatar: "https://i.pravatar.cc/150?u=photo",
        attendees: 120,
        interested: 180,
        image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        isRegistered: false,
      },
    ])

    // Mock data for past events
    setPastEvents([
      {
        id: 5,
        title: "Tech Talk: AI in Modern Applications",
        description: "An insightful discussion about AI applications in real-world scenarios.",
        date: "2024-02-10",
        time: "3:00 PM - 5:00 PM",
        location: "Seminar Hall",
        organizer: "AI & ML Group",
        organizerAvatar: "https://i.pravatar.cc/150?u=ai",
        attendees: 95,
        interested: 0,
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        isRegistered: false,
      },
      {
        id: 6,
        title: "Sports Day 2024",
        description: "Annual sports day with various competitions and activities.",
        date: "2024-02-05",
        time: "8:00 AM - 6:00 PM",
        location: "Sports Complex",
        organizer: "Sports Club",
        organizerAvatar: "https://i.pravatar.cc/150?u=sports",
        attendees: 350,
        interested: 0,
        image: "https://images.unsplash.com/photo-1576678927484-cc907957088c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        isRegistered: false,
      },
    ])
  }, [])

  const handleRegister = (id) => {
    setUpcomingEvents(
      upcomingEvents.map((event) =>
        event.id === id ? { ...event, isRegistered: true, attendees: event.attendees + 1 } : event
      )
    )
  }

  const handleUnregister = (id) => {
    setUpcomingEvents(
      upcomingEvents.map((event) =>
        event.id === id ? { ...event, isRegistered: false, attendees: event.attendees - 1 } : event
      )
    )
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
  }

  const getDayOfWeek = (dateString) => {
    const date = new Date(dateString)
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    return days[date.getDay()]
  }

  const displayData = activeTab === "upcoming" ? upcomingEvents : pastEvents

  return (
    <main
      className="flex-1 max-w-2xl h-full overflow-y-auto pb-20 scroll-smooth no-scrollbar relative"
    >
      <div className="py-6 px-4">
        {/* Header */}
        <div className="mb-6 animate-fade-in-up">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Events</h1>
          <p className="text-sm text-gray-500">Discover and join exciting events on campus</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar animate-slide-in-right">
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
              activeTab === "upcoming"
                ? "bg-uiu-blue text-white shadow-md"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            Upcoming ({upcomingEvents.length})
          </button>
          <button
            onClick={() => setActiveTab("past")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
              activeTab === "past"
                ? "bg-uiu-blue text-white shadow-md"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            Past ({pastEvents.length})
          </button>
        </div>

        {/* Event Cards */}
        <div className="space-y-4">
          {displayData.map((event, idx) => (
            <div
              key={event.id}
              className="bg-white rounded-2xl shadow-sm overflow-hidden animate-fade-in-up"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {/* Event Image */}
              <div className="h-48 w-full overflow-hidden relative">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
                {activeTab === "upcoming" && event.isRegistered && (
                  <div className="absolute top-3 right-3 px-3 py-1 bg-uiu-crimson text-white text-xs font-semibold rounded-full">
                    Registered
                  </div>
                )}
              </div>

              <div className="p-4">
                {/* Date Badge */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex flex-col items-center justify-center w-16 h-16 bg-uiu-blue text-white rounded-xl">
                    <span className="text-xs font-medium">{getDayOfWeek(event.date)}</span>
                    <span className="text-xl font-bold">{new Date(event.date).getDate()}</span>
                    <span className="text-xs">{new Date(event.date).toLocaleDateString("en-US", { month: "short" })}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 hover:text-uiu-blue cursor-pointer transition-colors mb-1">
                      {event.title}
                    </h3>
                    <p className="text-sm text-gray-500">{event.time}</p>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{event.description}</p>

                {/* Event Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <i className="fas fa-map-marker-alt text-uiu-crimson"></i>
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <img
                      src={event.organizerAvatar}
                      alt={event.organizer}
                      className="w-5 h-5 rounded-full object-cover"
                    />
                    <span>Organized by {event.organizer}</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span>
                      <i className="fas fa-user-check mr-1"></i>
                      {event.attendees} going
                    </span>
                    {event.interested > 0 && (
                      <span>
                        <i className="fas fa-heart mr-1"></i>
                        {event.interested} interested
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                {activeTab === "upcoming" && (
                  <div className="flex gap-2">
                    {event.isRegistered ? (
                      <button
                        onClick={() => handleUnregister(event.id)}
                        className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                      >
                        <i className="fas fa-calendar-times mr-2"></i>Unregister
                      </button>
                    ) : (
                      <button
                        onClick={() => handleRegister(event.id)}
                        className="flex-1 px-4 py-2 bg-uiu-blue text-white rounded-lg text-sm font-medium hover:bg-uiu-lightBlue transition-colors"
                      >
                        <i className="fas fa-calendar-check mr-2"></i>Register
                      </button>
                    )}
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                      <i className="fas fa-share-alt"></i>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {displayData.length === 0 && (
          <div className="text-center py-12 animate-fade-in-up">
            <i className="fas fa-calendar-alt text-6xl text-gray-300 mb-4"></i>
            <p className="text-gray-500">No {activeTab} events found</p>
          </div>
        )}
      </div>
    </main>
  )
}

