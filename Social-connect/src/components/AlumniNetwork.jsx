import { useState } from "react"

export default function AlumniNetwork() {
  const [activeTab, setActiveTab] = useState("all")
  const [showMentorshipModal, setShowMentorshipModal] = useState(false)
  const [selectedAlumni, setSelectedAlumni] = useState(null)

  const alumni = [
    {
      id: 1,
      name: "Dr. Sarah Ahmed",
      batch: "2010",
      department: "CSE",
      currentRole: "Senior Software Engineer at Google",
      location: "San Francisco, USA",
      avatar: "https://i.pravatar.cc/150?u=alumni1",
      linkedin: "https://linkedin.com/in/sarah-ahmed",
      expertise: ["Software Engineering", "Machine Learning", "Career Guidance"],
      availableForMentorship: true,
      bio: "Passionate about helping students succeed. 10+ years in tech industry.",
    },
    {
      id: 2,
      name: "Ahmed Rahman",
      batch: "2015",
      department: "BBA",
      currentRole: "Product Manager at Microsoft",
      location: "Seattle, USA",
      avatar: "https://i.pravatar.cc/150?u=alumni2",
      linkedin: "https://linkedin.com/in/ahmed-rahman",
      expertise: ["Product Management", "Business Strategy", "Startups"],
      availableForMentorship: true,
      bio: "Love mentoring students interested in product management and entrepreneurship.",
    },
    {
      id: 3,
      name: "Fatima Khan",
      batch: "2012",
      department: "EEE",
      currentRole: "Electrical Engineer at Tesla",
      location: "Austin, USA",
      avatar: "https://i.pravatar.cc/150?u=alumni3",
      linkedin: "https://linkedin.com/in/fatima-khan",
      expertise: ["Electrical Engineering", "Renewable Energy", "Research"],
      availableForMentorship: true,
      bio: "Research enthusiast. Happy to help with academic and career questions.",
    },
    {
      id: 4,
      name: "Mohammad Ali",
      batch: "2018",
      department: "CSE",
      currentRole: "Founder & CEO at TechStart BD",
      location: "Dhaka, Bangladesh",
      avatar: "https://i.pravatar.cc/150?u=alumni4",
      linkedin: "https://linkedin.com/in/mohammad-ali",
      expertise: ["Entrepreneurship", "Web Development", "Startups"],
      availableForMentorship: true,
      bio: "Building the next generation of tech startups in Bangladesh.",
    },
    {
      id: 5,
      name: "Ayesha Begum",
      batch: "2016",
      department: "BBA",
      currentRole: "Marketing Director at Unilever",
      location: "London, UK",
      avatar: "https://i.pravatar.cc/150?u=alumni5",
      linkedin: "https://linkedin.com/in/ayesha-begum",
      expertise: ["Marketing", "Brand Management", "International Business"],
      availableForMentorship: true,
      bio: "Global marketing professional. Mentor for marketing and business students.",
    },
  ]

  const handleRequestMentorship = (alumni) => {
    setSelectedAlumni(alumni)
    setShowMentorshipModal(true)
  }

  const filteredAlumni = activeTab === "all" ? alumni : alumni.filter((a) => a.department === activeTab)

  return (
    <main className="flex-1 max-w-2xl h-full overflow-y-auto pb-20 scroll-smooth no-scrollbar relative">
      <div className="py-6 px-4">
        {/* Header */}
        <div className="mb-6 animate-fade-in-up">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Alumni Network</h1>
          <p className="text-gray-500">Connect with alumni, seek mentorship, and build your network</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          {[
            { key: "all", label: "All Alumni", icon: "fa-users" },
            { key: "CSE", label: "CSE", icon: "fa-laptop-code" },
            { key: "BBA", label: "BBA", icon: "fa-briefcase" },
            { key: "EEE", label: "EEE", icon: "fa-bolt" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                activeTab === tab.key
                  ? "bg-uiu-blue text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <i className={`fas ${tab.icon} mr-2`}></i>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Alumni Cards */}
        <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          {filteredAlumni.map((alum) => (
            <div key={alum.id} className="glass-card bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-start gap-4">
                <img src={alum.avatar} alt={alum.name} className="w-20 h-20 rounded-full object-cover border-2 border-uiu-blue" />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 mb-1">{alum.name}</h3>
                      <p className="text-sm text-gray-600 mb-1">
                        Batch {alum.batch} • {alum.department}
                      </p>
                      <p className="text-sm font-medium text-uiu-blue mb-2">{alum.currentRole}</p>
                    </div>
                    {alum.availableForMentorship && (
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        <i className="fas fa-check-circle mr-1"></i>Mentor Available
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <i className="fas fa-map-marker-alt"></i>
                    <span>{alum.location}</span>
                  </div>

                  <p className="text-sm text-gray-700 mb-3">{alum.bio}</p>

                  <div className="mb-4">
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Expertise</p>
                    <div className="flex flex-wrap gap-2">
                      {alum.expertise.map((exp, idx) => (
                        <span key={idx} className="px-2 py-1 bg-uiu-blue/10 text-uiu-blue rounded text-xs font-medium">
                          {exp}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleRequestMentorship(alum)}
                      className="px-4 py-2 bg-uiu-blue text-white rounded-lg font-medium hover:bg-uiu-lightBlue transition-colors flex items-center gap-2"
                    >
                      <i className="fas fa-handshake"></i>
                      Request Mentorship
                    </button>
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center gap-2">
                      <i className="fas fa-user-plus"></i>
                      Connect
                    </button>
                    <a
                      href={alum.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                      <i className="fab fa-linkedin"></i>
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mentorship Request Modal */}
      {showMentorshipModal && selectedAlumni && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-800">Request Mentorship</h3>
                <button
                  onClick={() => setShowMentorshipModal(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <img src={selectedAlumni.avatar} alt={selectedAlumni.name} className="w-16 h-16 rounded-full object-cover" />
                <div>
                  <h4 className="font-bold text-gray-800">{selectedAlumni.name}</h4>
                  <p className="text-sm text-gray-500">{selectedAlumni.currentRole}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">What do you need help with?</label>
                  <textarea
                    rows={4}
                    placeholder="Tell them about your goals, questions, or what you'd like to learn..."
                    className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-200 focus:border-uiu-blue focus:ring-2 focus:ring-uiu-blue/20 outline-none transition-all resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred communication method</label>
                  <select className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-200 focus:border-uiu-blue focus:ring-2 focus:ring-uiu-blue/20 outline-none">
                    <option>Email</option>
                    <option>LinkedIn Message</option>
                    <option>Video Call</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setShowMentorshipModal(false)}
                className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert("Mentorship request sent!")
                  setShowMentorshipModal(false)
                }}
                className="px-6 py-2 bg-uiu-blue text-white rounded-lg font-medium hover:bg-uiu-lightBlue transition-colors"
              >
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

