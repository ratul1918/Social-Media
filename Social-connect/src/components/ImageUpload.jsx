import { useState, useRef, useEffect } from "react"

export default function ImageUpload({ maxImages = 5, onImagesChange, existingImages = [] }) {
  const [images, setImages] = useState([])
  const [previews, setPreviews] = useState([])
  const fileInputRef = useRef(null)

  // Initialize with existing images if provided (URLs or File objects)
  useEffect(() => {
    if (existingImages.length > 0) {
      // Convert File objects to data URLs using FileReader
      const loadPreviews = async () => {
        const loadedPreviews = []
        for (const img of existingImages) {
          if (typeof img === "string") {
            loadedPreviews.push(img)
          } else if (img instanceof File) {
            const dataUrl = await new Promise((resolve) => {
              const reader = new FileReader()
              reader.onload = (e) => resolve(e.target.result)
              reader.readAsDataURL(img)
            })
            loadedPreviews.push(dataUrl)
          } else {
            loadedPreviews.push(img)
          }
        }
        setImages(existingImages)
        setPreviews(loadedPreviews)
      }
      loadPreviews()
    } else {
      // Reset when existingImages becomes empty
      setImages([])
      setPreviews([])
    }
  }, [existingImages])

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files)
    const remainingSlots = maxImages - images.length

    if (files.length > remainingSlots) {
      alert(`You can only upload ${remainingSlots} more image(s)`)
      e.target.value = "" // Reset input
      return
    }

    const imageFiles = files.filter((file) => file.type.startsWith("image/"))
    const newFiles = imageFiles.slice(0, remainingSlots)
    const newPreviews = []

    if (newFiles.length === 0) {
      e.target.value = ""
      return
    }

    let loadedCount = 0
    newFiles.forEach((file, index) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        newPreviews[index] = e.target.result
        loadedCount++
        if (loadedCount === newFiles.length) {
          // Filter out any undefined values (shouldn't happen, but safety check)
          const validPreviews = newPreviews.filter((p) => p !== undefined)
          const updatedPreviews = [...previews, ...validPreviews]
          const updatedImages = [...images, ...newFiles]
          setPreviews(updatedPreviews)
          setImages(updatedImages)
          onImagesChange(updatedImages)
        }
      }
      reader.onerror = () => {
        // File read error - skip this file
        newPreviews[index] = null // Mark as failed
        loadedCount++
        // Continue even if one file fails
        if (loadedCount === newFiles.length) {
          const validPreviews = newPreviews.filter((p) => p !== null && p !== undefined)
          const validFiles = newFiles.filter((_, i) => newPreviews[i] !== null && newPreviews[i] !== undefined)
          const updatedPreviews = [...previews, ...validPreviews]
          const updatedImages = [...images, ...validFiles]
          setPreviews(updatedPreviews)
          setImages(updatedImages)
          onImagesChange(updatedImages)
        }
      }
      reader.readAsDataURL(file)
    })

    e.target.value = "" // Reset input
  }

  const removeImage = (index) => {
    // Remove image and preview (data URLs don't need cleanup)
    const updatedPreviews = previews.filter((_, i) => i !== index)
    const updatedImages = images.filter((_, i) => i !== index)
    setPreviews(updatedPreviews)
    setImages(updatedImages)
    onImagesChange(updatedImages)
  }

  const openFileDialog = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="space-y-3">
      {/* Image Previews */}
      {previews.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {previews.map((preview, index) => (
            <div key={index} className="relative group aspect-square rounded-lg overflow-hidden">
              <img
                src={preview}
                alt={`Preview ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
              >
                <i className="fas fa-times text-sm"></i>
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                Image {index + 1}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Button */}
      {images.length < maxImages && (
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageSelect}
            className="hidden"
          />
          <button
            type="button"
            onClick={openFileDialog}
            className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-uiu-blue hover:bg-blue-50 transition-all flex items-center justify-center gap-2 text-gray-500 hover:text-uiu-blue"
          >
            <i className="fas fa-image text-xl"></i>
            <span className="font-medium">
              Add Photo{maxImages - images.length > 1 ? "s" : ""} ({images.length}/{maxImages})
            </span>
          </button>
        </div>
      )}

      {images.length >= maxImages && (
        <p className="text-xs text-gray-500 text-center">Maximum {maxImages} images allowed</p>
      )}
    </div>
  )
}

