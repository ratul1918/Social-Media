import { useEffect, useState } from "react"

export default function Toast({ message }) {
  const [isVisible, setIsVisible] = useState(true)
  const [translateX, setTranslateX] = useState("translate-x-full")

  useEffect(() => {
    // Slide in
    setTimeout(() => {
      setTranslateX("translate-x-0")
    }, 100)

    // Auto hide after 3 seconds
    const timer = setTimeout(() => {
      setTranslateX("translate-x-full")
      setTimeout(() => {
        setIsVisible(false)
      }, 500)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div
      id="toast"
      className={`fixed top-5 right-5 z-50 transform transition-transform duration-500 bg-white border-l-4 border-green-500 shadow-xl rounded-lg px-4 py-3 flex items-center gap-3 ${translateX}`}
    >
      <i className="fas fa-check-circle text-green-500 text-xl"></i>
      <div>
        <h4 className="font-bold text-sm text-gray-800">Success</h4>
        <p className="text-xs text-gray-500">{message}</p>
      </div>
    </div>
  )
}
