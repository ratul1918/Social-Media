import { useState } from "react"
import Navbar from "./Navbar"
import LeftSidebar from "./LeftSidebar"
import Feed from "./Feed"
import Connections from "./Connections"
import Groups from "./Groups"
import Events from "./Events"
import Saved from "./Saved"
import Profile from "./Profile"
import JobBoard from "./JobBoard"
import AlumniNetwork from "./AlumniNetwork"
import Marketplace from "./Marketplace"
import StudyGroups from "./StudyGroups"
import ChatList from "./ChatList"
import NotificationsPage from "./NotificationsPage"
import RightSidebar from "./RightSidebar"
import MobileNav from "./MobileNav"
import CreatePostModal from "./CreatePostModal"

export default function Dashboard() {
  const [showPostModal, setShowPostModal] = useState(false)
  const [activeView, setActiveView] = useState("feed")

  const togglePostModal = () => {
    setShowPostModal(!showPostModal)
  }

  const handleViewChange = (view) => {
    if (view === activeView) return
    setActiveView(view)
  }

  const renderView = () => {
    switch (activeView) {
      case "feed":
        return <Feed onCreatePost={togglePostModal} />
      case "connections":
        return <Connections />
      case "groups":
        return <Groups />
      case "study-groups":
        return <StudyGroups />
      case "events":
        return <Events />
      case "saved":
        return <Saved />
      case "profile":
        return <Profile isOwnProfile={true} />
      case "jobs":
        return <JobBoard />
      case "alumni":
        return <AlumniNetwork />
      case "marketplace":
        return <Marketplace />
      case "messages":
        return <ChatList onClose={() => handleViewChange("feed")} />
      case "notifications":
        return <NotificationsPage />
      default:
        return <Feed onCreatePost={togglePostModal} />
    }
  }

  return (
    <div id="dashboard" className="h-full flex flex-col">
      <Navbar onViewChange={handleViewChange} activeView={activeView} />

      {/* Main Layout Grid */}
      <div className="flex-1 overflow-hidden flex justify-center relative">
        <LeftSidebar activeView={activeView} onViewChange={handleViewChange} />
        <div className="flex-1 max-w-2xl h-full relative overflow-hidden">
          <div
            key={activeView}
            className="absolute inset-0 animate-fade-in-up"
            style={{ animationDuration: "0.4s" }}
          >
            {renderView()}
          </div>
        </div>
        <RightSidebar />
      </div>

      <MobileNav onCreatePost={togglePostModal} activeView={activeView} onViewChange={handleViewChange} />

      {showPostModal && <CreatePostModal onClose={togglePostModal} />}
    </div>
  )
}
