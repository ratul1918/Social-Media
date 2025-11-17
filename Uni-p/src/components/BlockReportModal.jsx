import { useState } from "react"

export default function BlockReportModal({ user, onClose, onBlock, onReport }) {
  const [activeTab, setActiveTab] = useState("report")
  const [reportReason, setReportReason] = useState("")
  const [reportDetails, setReportDetails] = useState("")

  const reportReasons = [
    "Spam or Scam",
    "Harassment or Bullying",
    "Inappropriate Content",
    "Fake Account",
    "Impersonation",
    "Other",
  ]

  const handleReport = () => {
    if (reportReason && reportDetails) {
      if (onReport) {
        onReport({
          userId: user?.id,
          reason: reportReason,
          details: reportDetails,
        })
      }
      alert("Report submitted. Thank you for helping keep our community safe.")
      onClose()
    }
  }

  const handleBlock = () => {
    if (onBlock) {
      onBlock(user?.id)
    }
    alert(`${user?.name || "User"} has been blocked.`)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-800">Report or Block</h3>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
          {user && (
            <div className="flex items-center gap-3 mt-4">
              <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full object-cover" />
              <div>
                <h4 className="font-semibold text-gray-800">{user.name}</h4>
                <p className="text-sm text-gray-500">{user.studentId || user.email}</p>
              </div>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 px-6">
          <button
            onClick={() => setActiveTab("report")}
            className={`px-6 py-4 font-medium text-sm transition-all duration-300 border-b-2 ${
              activeTab === "report"
                ? "border-uiu-blue text-uiu-blue"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Report
          </button>
          <button
            onClick={() => setActiveTab("block")}
            className={`px-6 py-4 font-medium text-sm transition-all duration-300 border-b-2 ${
              activeTab === "block"
                ? "border-uiu-blue text-uiu-blue"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Block
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === "report" ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Reason for Reporting</label>
                <div className="space-y-2">
                  {reportReasons.map((reason) => (
                    <label key={reason} className="flex items-center gap-3 p-3 rounded-lg border-2 border-gray-200 hover:border-uiu-blue cursor-pointer transition-colors">
                      <input
                        type="radio"
                        name="reportReason"
                        value={reason}
                        checked={reportReason === reason}
                        onChange={(e) => setReportReason(e.target.value)}
                        className="w-4 h-4 text-uiu-blue focus:ring-uiu-blue"
                      />
                      <span className="text-sm text-gray-700">{reason}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Additional Details</label>
                <textarea
                  value={reportDetails}
                  onChange={(e) => setReportDetails(e.target.value)}
                  rows={4}
                  placeholder="Please provide more details about the issue..."
                  className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-200 focus:border-uiu-blue focus:ring-2 focus:ring-uiu-blue/20 outline-none transition-all resize-none"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <i className="fas fa-exclamation-triangle text-red-500 text-xl mt-1"></i>
                  <div>
                    <h4 className="font-semibold text-red-800 mb-2">Block {user?.name || "this user"}?</h4>
                    <p className="text-sm text-red-700">
                      When you block someone, they won't be able to:
                    </p>
                    <ul className="text-sm text-red-700 mt-2 space-y-1 list-disc list-inside">
                      <li>See your posts or profile</li>
                      <li>Send you messages</li>
                      <li>Add you as a friend</li>
                      <li>Tag you in posts</li>
                    </ul>
                    <p className="text-sm text-red-700 mt-3">
                      You can unblock them anytime from your settings.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          {activeTab === "report" ? (
            <button
              onClick={handleReport}
              disabled={!reportReason || !reportDetails}
              className="px-6 py-2 bg-uiu-blue text-white rounded-lg font-medium hover:bg-uiu-lightBlue transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Report
            </button>
          ) : (
            <button
              onClick={handleBlock}
              className="px-6 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
            >
              Block User
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

