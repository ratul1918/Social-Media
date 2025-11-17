import { useState } from "react"

export default function Marketplace() {
  const [activeTab, setActiveTab] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    category: "all",
    priceRange: "all",
    condition: "all",
  })

  const items = [
    {
      id: 1,
      title: "Data Structures & Algorithms Textbook",
      seller: "Ahmed Khan",
      price: 500,
      originalPrice: 1200,
      category: "books",
      condition: "good",
      image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400",
      description: "Used textbook in good condition. No highlights or notes.",
      location: "Campus",
      posted: "2 days ago",
      contact: "+880 1712-345678",
    },
    {
      id: 2,
      title: "MacBook Pro 13 inch (2020)",
      seller: "Sarah Ahmed",
      price: 45000,
      originalPrice: 80000,
      category: "electronics",
      condition: "excellent",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
      description: "Well maintained MacBook. Battery health 85%. Comes with charger and case.",
      location: "Dhanmondi",
      posted: "1 day ago",
      contact: "+880 1712-345679",
    },
    {
      id: 3,
      title: "Calculus Textbook Set",
      seller: "Rahim Ali",
      price: 800,
      originalPrice: 2000,
      category: "books",
      condition: "fair",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      description: "Complete set of calculus textbooks. Some notes inside but still usable.",
      location: "Campus",
      posted: "3 days ago",
      contact: "+880 1712-345680",
    },
    {
      id: 4,
      title: "Scientific Calculator",
      seller: "Fatima Begum",
      price: 300,
      originalPrice: 800,
      category: "electronics",
      condition: "excellent",
      image: "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=400",
      description: "Casio fx-991EX. Like new condition. Used for one semester only.",
      location: "Campus",
      posted: "5 days ago",
      contact: "+880 1712-345681",
    },
    {
      id: 5,
      title: "Lab Coat (Size M)",
      seller: "Hasan Rahman",
      price: 400,
      originalPrice: 1000,
      category: "clothing",
      condition: "good",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
      description: "Clean lab coat, perfect for chemistry/pharmacy students.",
      location: "Campus",
      posted: "1 week ago",
      contact: "+880 1712-345682",
    },
    {
      id: 6,
      title: "Graphing Calculator TI-84",
      seller: "Ayesha Khan",
      price: 2500,
      originalPrice: 5000,
      category: "electronics",
      condition: "good",
      image: "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=400",
      description: "Texas Instruments TI-84 Plus. Works perfectly, includes manual.",
      location: "Gulshan",
      posted: "4 days ago",
      contact: "+880 1712-345683",
    },
  ]

  const filteredItems = items.filter((item) => {
    if (filters.category !== "all" && item.category !== filters.category) return false
    if (filters.condition !== "all" && item.condition !== filters.condition) return false
    return true
  })

  const displayItems = activeTab === "all" ? filteredItems : filteredItems.filter((item) => item.category === activeTab)

  return (
    <main className="flex-1 max-w-2xl h-full overflow-y-auto pb-20 scroll-smooth no-scrollbar relative">
      <div className="py-6 px-4">
        {/* Header */}
        <div className="mb-6 animate-fade-in-up">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Marketplace</h1>
          <p className="text-gray-500">Buy and sell textbooks, electronics, and more from fellow students</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          {[
            { key: "all", label: "All Items", icon: "fa-th" },
            { key: "books", label: "Books", icon: "fa-book" },
            { key: "electronics", label: "Electronics", icon: "fa-laptop" },
            { key: "clothing", label: "Clothing", icon: "fa-tshirt" },
            { key: "other", label: "Other", icon: "fa-box" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                activeTab === tab.key
                  ? "bg-uiu-blue text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <i className={`fas ${tab.icon} mr-2`}></i>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="mb-6 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all"
          >
            <i className="fas fa-filter text-gray-500"></i>
            <span className="font-medium text-gray-700">Filters</span>
            <i className={`fas fa-chevron-${showFilters ? "up" : "down"} text-xs text-gray-500 ml-auto`}></i>
          </button>

          {showFilters && (
            <div className="mt-3 p-4 bg-white rounded-lg shadow-sm border border-gray-200 space-y-3 animate-fade-in-up">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Condition</label>
                <select
                  value={filters.condition}
                  onChange={(e) => setFilters({ ...filters, condition: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-uiu-blue focus:ring-2 focus:ring-uiu-blue/20 outline-none"
                >
                  <option value="all">All Conditions</option>
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          {displayItems.map((item) => (
            <div key={item.id} className="glass-card bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all">
              <div className="relative h-48 overflow-hidden">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.condition === "excellent"
                        ? "bg-green-500 text-white"
                        : item.condition === "good"
                        ? "bg-blue-500 text-white"
                        : "bg-yellow-500 text-white"
                    }`}
                  >
                    {item.condition}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-800 mb-2 line-clamp-1">{item.title}</h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl font-bold text-uiu-blue">{item.price} BDT</span>
                  <span className="text-sm text-gray-400 line-through">{item.originalPrice} BDT</span>
                </div>
                <p className="text-xs text-gray-500 mb-3 line-clamp-2">{item.description}</p>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <span>
                    <i className="fas fa-map-marker-alt mr-1"></i>
                    {item.location}
                  </span>
                  <span>{item.posted}</span>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 px-4 py-2 bg-uiu-blue text-white rounded-lg font-medium hover:bg-uiu-lightBlue transition-colors text-sm">
                    <i className="fas fa-phone mr-2"></i>Contact
                  </button>
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                    <i className="fas fa-heart"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {displayItems.length === 0 && (
          <div className="text-center py-12 animate-fade-in-up">
            <i className="fas fa-shopping-cart text-6xl text-gray-300 mb-4"></i>
            <p className="text-gray-500">No items found matching your criteria</p>
          </div>
        )}
      </div>
    </main>
  )
}

