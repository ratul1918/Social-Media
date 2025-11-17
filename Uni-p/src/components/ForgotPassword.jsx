import { useState } from "react"

export default function ForgotPassword({ onBack, onReset }) {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const uiuEmailRegex = /^[^\s@]+@uiu\.ac\.bd$/
    return emailRegex.test(email) && uiuEmailRegex.test(email)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}

    if (!email.trim()) {
      newErrors.email = "Email is required"
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid UIU email (@uiu.ac.bd)"
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitted(true)
      // Simulate sending reset email
      setTimeout(() => {
        if (onReset) {
          onReset(email)
        }
      }, 1000)
    }
  }

  if (isSubmitted) {
    return (
      <div className="text-center py-8 animate-fade-in-up">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <i className="fas fa-check text-green-600 text-2xl"></i>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Check Your Email</h3>
        <p className="text-gray-600 mb-4">
          We've sent a password reset link to <span className="font-semibold">{email}</span>
        </p>
        <p className="text-sm text-gray-500 mb-6">
          Please check your inbox and follow the instructions to reset your password.
        </p>
        <button
          onClick={onBack}
          className="px-6 py-2 bg-uiu-blue text-white rounded-lg font-medium hover:bg-uiu-lightBlue transition-colors"
        >
          Back to Login
        </button>
      </div>
    )
  }

  return (
    <div className="animate-fade-in-up">
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-uiu-blue transition-colors mb-4"
        >
          <i className="fas fa-arrow-left"></i>
          <span>Back to Login</span>
        </button>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Forgot Password?</h2>
        <p className="text-gray-600">Enter your UIU email address and we'll send you a link to reset your password.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            UIU Email Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <i className="fas fa-envelope absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (errors.email) {
                  setErrors({ ...errors, email: "" })
                }
              }}
              placeholder="your.name@uiu.ac.bd"
              className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 transition-all ${
                errors.email
                  ? "border-red-300 focus:border-red-500 focus:bg-red-50"
                  : "border-gray-200 focus:border-uiu-blue focus:bg-white focus:shadow-md"
              }`}
            />
          </div>
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-uiu-blue text-white font-bold py-3 rounded-xl hover:bg-uiu-lightBlue transition-all shadow-lg shadow-blue-900/20 active:scale-95"
        >
          Send Reset Link
        </button>
      </form>
    </div>
  )
}

