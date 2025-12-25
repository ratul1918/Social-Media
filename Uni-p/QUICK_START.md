# Quick Start Guide - unip

## 🚀 Get Started in 2 Minutes

### Step 1: Install Dependencies
```bash
cd Uni-p
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

### Step 3: Open in Browser
Visit: `http://localhost:5173`

## 👤 Try the Application

**Default Test Credentials** (Frontend only)
- Email: `demo@unip.com`
- Password: `Demo@123`

**Or Sign Up** to create a new account

## 📁 Key Files to Know

| File | Purpose |
|------|---------|
| `src/App.jsx` | Main app component |
| `src/components/` | All UI components |
| `src/App.css` | Global styling |
| `tailwind.config.js` | Design system |
| `package.json` | Project metadata |

## 🛠️ Common Commands

```bash
# Development
npm run dev          # Start dev server

# Build
npm run build        # Create production build
npm run preview      # Preview build locally

# Code Quality
npm run lint         # Check code style
npm run lint -- --fix # Fix code issues
```

## 📚 Documentation

- **README.md** - Project overview & features
- **DEVELOPMENT_GUIDE.md** - How to develop
- **DESIGN_SYSTEM.md** - Styling reference
- **DEPLOYMENT_GUIDE.md** - How to deploy
- **COMPLETION_CHECKLIST.md** - What was done

## 🎨 Quick Styling Tips

**Add a Button**
```jsx
<button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
  Click Me
</button>
```

**Add a Card**
```jsx
<div className="bg-white rounded-xl shadow-sm p-6">
  <h3 className="text-lg font-bold">Title</h3>
  <p className="text-gray-600">Content</p>
</div>
```

**Responsive Layout**
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Responsive columns */}
</div>
```

## 🔑 Key Features

✅ Modern UI with professional design
✅ Responsive on all devices
✅ Multiple app sections (Feed, Groups, Events, etc.)
✅ Chat and messaging interface
✅ User profiles
✅ Real-time notifications
✅ Search functionality

## ⚙️ Project Structure

```
src/
├── components/      # 30+ React components
├── App.jsx         # Main app
├── App.css         # Styles
├── main.jsx        # Entry point
└── index.css       # Base styles

Configuration:
├── tailwind.config.js
├── vite.config.js
├── postcss.config.mjs
└── package.json
```

## 🎯 What's Next?

1. **Explore Components**
   - Check out `src/components/` directory
   - Understand component structure

2. **Try Styling**
   - Modify Tailwind classes
   - Update colors in `tailwind.config.js`

3. **Build Backend**
   - Create API endpoints
   - Connect database

4. **Deploy**
   - Follow DEPLOYMENT_GUIDE.md
   - Use Vercel, Netlify, or your own server

## 🐛 Troubleshooting

**Port already in use?**
```bash
lsof -ti:5173 | xargs kill -9
npm run dev
```

**Dependencies issue?**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Build fails?**
```bash
npm run lint -- --fix
npm run build
```

## 📞 Need Help?

1. Check the documentation files
2. Review DEVELOPMENT_GUIDE.md
3. Look at existing components
4. Check browser console for errors

## 🎓 Learning Path

1. **Beginner**: Explore the UI, understand components
2. **Intermediate**: Modify components, add styling
3. **Advanced**: Build backend, integrate APIs
4. **Expert**: Deploy, optimize, scale

## ✨ Color Palette

```
Primary: #2563eb    (Blue)
Accent:  #7c3aed    (Purple)
Success: #10b981    (Green)
Error:   #ef4444    (Red)
```

---

**Ready to build? Start with `npm run dev` and explore!** 🚀

For detailed guides, see:
- DEVELOPMENT_GUIDE.md
- DESIGN_SYSTEM.md
- DEPLOYMENT_GUIDE.md
