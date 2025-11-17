import { useState } from "react"

export default function StudyGroups() {
  const [activeTab, setActiveTab] = useState("my-groups")
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newGroup, setNewGroup] = useState({
    name: "",
    subject: "",
    description: "",
    maxMembers: 10,
    meetingTime: "",
    meetingLocation: "",
  })

  const myGroups = [
    {
      id: 1,
      name: "Data Structures Study Group",
      subject: "CSE 201",
      description: "Weekly study sessions for Data Structures and Algorithms. We solve problems together and prepare for exams.",
      members: 8,
      maxMembers: 12,
      meetingTime: "Every Saturday, 2:00 PM",
      meetingLocation: "Library, Room 205",
      createdBy: "Ahmed Khan",
      createdByAvatar: "https://i.pravatar.cc/150?u=ahmed",
      isMember: true,
      isAdmin: false,
      membersList: [
        { name: "Ahmed Khan", avatar: "https://i.pravatar.cc/150?u=ahmed", role: "Admin" },
        { name: "Sarah Ahmed", avatar: "https://i.pravatar.cc/150?u=sarah", role: "Member" },
        { name: "Mike Johnson", avatar: "https://i.pravatar.cc/150?u=mike", role: "Member" },
        { name: "Fatima Begum", avatar: "https://i.pravatar.cc/150?u=fatima", role: "Member" },
      ],
    },
    {
      id: 2,
      name: "Calculus Problem Solvers",
      subject: "MATH 101",
      description: "Group for solving calculus problems and preparing for midterms and finals.",
      members: 5,
      maxMembers: 8,
      meetingTime: "Every Tuesday & Thursday, 4:00 PM",
      meetingLocation: "Study Hall",
      createdBy: "Rahim Ali",
      createdByAvatar: "https://i.pravatar.cc/150?u=rahim",
      isMember: true,
      isAdmin: true,
      membersList: [
        { name: "You", avatar: "https://i.pravatar.cc/150?u=uiu", role: "Admin" },
        { name: "Rahim Ali", avatar: "https://i.pravatar.cc/150?u=rahim", role: "Member" },
        { name: "Ayesha Khan", avatar: "https://i.pravatar.cc/150?u=ayesha", role: "Member" },
      ],
    },
  ]

  const discoverGroups = [
    {
      id: 3,
      name: "Web Development Study Group",
      subject: "CSE 301",
      description: "Learn web development together. We build projects and share resources.",
      members: 15,
      maxMembers: 20,
      meetingTime: "Every Sunday, 3:00 PM",
      meetingLocation: "Computer Lab, Room 302",
      createdBy: "Hasan Rahman",
      createdByAvatar: "https://i.pravatar.cc/150?u=hasan",
      isMember: false,
      membersList: [],
    },
    {
      id: 4,
      name: "Database Systems Study Group",
      subject: "CSE 305",
      description: "Study SQL, database design, and normalization together.",
      members: 10,
      maxMembers: 15,
      meetingTime: "Every Monday, 5:00 PM",
      meetingLocation: "Library, Room 210",
      createdBy: "Fatima Khan",
      createdByAvatar: "https://i.pravatar.cc/150?u=fatima2",
      isMember: false,
      membersList: [],
    },
    {
      id: 5,
      name: "Physics Problem Solving",
      subject: "PHY 101",
      description: "Solve physics problems and prepare for exams together.",
      members: 7,
      maxMembers: 10,
      meetingTime: "Every Wednesday, 3:00 PM",
      meetingLocation: "Physics Lab",
      createdBy: "Mohammad Ali",
      createdByAvatar: "https://i.pravatar.cc/150?u=mohammad",
      isMember: false,
      membersList: [],
    },
  ]

  const handleJoinGroup = (groupId) => {
    // Join logic would go here
    alert(`Joined group #${groupId}`)
  }

  const handleLeaveGroup = (groupId) => {
    // Leave logic would go here
    alert(`Left group #${groupId}`)
  }

  const handleCreateGroup = () => {
    // Create group logic would go here
    console.log("Creating group:", newGroup)
    alert("Study group created!")
    setShowCreateModal(false)
    setNewGroup({
      name: "",
      subject: "",
      description: "",
      maxMembers: 10,
      meetingTime: "",
      meetingLocation: "",
    })
  }

  const displayGroups = activeTab === "my-groups" ? myGroups : discoverGroups

  return (
    <main className="flex-1 max-w-2xl h-full overflow-y-auto pb-20 scroll-smooth no-scrollbar relative">
      <div className="py-6 px-4">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between animate-fade-in-up">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Study Groups</h1>
            <p className="text-gray-500">Join study groups or create your own</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-uiu-blue text-white rounded-lg font-medium hover:bg-uiu-lightBlue transition-colors flex items-center gap-2 shadow-md"
          >
            <i className="fas fa-plus"></i>
            Create Group
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          {[
            { key: "my-groups", label: "My Groups", icon: "fa-users", count: myGroups.length },
            { key: "discover", label: "Discover", icon: "fa-compass", count: discoverGroups.length },
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
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Groups List */}
        <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          {displayGroups.map((group) => (
            <div key={group.id} className="glass-card bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-gray-800">{group.name}</h3>
                    {group.isMember && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        Member
                      </span>
                    )}
                    {group.isAdmin && (
                      <span className="px-2 py-1 bg-uiu-blue text-white rounded-full text-xs font-medium">Admin</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    <i className="fas fa-book mr-2"></i>
                    {group.subject}
                  </p>
                  <p className="text-sm text-gray-700 mb-3">{group.description}</p>
                </div>
              </div>

              {/* Group Details */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <i className="fas fa-clock"></i>
                  <span>{group.meetingTime}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>{group.meetingLocation}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <i className="fas fa-users"></i>
                  <span>
                    {group.members}/{group.maxMembers} members
                  </span>
                </div>
              </div>

              {/* Members Preview */}
              {group.membersList && group.membersList.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Members</p>
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {group.membersList.slice(0, 4).map((member, idx) => (
                        <img
                          key={idx}
                          src={member.avatar}
                          alt={member.name}
                          className="w-8 h-8 rounded-full border-2 border-white object-cover"
                          title={member.name}
                        />
                      ))}
                    </div>
                    {group.members > 4 && (
                      <span className="text-xs text-gray-500">+{group.members - 4} more</span>
                    )}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2">
                {group.isMember ? (
                  <button
                    onClick={() => handleLeaveGroup(group.id)}
                    className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                  >
                    <i className="fas fa-sign-out-alt mr-2"></i>Leave Group
                  </button>
                ) : (
                  <button
                    onClick={() => handleJoinGroup(group.id)}
                    className="flex-1 px-4 py-2 bg-uiu-blue text-white rounded-lg font-medium hover:bg-uiu-lightBlue transition-colors"
                  >
                    <i className="fas fa-user-plus mr-2"></i>Join Group
                  </button>
                )}
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                  <i className="fas fa-info-circle"></i>
                </button>
              </div>
            </div>
          ))}
        </div>

        {displayGroups.length === 0 && (
          <div className="text-center py-12 animate-fade-in-up">
            <i className="fas fa-users text-6xl text-gray-300 mb-4"></i>
            <p className="text-gray-500">No groups found</p>
          </div>
        )}
      </div>

      {/* Create Group Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-800">Create Study Group</h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Group Name *</label>
                <input
                  type="text"
                  value={newGroup.name}
                  onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
                  placeholder="e.g., Data Structures Study Group"
                  className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-200 focus:border-uiu-blue focus:ring-2 focus:ring-uiu-blue/20 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Subject/Course *</label>
                <input
                  type="text"
                  value={newGroup.subject}
                  onChange={(e) => setNewGroup({ ...newGroup, subject: e.target.value })}
                  placeholder="e.g., CSE 201"
                  className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-200 focus:border-uiu-blue focus:ring-2 focus:ring-uiu-blue/20 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
                <textarea
                  value={newGroup.description}
                  onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
                  rows={3}
                  placeholder="Describe your study group..."
                  className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-200 focus:border-uiu-blue focus:ring-2 focus:ring-uiu-blue/20 outline-none transition-all resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Max Members</label>
                  <input
                    type="number"
                    value={newGroup.maxMembers}
                    onChange={(e) => setNewGroup({ ...newGroup, maxMembers: parseInt(e.target.value) })}
                    min="2"
                    max="50"
                    className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-200 focus:border-uiu-blue focus:ring-2 focus:ring-uiu-blue/20 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Meeting Time</label>
                  <input
                    type="text"
                    value={newGroup.meetingTime}
                    onChange={(e) => setNewGroup({ ...newGroup, meetingTime: e.target.value })}
                    placeholder="e.g., Every Saturday, 2 PM"
                    className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-200 focus:border-uiu-blue focus:ring-2 focus:ring-uiu-blue/20 outline-none transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Meeting Location</label>
                <input
                  type="text"
                  value={newGroup.meetingLocation}
                  onChange={(e) => setNewGroup({ ...newGroup, meetingLocation: e.target.value })}
                  placeholder="e.g., Library, Room 205"
                  className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-200 focus:border-uiu-blue focus:ring-2 focus:ring-uiu-blue/20 outline-none transition-all"
                />
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateGroup}
                disabled={!newGroup.name || !newGroup.subject || !newGroup.description}
                className="px-6 py-2 bg-uiu-blue text-white rounded-lg font-medium hover:bg-uiu-lightBlue transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Group
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

