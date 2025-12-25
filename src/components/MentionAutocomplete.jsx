import { useState, useEffect, useRef } from "react"

export default function MentionAutocomplete({ query, onSelect, onClose }) {
  const [suggestions, setSuggestions] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const listRef = useRef(null)

  useEffect(() => {
    if (query.trim().length > 0) {
      // Mock user suggestions
      const mockUsers = [
        { id: 1, name: "John Doe", studentId: "011233055", avatar: "https://i.pravatar.cc/150?u=1" },
        { id: 2, name: "Jane Smith", studentId: "011233056", avatar: "https://i.pravatar.cc/150?u=2" },
        { id: 3, name: "Mike Johnson", studentId: "011233057", avatar: "https://i.pravatar.cc/150?u=3" },
        { id: 4, name: "Sarah Williams", studentId: "011233058", avatar: "https://i.pravatar.cc/150?u=4" },
        { id: 5, name: "David Brown", studentId: "011233059", avatar: "https://i.pravatar.cc/150?u=5" },
      ]

      const filtered = mockUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(query.toLowerCase()) ||
          user.studentId.includes(query)
      )
      setSuggestions(filtered.slice(0, 5))
    } else {
      setSuggestions([])
    }
  }, [query])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (suggestions.length === 0) return

      if (e.key === "ArrowDown") {
        e.preventDefault()
        setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev))
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0))
      } else if (e.key === "Enter") {
        e.preventDefault()
        if (suggestions[selectedIndex]) {
          handleSelect(suggestions[selectedIndex])
        }
      } else if (e.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [suggestions, selectedIndex, onClose])

  const handleSelect = (user) => {
    if (onSelect) {
      onSelect(user)
    }
  }

  if (suggestions.length === 0) return null

  return (
    <div
      ref={listRef}
      className="absolute bottom-full left-0 mb-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 z-50 max-h-64 overflow-y-auto animate-fade-in-up"
    >
      {suggestions.map((user, idx) => (
        <button
          key={user.id}
          onClick={() => handleSelect(user)}
          className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left ${
            idx === selectedIndex ? "bg-uiu-blue/10" : ""
          }`}
        >
          <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
          <div>
            <h4 className="font-semibold text-gray-800 text-sm">{user.name}</h4>
            <p className="text-xs text-gray-500">{user.studentId}</p>
          </div>
        </button>
      ))}
    </div>
  )
}

