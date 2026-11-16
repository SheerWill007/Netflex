# Public Assets Folder

This folder contains static assets that are served directly by Vite.

## 📁 Contents

### Images
- **`netflex.png`** - Netflex logo favicon (32x32 or 64x64px recommended)
- **`images/`** - Additional static images

## 🎨 Adding Your Netflex Logo

Replace the `netflex.png` placeholder with an actual logo:

1. Find a logo PNG image (32x32 or 64x64 pixels)
2. Save it as `netflex.png` in this folder
3. The favicon will automatically update

## 🔗 Usage in Code

Files in this folder are accessible at the root URL:

```html
<!-- In HTML -->
<link rel="icon" href="/netflex.png" />
<img src="/images/banner.jpg" alt="Banner" />
```

```typescript
// In React/TypeScript
<img src="/netflex.png" alt="Netflex" />
```

## 📝 Notes

- Files are copied as-is to the build output
- No processing or optimization applied
- Keep file sizes small for better performance
- Use descriptive filenames

## 🎯 Recommended Assets to Add

- `netflex.png` - Favicon (32x32 or 64x64)
- `logo-192.png` - Android icon (192x192)
- `logo-512.png` - Android icon (512x512)
- `og-image.png` - Social media preview (1200x630)
- `robots.txt` - SEO directives
- `manifest.json` - PWA manifest (if needed)
