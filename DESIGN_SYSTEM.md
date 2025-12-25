# unip Design System & Styling Guide

## 🎨 Design Philosophy

unip uses a **modern, professional design** with:
- Clean, minimal aesthetic
- Blue-based color palette for trust
- Purple accents for innovation
- Smooth animations and transitions
- Mobile-first responsive design

## 📐 Color Palette

### Primary Colors
```css
--primary: #2563eb;           /* Blue 600 - Main brand color */
--primary-dark: #1e40af;      /* Blue 700 - Darker shade */
--primary-light: #3b82f6;     /* Blue 500 - Lighter shade */
```

### Accent Colors
```css
--accent: #7c3aed;            /* Purple 600 - Secondary actions */
--success: #10b981;           /* Green 600 - Success states */
--error: #ef4444;             /* Red 500 - Error states */
--warning: #f59e0b;           /* Amber 500 - Warning states */
--info: #06b6d4;              /* Cyan 500 - Info states */
```

### Neutral Colors
```css
--bg: #f8fafc;                /* Background - Slate 50 */
--glass: rgba(255, 255, 255, 0.9);  /* Glass morphism effect */
```

### Usage in Components
```jsx
// Primary action button
<button className="bg-blue-600 text-white hover:bg-blue-700">
  Primary Action
</button>

// Secondary action button
<button className="bg-purple-600 text-white hover:bg-purple-700">
  Secondary Action
</button>

// Success state
<div className="text-green-600">✓ Success</div>

// Error state
<div className="text-red-500">✗ Error</div>
```

## 🔤 Typography

### Font Family
- **Primary**: Inter (Google Fonts)
- **Fallback**: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif

### Font Sizes
```
xs:  12px   (small labels, captions)
sm:  14px   (body text on mobile)
base: 16px  (main body text)
lg:  18px   (subheadings)
xl:  20px   (headings)
2xl: 24px   (page titles)
3xl: 30px   (hero titles)
```

### Font Weights
```
300: Light      (subtle, disabled states)
400: Regular    (body text)
500: Medium     (labels, emphasis)
600: Semibold   (subheadings)
700: Bold       (headings, important text)
```

### Usage
```jsx
<h1 className="text-3xl font-bold text-blue-600">Page Title</h1>
<p className="text-base font-regular text-gray-700">Body text</p>
<label className="text-sm font-semibold text-gray-600">Label</label>
```

## 📏 Spacing System

All spacing follows Tailwind's 4px base unit:
```
2   = 8px      (xs spacing)
3   = 12px     (small spacing)
4   = 16px     (standard spacing)
6   = 24px     (medium spacing)
8   = 32px     (large spacing)
12  = 48px     (xl spacing)
```

### Usage
```jsx
<div className="p-4 mb-6">        {/* 16px padding, 24px bottom margin */}
  <h2 className="text-lg mb-3">   {/* 18px text, 12px bottom margin */}
    Section Title
  </h2>
</div>
```

## 🎯 Components

### Buttons

**Primary Button**
```jsx
<button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
  Primary Action
</button>
```

**Secondary Button**
```jsx
<button className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
  Secondary Action
</button>
```

**Outlined Button**
```jsx
<button className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
  Outlined Action
</button>
```

### Cards

**Basic Card**
```jsx
<div className="bg-white rounded-xl shadow-sm p-6">
  <h3 className="text-lg font-semibold mb-2">Card Title</h3>
  <p className="text-gray-600">Card content</p>
</div>
```

**Interactive Card**
```jsx
<div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer">
  Card content
</div>
```

### Forms

**Input Field**
```jsx
<input
  type="text"
  placeholder="Enter text..."
  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none transition-colors"
/>
```

**Textarea**
```jsx
<textarea
  placeholder="Enter message..."
  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none resize-none"
/>
```

**Checkbox**
```jsx
<label className="flex items-center gap-2 cursor-pointer">
  <input
    type="checkbox"
    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
  />
  <span className="text-sm text-gray-700">Option</span>
</label>
```

## ✨ Animations

### Available Animations
```css
animate-fade-in-up      /* Fade in with upward movement */
animate-slide-in        /* Slide from left with fade */
animate-bounce-slight   /* Subtle bounce animation */
animate-fade-in         /* Simple fade in */
animate-pulse-slow      /* Slow pulsing effect */
```

### Usage
```jsx
<div className="animate-fade-in-up">
  Animated content
</div>

<div className="animate-pulse-slow">
  Pulsing decoration
</div>
```

### Custom Animation Duration
```jsx
<div className="animate-pulse" style={{ animationDuration: '3s' }}>
  Slow pulse
</div>
```

## 📱 Responsive Design

### Breakpoints
```
default   < 640px  (Mobile)
sm        640px    (Mobile landscape)
md        768px    (Tablet)
lg        1024px   (Desktop)
xl        1280px   (Large desktop)
2xl       1536px   (Extra large)
```

### Responsive Classes
```jsx
{/* Hidden on mobile, visible on tablet+ */}
<div className="hidden md:block">
  Desktop navigation
</div>

{/* Mobile-first sizing */}
<div className="w-full md:w-1/2 lg:w-1/3">
  Responsive column
</div>

{/* Different text size on mobile/desktop */}
<h1 className="text-2xl md:text-4xl">
  Responsive title
</h1>

{/* Responsive grid */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {items.map(item => (
    <Card key={item.id} {...item} />
  ))}
</div>
```

## 🌓 Glass Morphism Effect

Used throughout the app for modern look:
```jsx
<div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg">
  Glass card content
</div>
```

## 🎨 Utility Classes Quick Reference

### Text Colors
```
text-blue-600       Primary text
text-gray-700       Body text
text-gray-500       Muted text
text-white          Light text on dark
text-red-500        Error text
text-green-600      Success text
```

### Background Colors
```
bg-white            White background
bg-blue-50          Light blue background
bg-blue-600         Primary background
bg-gray-100         Light gray background
bg-gradient-to-r    Gradient backgrounds
```

### Shadows
```
shadow-sm           Small shadow (cards)
shadow-md           Medium shadow (modals)
shadow-lg           Large shadow (prominent)
shadow-2xl          Extra large shadow
```

### Rounded Corners
```
rounded             4px
rounded-lg          8px
rounded-xl          12px
rounded-2xl         16px
rounded-full        50%
```

### Spacing
```
p-4                 16px padding
m-4                 16px margin
gap-4               16px gap
mb-6                24px bottom margin
px-4                16px horizontal padding
```

## 🔍 Best Practices

1. **Color Consistency**
   - Use predefined colors
   - Maintain contrast ratios (AA level minimum)
   - Test on different devices

2. **Spacing**
   - Use multiples of 4px
   - Consistent vertical rhythm
   - Adequate white space

3. **Typography**
   - Maximum 70 characters per line
   - Proper heading hierarchy
   - Readable line height (1.5-1.8)

4. **Responsive**
   - Mobile first approach
   - Test on multiple breakpoints
   - Touch-friendly targets (min 44px)

5. **Performance**
   - Minimize animations
   - Optimize images
   - Use lazy loading

## 📚 Resources

- [Tailwind CSS Docs](https://tailwindcss.com)
- [Google Fonts - Inter](https://fonts.google.com/specimen/Inter)
- [Accessible Colors](https://www.a11y-101.com/design/color-contrast)
- [Material Design](https://material.io/design)

---

**Note**: All colors and components follow modern design standards for professional appearance and accessibility.
