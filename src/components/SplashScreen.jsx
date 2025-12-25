export default function SplashScreen({ opacity = 1 }) {
  return (
    <div
      id="splash-screen"
      className="splash-bg fixed inset-0 z-50 flex flex-col items-center justify-center text-white transition-opacity duration-700"
      style={{ opacity }}
    >
      <div className="relative animate-bounce-slight">
        <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center shadow-2xl transform rotate-3">
          <i className="fas fa-graduation-cap text-uiu-blue text-5xl"></i>
        </div>
        <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-uiu-crimson rounded-full flex items-center justify-center border-4 border-uiu-blue">
          <i className="fas fa-bolt text-white text-sm"></i>
        </div>
      </div>
      <h1 className="mt-6 text-3xl font-bold tracking-wider">
        UIU <span className="text-uiu-crimson">SOCIAL</span>
      </h1>
      <p className="mt-2 text-gray-400 text-sm tracking-widest uppercase">Connect. Share. Inspire.</p>
    </div>
  )
}
