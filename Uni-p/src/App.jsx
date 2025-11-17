import { useState, useEffect } from "react"
import SplashScreen from "./components/SplashScreen"
import AuthSection from "./components/AuthSection"
import Dashboard from "./components/Dashboard"
import Toast from "./components/Toast"
import "./App.css"

function App() {
  const [currentScreen, setCurrentScreen] = useState("splash") // splash, auth, dashboard
  const [isLoading, setIsLoading] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [splashOpacity, setSplashOpacity] = useState(1)

  useEffect(() => {
    // Show splash for 2.5 seconds, then fade out
    const splashTimer = setTimeout(() => {
      setSplashOpacity(0)
      // Reveal Auth Section after splash fades
      setTimeout(() => {
        setCurrentScreen("auth")
      }, 700)
    }, 2500)

    return () => clearTimeout(splashTimer)
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Show success toast
    setToastMessage("Welcome to UIU Network!")
    setShowToast(true)

    // Transition to Dashboard
    setTimeout(() => {
      setCurrentScreen("dashboard")
      setIsLoading(false)
      setTimeout(() => {
        setShowToast(false)
      }, 3000)
    }, 500)
  }

  return (
    <div className="text-slate-800 h-screen w-screen overflow-hidden relative">
      {currentScreen === "splash" && (
        <SplashScreen opacity={splashOpacity} />
      )}
      {currentScreen === "auth" && (
        <AuthSection onLogin={handleLogin} isLoading={isLoading} />
      )}
      {currentScreen === "dashboard" && <Dashboard />}
      {showToast && <Toast message={toastMessage} />}
    </div>
  )
}

export default App
