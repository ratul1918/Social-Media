# unip - Modern Social Network Platform

A professional, modern social network platform built with React, Vite, and Tailwind CSS. Connect, share, and build your network with an intuitive and elegant interface.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/react-19.2.0-61dafb.svg)

## 🌟 Features

### Core Features
- **Authentication** - Secure login and signup with email/student ID
- **Feed** - Real-time feed with post creation and interactions
- **Connections** - Build and manage your professional network
- **Groups** - Join and participate in group discussions
- **Events** - Discover and manage events
- **Saved Posts** - Bookmark and organize your favorite content

### Additional Features
- **Job Board** - Career opportunities and internship postings
- **Alumni Network** - Connect with alumni worldwide
- **Marketplace** - Buy and sell items within the community
- **Study Groups** - Collaborate with peers on academic topics
- **Notifications** - Real-time updates and alerts
- **Direct Messaging** - Private communications
- **Search** - Powerful search across users, posts, and content

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.2
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **CSS Processing**: PostCSS & Autoprefixer
- **Icons**: FontAwesome 6.4
- **Fonts**: Google Fonts (Inter)
- **State Management**: React Hooks

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Uni-p
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

## 📦 Available Scripts

- `npm run dev` - Start the development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint for code quality

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── AuthSection.jsx      # Login/Signup
│   ├── Dashboard.jsx        # Main dashboard layout
│   ├── Feed.jsx             # Post feed
│   ├── Navbar.jsx           # Top navigation
│   ├── LeftSidebar.jsx      # Navigation menu
│   ├── RightSidebar.jsx     # Trending/recommendations
│   └── ... (other components)
├── App.jsx              # Root component
├── main.jsx             # Entry point
├── App.css              # Global styles
├── index.css            # Base styles
└── public/              # Static assets

Configuration Files:
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── postcss.config.mjs   # PostCSS configuration
└── package.json         # Project metadata
```

## 🎨 Color Scheme

The application uses a modern, professional color palette:

- **Primary**: `#2563eb` (Blue 600)
- **Primary Dark**: `#1e40af` (Blue 700)
- **Primary Light**: `#3b82f6` (Blue 500)
- **Accent**: `#7c3aed` (Purple 600)
- **Success**: `#10b981` (Green 600)
- **Background**: `#f8fafc` (Slate 50)

## 🔧 Configuration

### Tailwind CSS
Customize the design system in `tailwind.config.js`:
- Extended color palette
- Custom animations
- Custom fonts (Inter)

### Vite
Development and build settings are configured in `vite.config.js`

## 📱 Responsive Design

The application is fully responsive with optimized layouts for:
- Desktop (1024px and above)
- Tablet (768px to 1023px)
- Mobile (below 768px)

## 🚧 Roadmap

### Backend (Not Yet Implemented)
- Node.js/Express API server
- Database schema design
- Authentication middleware
- API endpoints for all features

### Database (Not Yet Implemented)
- Database selection and setup
- Schema design
- Relationships and migrations

### Future Enhancements
- Real-time notifications with WebSocket
- Video/audio calling
- Advanced search filters
- Analytics dashboard
- Mobile apps (iOS/Android)

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Create a feature branch
2. Make your changes
3. Write clear commit messages
4. Push to the branch
5. Create a Pull Request

## 📧 Contact

For questions or support, please reach out to the development team.

---

**Note**: This is a frontend-only prototype. Backend integration and database setup are pending for full functionality.
