import { useState, useEffect } from "react"
import ImageUpload from "./ImageUpload"

export default function ProfileSettings({ onClose }) {
  const [activeTab, setActiveTab] = useState("profile")
  const [isVisible, setIsVisible] = useState(false)
  const [profilePhoto, setProfilePhoto] = useState([])
  const [coverPhoto, setCoverPhoto] = useState([])
  const [formData, setFormData] = useState({
    name: "Rafiur Rahman",
    studentId: "011233055",
    email: "rafiur.rahman@uiu.ac.bd",
    bio: "Computer Science Student at UIU | Passionate about Web Development | Always learning something new 🚀",
    department: "CSE",
    batch: "2020",
    semester: "8th",
    location: "Dhaka, Bangladesh",
    phone: "",
    website: "",
    github: "",
    linkedin: "",
  })
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "public",
    whoCanMessage: "everyone",
    whoCanComment: "everyone",
    showEmail: false,
    showPhone: false,
  })

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePrivacyChange = (name, value) => {
    setPrivacySettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    // Save would be handled here
    console.log("Saving:", { formData, privacySettings, profilePhoto, coverPhoto })
    if (onClose) {
      onClose()
    }
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-fade-in-up">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 px-6">
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-6 py-4 font-medium text-sm transition-all duration-300 border-b-2 ${
              activeTab === "profile"
                ? "border-uiu-blue text-uiu-blue"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab("privacy")}
            className={`px-6 py-4 font-medium text-sm transition-all duration-300 border-b-2 ${
              activeTab === "privacy"
                ? "border-uiu-blue text-uiu-blue"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Privacy
          </button>
          <button
            onClick={() => setActiveTab("notifications")}
            className={`px-6 py-4 font-medium text-sm transition-all duration-300 border-b-2 ${
              activeTab === "notifications"
                ? "border-uiu-blue text-uiu-blue"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Notifications
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === "profile" && (
            <div className="space-y-6 animate-fade-in-up">
              {/* Profile Photo */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Profile Photo</label>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={profilePhoto[0] || "https://i.pravatar.cc/150?u=uiu"}
                      alt="Profile"
                      className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
                    />
                    <button className="absolute bottom-0 right-0 w-8 h-8 bg-uiu-blue text-white rounded-full flex items-center justify-center shadow-md hover:bg-uiu-lightBlue transition-colors">
                      <i className="fas fa-camera text-xs"></i>
                    </button>
                  </div>
                  <div className="flex-1">
                    <ImageUpload
                      maxImages={1}
                      onImagesChange={(images) => setProfilePhoto(images)}
                      existingImages={profilePhoto}
                    />
                    <p className="text-xs text-gray-500 mt-2">JPG, PNG or GIF. Max size 5MB</p>
                  </div>
                </div>
              </div>

              {/* Cover Photo */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Cover Photo</label>
                <div className="relative h-48 rounded-xl overflow-hidden bg-gradient-to-br from-uiu-blue to-uiu-crimson">
                  <img
                    src={coverPhoto[0] || "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"}
                    alt="Cover"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <ImageUpload
                      maxImages={1}
                      onImagesChange={(images) => setCoverPhoto(images)}
                      existingImages={coverPhoto}
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">Recommended size: 1200x400px. Max size 5MB</p>
              </div>

              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-200 focus:border-uiu-blue focus:ring-2 focus:ring-uiu-blue/20 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Student ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-200 focus:border-uiu-blue focus:ring-2 focus:ring-uiu-blue/20 outline-none transition-all"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    autoComplete="off"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-200 focus:border-uiu-blue focus:ring-2 focus:ring-uiu-blue/20 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Department <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-200 focus:border-uiu-blue focus:ring-2 focus:ring-uiu-blue/20 outline-none transition-all"
                  >
                    <option value="CSE">CSE</option>
                    <option value="EEE">EEE</option>
                    <option value="BBA">BBA</option>
                    <option value="ECE">ECE</option>
                    <option value="Law">Law</option>
                    <option value="Pharmacy">Pharmacy</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Batch</label>
                  <input
                    type="text"
                    name="batch"
                    value={formData.batch}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-200 focus:border-uiu-blue focus:ring-2 focus:ring-uiu-blue/20 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Semester</label>
                  <input
                    type="text"
                    name="semester"
                    value={formData.semester}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-200 focus:border-uiu-blue focus:ring-2 focus:ring-uiu-blue/20 outline-none transition-all"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-200 focus:border-uiu-blue focus:ring-2 focus:ring-uiu-blue/20 outline-none transition-all"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows={4}
                    maxLength={500}
                    className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-200 focus:border-uiu-blue focus:ring-2 focus:ring-uiu-blue/20 outline-none transition-all resize-none"
                    placeholder="Tell us about yourself..."
                  />
                  <p className="text-xs text-gray-500 mt-1">{formData.bio.length}/500 characters</p>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4">Social Links</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <i className="fab fa-github mr-2"></i>GitHub
                    </label>
                    <input
                      type="url"
                      name="github"
                      value={formData.github}
                      onChange={handleInputChange}
                      placeholder="https://github.com/username"
                      className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-200 focus:border-uiu-blue focus:ring-2 focus:ring-uiu-blue/20 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <i className="fab fa-linkedin mr-2"></i>LinkedIn
                    </label>
                    <input
                      type="url"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleInputChange}
                      placeholder="https://linkedin.com/in/username"
                      className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-200 focus:border-uiu-blue focus:ring-2 focus:ring-uiu-blue/20 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <i className="fas fa-globe mr-2"></i>Website
                    </label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      placeholder="https://yourwebsite.com"
                      className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-200 focus:border-uiu-blue focus:ring-2 focus:ring-uiu-blue/20 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <i className="fas fa-phone mr-2"></i>Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+880 1XXX-XXXXXX"
                      className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-200 focus:border-uiu-blue focus:ring-2 focus:ring-uiu-blue/20 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "privacy" && (
            <div className="space-y-6 animate-fade-in-up">
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4">Profile Visibility</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Who can see your profile?</label>
                    <select
                      value={privacySettings.profileVisibility}
                      onChange={(e) => handlePrivacyChange("profileVisibility", e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-200 focus:border-uiu-blue focus:ring-2 focus:ring-uiu-blue/20 outline-none transition-all"
                    >
                      <option value="public">Public - Everyone can see your profile</option>
                      <option value="friends">Friends - Only your friends can see</option>
                      <option value="private">Private - Only you can see</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Who can message you?</label>
                    <select
                      value={privacySettings.whoCanMessage}
                      onChange={(e) => handlePrivacyChange("whoCanMessage", e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-200 focus:border-uiu-blue focus:ring-2 focus:ring-uiu-blue/20 outline-none transition-all"
                    >
                      <option value="everyone">Everyone</option>
                      <option value="friends">Friends only</option>
                      <option value="none">No one</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Who can comment on your posts?</label>
                    <select
                      value={privacySettings.whoCanComment}
                      onChange={(e) => handlePrivacyChange("whoCanComment", e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-200 focus:border-uiu-blue focus:ring-2 focus:ring-uiu-blue/20 outline-none transition-all"
                    >
                      <option value="everyone">Everyone</option>
                      <option value="friends">Friends only</option>
                      <option value="none">No one</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={privacySettings.showEmail}
                      onChange={(e) => handlePrivacyChange("showEmail", e.target.checked)}
                      className="w-5 h-5 rounded border-gray-300 text-uiu-blue focus:ring-uiu-blue"
                    />
                    <span className="text-sm text-gray-700">Show email on profile</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={privacySettings.showPhone}
                      onChange={(e) => handlePrivacyChange("showPhone", e.target.checked)}
                      className="w-5 h-5 rounded border-gray-300 text-uiu-blue focus:ring-uiu-blue"
                    />
                    <span className="text-sm text-gray-700">Show phone number on profile</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="space-y-6 animate-fade-in-up">
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4">Notification Preferences</h3>
                <div className="space-y-4">
                  {[
                    { key: "postLikes", label: "Post likes", description: "Get notified when someone likes your post" },
                    { key: "comments", label: "Comments", description: "Get notified when someone comments on your post" },
                    { key: "friendRequests", label: "Friend requests", description: "Get notified when someone sends you a friend request" },
                    { key: "messages", label: "Messages", description: "Get notified when you receive a new message" },
                    { key: "eventReminders", label: "Event reminders", description: "Get notified about upcoming events" },
                    { key: "groupUpdates", label: "Group updates", description: "Get notified about updates in your groups" },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-semibold text-gray-800">{item.label}</h4>
                        <p className="text-sm text-gray-500">{item.description}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-uiu-blue/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-uiu-blue"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2.5 bg-uiu-blue text-white rounded-lg font-medium hover:bg-uiu-lightBlue transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}

