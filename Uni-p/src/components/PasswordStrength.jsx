export default function PasswordStrength({ password }) {
  const getStrength = (pwd) => {
    if (!pwd) return { strength: 0, label: "", color: "" }

    let strength = 0
    if (pwd.length >= 8) strength++
    if (pwd.length >= 12) strength++
    if (/[a-z]/.test(pwd)) strength++
    if (/[A-Z]/.test(pwd)) strength++
    if (/[0-9]/.test(pwd)) strength++
    if (/[^a-zA-Z0-9]/.test(pwd)) strength++

    if (strength <= 2) return { strength: 1, label: "Weak", color: "red" }
    if (strength <= 4) return { strength: 2, label: "Medium", color: "yellow" }
    if (strength <= 5) return { strength: 3, label: "Strong", color: "green" }
    return { strength: 4, label: "Very Strong", color: "green" }
  }

  const { strength, label, color } = getStrength(password)

  const getColorClass = () => {
    if (color === "red") return "bg-red-500"
    if (color === "yellow") return "bg-yellow-500"
    return "bg-green-500"
  }

  if (!password) return null

  return (
    <div className="mt-2">
      <div className="flex items-center gap-2 mb-1">
        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${getColorClass()}`}
            style={{ width: `${(strength / 4) * 100}%` }}
          ></div>
        </div>
        <span className={`text-xs font-medium ${
          color === "red" ? "text-red-600" : color === "yellow" ? "text-yellow-600" : "text-green-600"
        }`}>
          {label}
        </span>
      </div>
      <div className="text-xs text-gray-500 space-y-1">
        {password.length < 8 && <p className="flex items-center gap-1">
          <i className="fas fa-times text-red-500"></i>
          At least 8 characters
        </p>}
        {!/[A-Z]/.test(password) && <p className="flex items-center gap-1">
          <i className="fas fa-times text-red-500"></i>
          One uppercase letter
        </p>}
        {!/[0-9]/.test(password) && <p className="flex items-center gap-1">
          <i className="fas fa-times text-red-500"></i>
          One number
        </p>}
        {!/[^a-zA-Z0-9]/.test(password) && <p className="flex items-center gap-1">
          <i className="fas fa-times text-red-500"></i>
          One special character
        </p>}
        {password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[^a-zA-Z0-9]/.test(password) && (
          <p className="flex items-center gap-1 text-green-600">
            <i className="fas fa-check"></i>
            Password meets requirements
          </p>
        )}
      </div>
    </div>
  )
}

