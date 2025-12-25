# Deployment Guide for unip

## Preparing for Production

### Build Optimization

1. **Build the project**
   ```bash
   npm run build
   ```
   This creates an optimized `dist/` directory ready for deployment.

2. **Test production build locally**
   ```bash
   npm run preview
   ```

## Deployment Options

### Option 1: Vercel (Recommended)

**Most suitable for Vite + React projects**

1. Push your code to GitHub
2. Sign up at [vercel.com](https://vercel.com)
3. Import your repository
4. Vercel automatically detects Vite configuration
5. Deploy with one click

**Benefits**: Auto deployment on push, preview URLs, custom domains

### Option 2: Netlify

1. Connect your GitHub repository at [netlify.com](https://netlify.com)
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Deploy

### Option 3: GitHub Pages

1. Add to `vite.config.js`:
   ```javascript
   export default {
     base: '/Social-Media/',
   }
   ```

2. Add deploy script to `package.json`:
   ```json
   "deploy": "npm run build && git add dist && git commit -m 'Deploy' && git subtree push --prefix dist origin gh-pages"
   ```

3. Deploy:
   ```bash
   npm run deploy
   ```

### Option 4: Traditional Hosting (Shared Hosting/VPS)

1. Build locally: `npm run build`
2. Upload `dist/` folder to your server
3. Configure web server (nginx/Apache) to serve `index.html` for all routes
4. Set proper cache headers

**Nginx Configuration Example:**
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    root /var/www/unip/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

## Post-Deployment

### Set Environment Variables
Create `.env.production` file:
```
VITE_API_URL=https://your-api-domain.com
```

### Monitor Performance
- Use Google PageSpeed Insights
- Monitor bundle size
- Check for console errors

### SSL Certificate
- Ensure HTTPS is enabled
- Use Let's Encrypt for free SSL

## Continuous Integration/Deployment (CI/CD)

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-artifact@v2
        with:
          name: dist
          path: dist/
```

## Security Checklist

- [ ] Remove sensitive data from code
- [ ] Use environment variables for API URLs
- [ ] Enable HTTPS
- [ ] Set security headers (HSTS, CSP)
- [ ] Keep dependencies updated
- [ ] Regular security audits

## Performance Optimization

### Before Deployment

1. **Check bundle size**
   ```bash
   npm run build
   # Check dist/ folder size
   ```

2. **Optimize images**
   - Compress images before adding
   - Use WebP format where possible

3. **Code splitting**
   - Vite automatically handles route-based splitting
   - Monitor chunk sizes

4. **Minification**
   - Automatically handled by Vite build

### Post-Deployment

- Enable gzip compression on server
- Use CDN for static assets
- Implement caching strategies
- Monitor Core Web Vitals

## Troubleshooting

### Blank Page After Deployment
- Check browser console for errors
- Verify `base` path in `vite.config.js`
- Check server routing configuration

### 404 Errors on Page Refresh
- Configure server to serve `index.html` for all routes
- Example: `try_files $uri $uri/ /index.html;` in nginx

### Slow Loading
- Check bundle size
- Enable compression
- Use CDN
- Optimize images

## Rolling Back

### On Vercel/Netlify
- Use platform dashboard to select previous deployment

### Manual Rollback
- Keep previous build backup
- Upload previous `dist/` folder
- Restart web server

## Monitoring

### Setup Monitoring
- Use Sentry for error tracking
- Google Analytics for user tracking
- Uptime monitoring tools
- Performance monitoring

## Next Steps After Deployment

1. **Backend Integration**
   - Connect to backend API
   - Set up authentication
   - Implement real-time features

2. **Database Connection**
   - Configure database
   - Set up API endpoints

3. **Testing**
   - User acceptance testing
   - Performance testing
   - Security testing

---

**Need Help?** Contact your hosting provider or refer to framework-specific deployment docs.
