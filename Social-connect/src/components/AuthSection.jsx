import { useState, useEffect } from "react"

export default function AuthSection({ onLogin, isLoading }) {
  const [isLogin, setIsLogin] = useState(true)
  const [, setShowForgotPassword] = useState(false)
  const [opacity, setOpacity] = useState(0)
  const [showPasswords, setShowPasswords] = useState({})
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  // Login form data
  const [loginData, setLoginData] = useState({
    id: "",
    password: "",
    rememberMe: false,
  })

  // Signup form data
  const [signupData, setSignupData] = useState({
    name: "",
    studentId: "",
    email: "",
    password: "",
    confirmPassword: "",
    department: "",
    agreeTerms: false,
  })

  useEffect(() => {
    // Trigger fade-in animation
    requestAnimationFrame(() => {
      setOpacity(1)
    })
  }, [])

  const toggleAuthMode = (mode) => {
    if (mode === "login" && !isLogin) {
      setIsLogin(true)
    } else if (mode === "signup" && isLogin) {
      setIsLogin(false)
    }
    setErrors({})
    setTouched({})
    setShowPasswords({}) // Reset password visibility when switching forms
  }

  const handleLoginChange = (e) => {
    const { name, value, type, checked } = e.target
    setLoginData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSignupChange = (e) => {
    const { name, value, type, checked } = e.target
    setSignupData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateLogin = () => {
    const newErrors = {}
    if (!loginData.id.trim()) {
      newErrors.id = "Student ID or Email is required"
    }
    if (!loginData.password) {
      newErrors.password = "Password is required"
    } else if (loginData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateSignup = () => {
    const newErrors = {}
    if (!signupData.name.trim()) {
      newErrors.name = "Name is required"
    }
    if (!signupData.studentId.trim()) {
      newErrors.studentId = "Student ID is required"
    }
    if (!signupData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(signupData.email)) {
      newErrors.email = "Email is invalid"
    } else if (!signupData.email.endsWith("@uiu.ac.bd")) {
      newErrors.email = "Please use your UIU email (@uiu.ac.bd)"
    }
    if (!signupData.password) {
      newErrors.password = "Password is required"
    } else if (signupData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }
    if (signupData.password !== signupData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }
    if (!signupData.department) {
      newErrors.department = "Department is required"
    }
    if (!signupData.agreeTerms) {
      newErrors.agreeTerms = "You must agree to the terms"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    if (validateLogin()) {
      onLogin(e)
    }
  }

  const handleSignupSubmit = (e) => {
    e.preventDefault()
    if (validateSignup()) {
      // Simulate signup success, then switch to login
      setTimeout(() => {
        toggleAuthMode("login")
        // Show success message
      }, 1000)
    }
  }

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }

  const togglePasswordVisibility = (fieldName) => {
    setShowPasswords((prev) => ({
      ...prev,
      [fieldName]: !prev[fieldName],
    }))
  }

  return (
    <div
      id="auth-section"
      className="fixed inset-0 z-40 flex items-center justify-center bg-gradient-to-br from-gray-50 via-gray-100 to-slate-50 transition-opacity duration-500 min-h-screen overflow-y-auto py-8"
      style={{ opacity }}
    >
      {/* Animated Background decoration */}
      <div className="absolute top-0 left-0 w-full h-80 bg-gradient-to-br from-blue-600 via-blue-500 to-blue-600 rounded-b-[4rem] transform transition-transform duration-700"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "1s" }}></div>

      <div className="relative w-full max-w-md p-6 z-10">
        {/* Toggle Tabs */}
        <div className="mb-6 flex bg-white/50 backdrop-blur-sm rounded-2xl p-1.5 shadow-lg">
          <button
            onClick={() => toggleAuthMode("login")}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold text-sm transition-all-300 transform ${
              isLogin
                ? "bg-blue-600 text-white shadow-md scale-105"
                : "text-gray-600 hover:text-blue-600 hover:bg-white/50"
            }`}
          >
            <i className="fas fa-sign-in-alt mr-2"></i>
            Login
          </button>
          <button
            onClick={() => toggleAuthMode("signup")}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold text-sm transition-all-300 transform ${
              !isLogin
                ? "bg-purple-600 text-white shadow-md scale-105"
                : "text-gray-600 hover:text-purple-600 hover:bg-white/50"
            }`}
          >
            <i className="fas fa-user-plus mr-2"></i>
            Sign Up
          </button>
        </div>

        {/* Form Card */}
        <div
          key={isLogin ? "login" : "signup"}
          className="glass-card rounded-3xl shadow-2xl p-8"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block p-3 bg-blue-100 rounded-2xl mb-4">
              <i className={`fas ${isLogin ? "fa-graduation-cap" : "fa-user-graduate"} text-blue-600 text-3xl`}></i>
            </div>
            <h2 className="text-3xl font-bold text-blue-600 mb-2">
              {isLogin ? "Welcome Back" : "Join unip"}
            </h2>
            <p className="text-gray-500 text-sm">
              {isLogin
                ? "Enter your credentials to access the network"
                : "Create your account to connect with the unip community"}
            </p>
          </div>

          {/* Login Form */}
          {isLogin && (
            <form onSubmit={handleLoginSubmit} className="space-y-1">
              <div className="mb-4">
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-2">
                  Student ID / Email <span className="text-purple-600 ml-1">*</span>
                </label>
                <div className="relative group">
                  <i className={`fas fa-id-card absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 transition-colors duration-300 ${errors.id && touched.id ? "text-red-500" : "group-focus-within:text-purple-600"}`}></i>
                  <input
                    type="text"
                    name="id"
                    value={loginData.id}
                    onChange={handleLoginChange}
                    onBlur={() => handleBlur("id")}
                    placeholder="011233055 or your@email.com"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border-2 transition-all-300 text-sm ${
                      errors.id && touched.id
                        ? "border-red-300 focus:border-red-500 focus:bg-red-50"
                        : "border-gray-200 focus:border-uiu-crimson focus:bg-white focus:shadow-md"
                    }`}
                    required
                  />
                </div>
                {errors.id && touched.id && (
                  <p className="mt-1 text-xs text-red-500">{errors.id}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-2">
                  Password <span className="text-uiu-crimson ml-1">*</span>
                </label>
                <div className="relative group">
                  <i className={`fas fa-lock absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 transition-colors duration-300 ${errors.password && touched.password ? "text-red-500" : "group-focus-within:text-uiu-crimson"}`}></i>
                  <input
                    type={showPasswords.password ? "text" : "password"}
                    name="password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    onBlur={() => handleBlur("password")}
                    placeholder="Enter your password"
                    className={`w-full pl-10 pr-12 py-3 rounded-xl bg-gray-50 border-2 transition-all-300 text-sm ${
                      errors.password && touched.password
                        ? "border-red-300 focus:border-red-500 focus:bg-red-50"
                        : "border-gray-200 focus:border-purple-600 focus:bg-white focus:shadow-md"
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("password")}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-uiu-crimson transition-colors z-10"
                  >
                    <i className={`fas ${showPasswords.password ? "fa-eye-slash" : "fa-eye"}`}></i>
                  </button>
                </div>
                {errors.password && touched.password && (
                  <p className="mt-1 text-xs text-red-500">{errors.password}</p>
                )}
              </div>

              <div className="flex justify-between items-center mt-4 mb-6">
                <label className="flex items-center text-sm text-gray-600 cursor-pointer group">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={loginData.rememberMe}
                    onChange={handleLoginChange}
                    className="mr-2 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-purple-600 cursor-pointer transition-all"
                  />
                  <span className="group-hover:text-blue-600 transition-colors">Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-sm text-purple-600 font-medium hover:underline transition-all"
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-900/30 transition-all transform hover:scale-[1.02] active:scale-95 flex justify-center items-center disabled:opacity-75 disabled:cursor-not-allowed group"
              >
                {isLoading ? (
                  <div className="loader border-white border-t-transparent w-5 h-5"></div>
                ) : (
                  <>
                    <span className="group-hover:translate-x-1 transition-transform">Sign In</span>
                    <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                  </>
                )}
              </button>
            </form>
          )}

          {/* Signup Form */}
          {!isLogin && (
            <form onSubmit={handleSignupSubmit} className="space-y-1">
              <div className="mb-4">
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-2">
                  Full Name <span className="text-uiu-crimson ml-1">*</span>
                </label>
                <div className="relative group">
                  <i className={`fas fa-user absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 transition-colors duration-300 ${errors.name && touched.name ? "text-red-500" : "group-focus-within:text-uiu-crimson"}`}></i>
                  <input
                    type="text"
                    name="name"
                    value={signupData.name}
                    onChange={handleSignupChange}
                    onBlur={() => handleBlur("name")}
                    placeholder="John Doe"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border-2 transition-all-300 text-sm ${
                      errors.name && touched.name
                        ? "border-red-300 focus:border-red-500 focus:bg-red-50"
                        : "border-gray-200 focus:border-uiu-crimson focus:bg-white focus:shadow-md"
                    }`}
                    required
                  />
                </div>
                {errors.name && touched.name && (
                  <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-2">
                    Student ID <span className="text-uiu-crimson ml-1">*</span>
                  </label>
                  <div className="relative group">
                    <i className={`fas fa-id-card absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 transition-colors duration-300 ${errors.studentId && touched.studentId ? "text-red-500" : "group-focus-within:text-uiu-crimson"}`}></i>
                    <input
                      type="text"
                      name="studentId"
                      value={signupData.studentId}
                      onChange={handleSignupChange}
                      onBlur={() => handleBlur("studentId")}
                      placeholder="011233055"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border-2 transition-all-300 text-sm ${
                        errors.studentId && touched.studentId
                          ? "border-red-300 focus:border-red-500 focus:bg-red-50"
                          : "border-gray-200 focus:border-uiu-crimson focus:bg-white focus:shadow-md"
                      }`}
                      required
                    />
                  </div>
                  {errors.studentId && touched.studentId && (
                    <p className="mt-1 text-xs text-red-500">{errors.studentId}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-2">
                    Department <span className="text-uiu-crimson ml-1">*</span>
                  </label>
                  <div className="relative group">
                    <i className={`fas fa-building absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 transition-colors duration-300 ${errors.department && touched.department ? "text-red-500" : "group-focus-within:text-uiu-crimson"}`}></i>
                    <select
                      name="department"
                      value={signupData.department}
                      onChange={handleSignupChange}
                      onBlur={() => handleBlur("department")}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border-2 transition-all-300 text-sm appearance-none cursor-pointer ${
                        errors.department && touched.department
                          ? "border-red-300 focus:border-red-500 focus:bg-red-50"
                          : "border-gray-200 focus:border-uiu-crimson focus:bg-white focus:shadow-md"
                      }`}
                      required
                    >
                      <option value="">Select Department</option>
                      <option value="cse">CSE</option>
                      <option value="bba">BBA</option>
                      <option value="eee">EEE</option>
                      <option value="ece">ECE</option>
                      <option value="law">Law</option>
                      <option value="pharmacy">Pharmacy</option>
                    </select>
                  </div>
                  {errors.department && touched.department && (
                    <p className="mt-1 text-xs text-red-500">{errors.department}</p>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-2">
                  Email Address <span className="text-uiu-crimson ml-1">*</span>
                </label>
                <div className="relative group">
                  <i className={`fas fa-envelope absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 transition-colors duration-300 ${errors.email && touched.email ? "text-red-500" : "group-focus-within:text-uiu-crimson"}`}></i>
                  <input
                    type="email"
                    name="email"
                    value={signupData.email}
                    onChange={handleSignupChange}
                    onBlur={() => handleBlur("email")}
                    placeholder="your@email.com"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border-2 transition-all-300 text-sm ${
                      errors.email && touched.email
                        ? "border-red-300 focus:border-red-500 focus:bg-red-50"
                        : "border-gray-200 focus:border-uiu-crimson focus:bg-white focus:shadow-md"
                    }`}
                    required
                  />
                </div>
                {errors.email && touched.email && (
                  <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-2">
                  Password <span className="text-uiu-crimson ml-1">*</span>
                </label>
                <div className="relative group">
                  <i className={`fas fa-lock absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 transition-colors duration-300 ${errors.password && touched.password ? "text-red-500" : "group-focus-within:text-uiu-crimson"}`}></i>
                  <input
                    type={showPasswords.password ? "text" : "password"}
                    name="password"
                    value={signupData.password}
                    onChange={handleSignupChange}
                    onBlur={() => handleBlur("password")}
                    placeholder="Minimum 6 characters"
                    className={`w-full pl-10 pr-12 py-3 rounded-xl bg-gray-50 border-2 transition-all-300 text-sm ${
                      errors.password && touched.password
                        ? "border-red-300 focus:border-red-500 focus:bg-red-50"
                        : "border-gray-200 focus:border-uiu-crimson focus:bg-white focus:shadow-md"
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("password")}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-uiu-crimson transition-colors z-10"
                  >
                    <i className={`fas ${showPasswords.password ? "fa-eye-slash" : "fa-eye"}`}></i>
                  </button>
                </div>
                {errors.password && touched.password && (
                  <p className="mt-1 text-xs text-red-500">{errors.password}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-2">
                  Confirm Password <span className="text-uiu-crimson ml-1">*</span>
                </label>
                <div className="relative group">
                  <i className={`fas fa-lock absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 transition-colors duration-300 ${errors.confirmPassword && touched.confirmPassword ? "text-red-500" : "group-focus-within:text-uiu-crimson"}`}></i>
                  <input
                    type={showPasswords.confirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={signupData.confirmPassword}
                    onChange={handleSignupChange}
                    onBlur={() => handleBlur("confirmPassword")}
                    placeholder="Re-enter your password"
                    className={`w-full pl-10 pr-12 py-3 rounded-xl bg-gray-50 border-2 transition-all-300 text-sm ${
                      errors.confirmPassword && touched.confirmPassword
                        ? "border-red-300 focus:border-red-500 focus:bg-red-50"
                        : "border-gray-200 focus:border-uiu-crimson focus:bg-white focus:shadow-md"
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("confirmPassword")}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-uiu-crimson transition-colors z-10"
                  >
                    <i className={`fas ${showPasswords.confirmPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                  </button>
                </div>
                {errors.confirmPassword && touched.confirmPassword && (
                  <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>
                )}
              </div>

              <div className="mt-4 mb-6">
                <label className="flex items-start text-sm text-gray-600 cursor-pointer group">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={signupData.agreeTerms}
                    onChange={handleSignupChange}
                    className="mr-2 mt-1 w-4 h-4 rounded border-gray-300 text-uiu-crimson focus:ring-uiu-crimson cursor-pointer transition-all"
                  />
                  <span className="group-hover:text-uiu-blue transition-colors">
                    I agree to the{" "}
                    <a href="#" className="text-uiu-crimson font-medium hover:underline">
                      Terms & Conditions
                    </a>
                  </span>
                </label>
                {errors.agreeTerms && touched.agreeTerms && (
                  <p className="mt-1 text-xs text-red-500">{errors.agreeTerms}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-uiu-crimson to-uiu-crimsonHover hover:from-uiu-crimsonHover hover:to-uiu-crimson text-white rounded-xl font-semibold shadow-lg shadow-orange-900/30 transition-all transform hover:scale-[1.02] active:scale-95 flex justify-center items-center group"
              >
                <span className="group-hover:translate-x-1 transition-transform">Create Account</span>
                <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
              </button>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm">
            {isLogin ? (
              <>
                Don&apos;t have an account?{" "}
                <button
                  onClick={() => toggleAuthMode("signup")}
                  className="text-uiu-crimson font-semibold hover:underline transition-all"
                >
                  Sign up now
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => toggleAuthMode("login")}
                  className="text-uiu-blue font-semibold hover:underline transition-all"
                >
                  Sign in
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}
