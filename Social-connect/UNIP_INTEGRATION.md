# unip Integration Guide

## What is unip?

**unip** is the professionally rebranded and redesigned version of your social media project.

### Key Improvements

#### 1. Professional Branding
```
BEFORE: UIU Social Network
AFTER:  unip (Universal Professional Network)
```

#### 2. Modern Color Scheme
```
BEFORE:
- Dark Blue: #0F2B5B
- Orange: #E04F00

AFTER (Modern):
- Primary Blue: #2563eb
- Accent Purple: #7c3aed
- Background: #f8fafc
```

#### 3. Visual Enhancements
- Glass morphism effects
- Smooth animations
- Professional typography (Inter font)
- Gradient "U" logo
- Clean, minimal design

---

## Features

### Core Functionality
- 👤 User Authentication (UI ready)
- 📰 Social Feed
- 🤝 Connections/Friends
- 👥 Groups & Communities
- 📅 Events Management
- 💼 Job Board
- 🛍️ Marketplace
- 💬 Chat & Messaging
- 🔔 Notifications
- 🔍 Search

### Technical Stack
- **Frontend:** React 19.2 with Vite
- **Styling:** Tailwind CSS
- **Icons:** FontAwesome
- **Build Tool:** Vite (fast bundling)
- **Code Quality:** ESLint

---

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview build
npm run preview
```

Visit: `http://localhost:5173`

---

## Project Structure

```
src/
├── components/          # 30+ React components
│   ├── Navbar.jsx      # Header with navigation
│   ├── Feed.jsx        # Main social feed
│   ├── Profile.jsx     # User profiles
│   ├── Chat.jsx        # Messaging interface
│   ├── Groups.jsx      # Communities
│   ├── Events.jsx      # Event management
│   ├── JobBoard.jsx    # Job listings
│   └── [20+ more components]
├── App.jsx             # Main application
├── App.css             # Global styles
├── main.jsx            # Entry point
└── index.css           # Base styles

Config Files:
├── tailwind.config.js  # Design system
├── vite.config.js      # Build configuration
├── package.json        # Dependencies
└── postcss.config.mjs  # CSS processing
```

---

## Development Commands

```bash
# Development
npm run dev              # Start development server

# Building
npm run build            # Create production build
npm run preview          # Test production build locally

# Code Quality
npm run lint             # Check code style
npm run lint -- --fix    # Fix code issues automatically
```

---

## Design System Reference

### Colors
```
Primary: #2563eb (Blue) - Main actions, primary elements
Secondary: #7c3aed (Purple) - Highlights, accents
Success: #10b981 (Green) - Confirmations
Warning: #f59e0b (Amber) - Alerts
Danger: #ef4444 (Red) - Errors, destructive actions
```

### Typography
- Font Family: Inter (Google Fonts)
- Sizes: 12px, 14px, 16px, 18px, 20px, 24px, 32px

### Components
- Cards with shadow and rounded corners
- Buttons with hover effects
- Forms with validation
- Modals and dialogs
- Responsive grid layouts

---

## Component Examples

### Button
```jsx
<button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
  Click Me
</button>
```

### Card
```jsx
<div className="bg-white rounded-xl shadow-md p-6">
  <h3 className="text-lg font-bold mb-2">Title</h3>
  <p className="text-gray-600">Content goes here</p>
</div>
```

### Responsive Grid
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => <Card key={item.id} {...item} />)}
</div>
```

---

## Next Phase: Backend Integration

### Required Setup
1. Choose backend framework (Node.js, Python, etc.)
2. Setup database (MongoDB, PostgreSQL, MySQL)
3. Create REST/GraphQL API
4. Implement authentication tokens

### API Endpoints Needed
- POST `/auth/login` - User login
- POST `/auth/signup` - User registration
- GET `/feed` - Social feed
- POST `/posts` - Create post
- GET `/users/:id` - User profile
- GET `/connections` - User connections
- [And more based on features]

---

## Performance Tips

1. **Code Splitting**
   - Use React.lazy() for route components
   - Vite handles this automatically

2. **Image Optimization**
   - Use next-gen formats (WebP)
   - Optimize before uploading

3. **CSS**
   - Tailwind purges unused CSS
   - All styles are tree-shaken

4. **Bundle Analysis**
   - Use `vite-plugin-visualizer`
   - Check what's in your bundle

---

## Deployment Options

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm run build
# Drag dist folder to Netlify
```

### Docker
See DEPLOYMENT_GUIDE.md for Docker setup

---

## Troubleshooting

### Port Already in Use
```bash
# Change port in vite.config.js
export default {
  server: {
    port: 3000
  }
}
```

### Dependencies Issues
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
```bash
# Clear cache and rebuild
rm -rf dist .vite
npm run build
```

---

## Resources

- [React Docs](https://react.dev)
- [Vite Docs](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Font Awesome Icons](https://fontawesome.com)

---

## Support

For detailed information:
- **Quick Start:** QUICK_START.md
- **Development:** DEVELOPMENT_GUIDE.md
- **Design:** DESIGN_SYSTEM.md
- **Deployment:** DEPLOYMENT_GUIDE.md
- **Overview:** README.md

---

**Welcome to unip! Let's build something amazing.** 🚀
