import { useState, useEffect } from "react"

export default function ImageGallery({ images, initialIndex = 0, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Escape") {
        handleClose()
      } else if (e.key === "ArrowLeft") {
        handlePrevious()
      } else if (e.key === "ArrowRight") {
        handleNext()
      }
    }
    document.addEventListener("keydown", handleKeyPress)
    return () => document.removeEventListener("keydown", handleKeyPress)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => {
      if (onClose) onClose()
    }, 300)
  }

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  if (!isVisible && !images.length) return null

  return (
    <div
      className={`fixed inset-0 z-[60] bg-black/95 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleClose}
    >
      {/* Close Button */}
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-all z-10 backdrop-blur-sm"
      >
        <i className="fas fa-times text-xl"></i>
      </button>

      {/* Navigation Buttons */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation()
              handlePrevious()
            }}
            className="absolute left-4 w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-all z-10 backdrop-blur-sm"
          >
            <i className="fas fa-chevron-left text-xl"></i>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleNext()
            }}
            className="absolute right-4 w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-all z-10 backdrop-blur-sm"
          >
            <i className="fas fa-chevron-right text-xl"></i>
          </button>
        </>
      )}

      {/* Image Container */}
      <div
        className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <img
            src={images[currentIndex]}
            alt={`Image ${currentIndex + 1}`}
            className="max-w-full max-h-full object-contain rounded-lg animate-fade-in"
          />
        </div>

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm">
            {currentIndex + 1} / {images.length}
          </div>
        )}

        {/* Thumbnail Strip */}
        {images.length > 1 && (
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex gap-2 max-w-full overflow-x-auto px-4">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  idx === currentIndex ? "border-white scale-110" : "border-white/30 opacity-60 hover:opacity-100"
                }`}
              >
                <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Keyboard Hints */}
      {images.length > 1 && (
        <div className="absolute bottom-4 right-4 text-white/60 text-xs space-y-1">
          <div className="flex items-center gap-2">
            <kbd className="px-2 py-1 bg-white/10 rounded text-xs">←</kbd>
            <span>Previous</span>
          </div>
          <div className="flex items-center gap-2">
            <kbd className="px-2 py-1 bg-white/10 rounded text-xs">→</kbd>
            <span>Next</span>
          </div>
          <div className="flex items-center gap-2">
            <kbd className="px-2 py-1 bg-white/10 rounded text-xs">ESC</kbd>
            <span>Close</span>
          </div>
        </div>
      )}
    </div>
  )
}

