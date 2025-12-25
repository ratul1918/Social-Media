import { useState } from "react"

export default function JobBoard() {
  const [activeTab, setActiveTab] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    type: "all",
    department: "all",
    location: "all",
  })

  const jobs = [
    {
      id: 1,
      title: "Frontend Developer Intern",
      company: "Tech Solutions BD",
      location: "Dhaka, Bangladesh",
      type: "internship",
      department: "CSE",
      salary: "15,000 - 20,000 BDT",
      posted: "2 days ago",
      applicants: 45,
      description: "Looking for a motivated frontend developer intern with React experience. Work on real-world projects and learn from experienced developers.",
      requirements: ["React", "JavaScript", "HTML/CSS", "Git"],
      logo: "https://i.pravatar.cc/150?u=tech",
    },
    {
      id: 2,
      title: "Full Stack Developer",
      company: "StartupHub",
      location: "Remote",
      type: "full-time",
      department: "CSE",
      salary: "40,000 - 60,000 BDT",
      posted: "1 week ago",
      applicants: 120,
      description: "Join our growing team as a full stack developer. Work with modern technologies and build scalable applications.",
      requirements: ["Node.js", "React", "MongoDB", "AWS"],
      logo: "https://i.pravatar.cc/150?u=startup",
    },
    {
      id: 3,
      title: "Marketing Intern",
      company: "Digital Marketing Pro",
      location: "Dhaka, Bangladesh",
      type: "internship",
      department: "BBA",
      salary: "10,000 - 15,000 BDT",
      posted: "3 days ago",
      applicants: 28,
      description: "Great opportunity for BBA students interested in digital marketing. Learn SEO, social media marketing, and content creation.",
      requirements: ["Marketing", "Social Media", "Content Writing"],
      logo: "https://i.pravatar.cc/150?u=marketing",
    },
    {
      id: 4,
      title: "Data Analyst",
      company: "Analytics Corp",
      location: "Dhaka, Bangladesh",
      type: "full-time",
      department: "CSE",
      salary: "35,000 - 50,000 BDT",
      posted: "5 days ago",
      applicants: 89,
      description: "Analyze data and create insights for business decisions. Work with Python, SQL, and data visualization tools.",
      requirements: ["Python", "SQL", "Excel", "Data Visualization"],
      logo: "https://i.pravatar.cc/150?u=analytics",
    },
    {
      id: 5,
      title: "UI/UX Designer",
      company: "Design Studio",
      location: "Remote",
      type: "part-time",
      department: "CSE",
      salary: "25,000 - 35,000 BDT",
      posted: "1 day ago",
      applicants: 67,
      description: "Create beautiful and functional designs for web and mobile applications. Work with a creative team.",
      requirements: ["Figma", "Adobe XD", "UI/UX Design", "Prototyping"],
      logo: "https://i.pravatar.cc/150?u=design",
    },
  ]

  const filteredJobs = jobs.filter((job) => {
    if (filters.type !== "all" && job.type !== filters.type) return false
    if (filters.department !== "all" && job.department !== filters.department) return false
    if (filters.location !== "all" && job.location !== filters.location) return false
    return true
  })

  const handleApply = (jobId) => {
    // Application logic would go here
    alert(`Application submitted for job #${jobId}`)
  }

  return (
    <main className="flex-1 max-w-2xl h-full overflow-y-auto pb-20 scroll-smooth no-scrollbar relative">
      <div className="py-6 px-4">
        {/* Header */}
        <div className="mb-6 animate-fade-in-up">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Job Board</h1>
          <p className="text-gray-500">Find internships, part-time, and full-time opportunities</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          {[
            { key: "all", label: "All Jobs", icon: "fa-briefcase" },
            { key: "internship", label: "Internships", icon: "fa-graduation-cap" },
            { key: "full-time", label: "Full-Time", icon: "fa-building" },
            { key: "part-time", label: "Part-Time", icon: "fa-clock" },
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

        {/* Filters */}
        <div className="mb-6 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all"
          >
            <i className="fas fa-filter text-gray-500"></i>
            <span className="font-medium text-gray-700">Filters</span>
            <i className={`fas fa-chevron-${showFilters ? "up" : "down"} text-xs text-gray-500 ml-auto`}></i>
          </button>

          {showFilters && (
            <div className="mt-3 p-4 bg-white rounded-lg shadow-sm border border-gray-200 space-y-3 animate-fade-in-up">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Job Type</label>
                <select
                  value={filters.type}
                  onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-uiu-blue focus:ring-2 focus:ring-uiu-blue/20 outline-none"
                >
                  <option value="all">All Types</option>
                  <option value="internship">Internship</option>
                  <option value="full-time">Full-Time</option>
                  <option value="part-time">Part-Time</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Department</label>
                <select
                  value={filters.department}
                  onChange={(e) => setFilters({ ...filters, department: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-uiu-blue focus:ring-2 focus:ring-uiu-blue/20 outline-none"
                >
                  <option value="all">All Departments</option>
                  <option value="CSE">CSE</option>
                  <option value="EEE">EEE</option>
                  <option value="BBA">BBA</option>
                  <option value="ECE">ECE</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                <select
                  value={filters.location}
                  onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-uiu-blue focus:ring-2 focus:ring-uiu-blue/20 outline-none"
                >
                  <option value="all">All Locations</option>
                  <option value="Dhaka, Bangladesh">Dhaka</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Job Listings */}
        <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          {filteredJobs
            .filter((job) => activeTab === "all" || job.type === activeTab)
            .map((job) => (
              <div key={job.id} className="glass-card bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-start gap-4">
                  <img src={job.logo} alt={job.company} className="w-16 h-16 rounded-xl object-cover" />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-bold text-gray-800 mb-1">{job.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{job.company}</p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          job.type === "internship"
                            ? "bg-blue-100 text-blue-700"
                            : job.type === "full-time"
                            ? "bg-green-100 text-green-700"
                            : "bg-purple-100 text-purple-700"
                        }`}
                      >
                        {job.type === "full-time" ? "Full-Time" : job.type === "part-time" ? "Part-Time" : "Internship"}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <i className="fas fa-map-marker-alt"></i>
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <i className="fas fa-money-bill-wave"></i>
                        {job.salary}
                      </span>
                      <span className="flex items-center gap-1">
                        <i className="fas fa-users"></i>
                        {job.applicants} applicants
                      </span>
                    </div>

                    <p className="text-sm text-gray-700 mb-3 line-clamp-2">{job.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.requirements.map((req, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                          {req}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Posted {job.posted}</span>
                      <button
                        onClick={() => handleApply(job.id)}
                        className="px-6 py-2 bg-uiu-blue text-white rounded-lg font-medium hover:bg-uiu-lightBlue transition-colors shadow-md"
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {filteredJobs.filter((job) => activeTab === "all" || job.type === activeTab).length === 0 && (
          <div className="text-center py-12 animate-fade-in-up">
            <i className="fas fa-briefcase text-6xl text-gray-300 mb-4"></i>
            <p className="text-gray-500">No jobs found matching your criteria</p>
          </div>
        )}
      </div>
    </main>
  )
}

