# Development Guide for unip

## Getting Started

This guide will help you set up and develop the unip social network platform.

## 1. Initial Setup

### Clone & Install
```bash
cd Uni-p
npm install
```

### Start Development
```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

## 2. Project Structure Overview

### `/src/components`
- **AuthSection.jsx** - Login/Signup forms and authentication UI
- **Dashboard.jsx** - Main app container handling view routing
- **Feed.jsx** - Social feed with posts
- **Navbar.jsx** - Top navigation bar with search
- **LeftSidebar.jsx** - Navigation menu
- **RightSidebar.jsx** - Trending/Recommendations
- **PostCard.jsx** - Individual post component
- **CreatePostModal.jsx** - Post creation dialog
- Other feature components (Chat, Groups, Events, etc.)

### Style Files
- **App.css** - Global styles and animations
- **index.css** - Base styling
- Tailwind CSS for utility classes

## 3. Color System

The app uses Tailwind CSS colors with the following primary colors:

```javascript
// Primary colors
blue-600    // Main brand color
blue-500    // Light variant
blue-700    // Dark variant
purple-600  // Accent/Secondary
```

To change colors globally, update:
1. `tailwind.config.js` - Custom color palette
2. `App.css` - CSS variables

## 4. Component Development

### Creating a New Component

```jsx
// src/components/MyComponent.jsx
export default function MyComponent() {
  return (
    <div className="p-4 rounded-lg bg-white shadow-sm">
      {/* Component content */}
    </div>
  )
}
```

### Using Icons
```jsx
<i className="fas fa-home"></i> {/* FontAwesome icons */}
```

Browse available icons: https://fontawesome.com/icons

### Responsive Classes
```jsx
// Hidden on mobile, visible on desktop
<div className="hidden md:block">Desktop Only</div>

// Mobile first approach
<div className="w-full md:w-1/2 lg:w-1/3">
  Responsive width
</div>
```

## 5. Building for Production

```bash
npm run build
```

This creates an optimized build in the `dist/` directory.

### Preview Production Build
```bash
npm run preview
```

## 6. Code Quality

### Run Linter
```bash
npm run lint
```

Fix common issues:
```bash
npm run lint -- --fix
```

## 7. Next Steps: Backend Integration

### When Backend is Ready:

1. **API Configuration**
   - Create `src/config/api.js` with API base URL
   - Setup axios or fetch client

2. **API Calls**
   ```jsx
   // Example: src/api/auth.js
   export const loginUser = async (email, password) => {
     const response = await fetch('/api/auth/login', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ email, password })
     });
     return response.json();
   }
   ```

3. **State Management**
   - Consider Redux or Context API for global state
   - Store user info, authentication token, etc.

4. **Environment Variables**
   ```
   VITE_API_URL=http://localhost:3000
   ```

## 8. Common Tasks

### Adding a New Page
1. Create component in `/src/components`
2. Add route in `Dashboard.jsx`
3. Add navigation item in `LeftSidebar.jsx`
4. Style with Tailwind CSS

### Updating Styles
- Prefer Tailwind utility classes
- Use `App.css` for custom animations and global styles
- Keep components responsive

### Working with Forms
- Use React hooks (useState, useRef)
- Validate user input
- Provide user feedback (toast notifications)

## 9. Performance Tips

- Keep components focused and small
- Use React.memo for expensive components
- Lazy load images with loading states
- Optimize animations (animate-pulse, animate-bounce)

## 10. Resources

- [React Docs](https://react.dev)
- [Vite Docs](https://vitejs.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [FontAwesome Icons](https://fontawesome.com/icons)
- [MDN Web Docs](https://developer.mozilla.org)

## 11. Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
npm run dev
```

### Node Modules Issues
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build Fails
```bash
npm run lint -- --fix
npm run build
```

---

**Questions?** Check the README.md for more information or reach out to the team.
