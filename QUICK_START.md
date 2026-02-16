# AI Resume Builder - Quick Start Guide

## 🚀 Getting Started (30 seconds)

### 1. Start the Server
```bash
npm run dev
```
✅ Server running at: **http://localhost:5173**

### 2. Open in Browser
Navigate to: **http://localhost:5173**

### 3. Start Building
Click **"Get Started"** or go to **/builder**

---

## 🎯 Quick Test (2 minutes)

### Test the ATS Scoring System

1. **Start with 0 points** (empty form)
   - Look at the circular score indicator (red, "Needs Work")

2. **Add your name** → Score: 10
   - Type in "Name" field
   - Watch score update instantly

3. **Add email** → Score: 20
   - Type in "Email" field

4. **Add phone** → Score: 25
   - Type in "Phone" field

5. **Add summary** → Score: 45
   - Type: "I built scalable web applications and improved team productivity"
   - Must be >50 chars and contain action verb

6. **Add education** → Score: 55
   - Click "+ Add" in Education section
   - Fill in school name

7. **Add 5 skills** → Score: 65
   - Go to Skills section
   - Type skill name, press Enter (repeat 5 times)

8. **Add project** → Score: 75
   - Click "+ Add Project"
   - Fill in title

9. **Add LinkedIn** → Score: 80
   - Type LinkedIn URL in Links section

10. **Add GitHub** → Score: 85
    - Type GitHub URL in Links section

11. **Add experience** → Score: 100 ✅
    - Click "+ Add" in Experience section
    - Fill in company and description
    - **Score turns GREEN - "Strong Resume"**

---

## 🎨 Test Templates & Colors (1 minute)

### Templates
1. Click **"Modern"** thumbnail
   - Layout changes to 2-column
   - Sidebar appears on left

2. Click **"Minimal"** thumbnail
   - Clean, spacious layout

3. Click **"Classic"** thumbnail
   - Back to traditional layout

### Colors
1. Click **Navy** color circle
   - All accents change to navy blue

2. Click **Burgundy** color circle
   - All accents change to burgundy

3. **Refresh page** (F5)
   - Template and color should persist ✅

---

## 📤 Test Export (30 seconds)

1. Navigate to **/preview**

2. Click **"Copy Resume as Text"**
   - Button shows "✓ Copied!"
   - Paste into text editor to verify

3. Click **"Print / Save as PDF"**
   - Print dialog opens
   - Toast shows "✓ PDF export ready!"

---

## 🧪 Test Persistence (30 seconds)

1. Fill in some data on **/builder**

2. **Refresh page** (F5)
   - All data should remain ✅

3. **Close browser tab**

4. **Reopen** http://localhost:5173/builder
   - Data still there ✅

---

## 📱 Test Mobile (1 minute)

1. Open **DevTools** (F12)

2. Toggle **Device Toolbar** (Ctrl+Shift+M)

3. Select **"iPhone 12 Pro"**

4. Navigate through pages:
   - `/` - Home
   - `/builder` - Form
   - `/preview` - Preview

5. Test interactions:
   - Fill in form fields
   - Click template thumbnails
   - Click color circles
   - Scroll through preview

---

## ✅ Success Checklist

Quick verification (check all that apply):

- [ ] Server starts without errors
- [ ] Home page loads
- [ ] Builder page shows form + preview
- [ ] ATS score shows circular progress
- [ ] Score updates when typing
- [ ] Score reaches 100 with all fields filled
- [ ] Color changes from red → amber → green
- [ ] Suggestions appear below score
- [ ] Templates switch instantly
- [ ] Colors change instantly
- [ ] Data persists after refresh
- [ ] Export buttons work
- [ ] No console errors (F12)

---

## 🐛 Troubleshooting

### Score not updating?
- Check browser console (F12) for errors
- Verify localStorage is enabled
- Try clearing localStorage: `localStorage.clear()`

### Data not persisting?
- Check if localStorage is enabled in browser
- Try incognito/private mode
- Clear cache and reload

### Templates not switching?
- Check console for errors
- Verify React is rendering correctly
- Try hard refresh (Ctrl+Shift+R)

### Colors not applying?
- Check if CSS custom properties are supported
- Verify browser version (Chrome 90+, Firefox 88+)
- Check console for CSS errors

---

## 📚 Documentation

- **Full Test Checklist:** `TEST_CHECKLIST.md`
- **Test Report:** `TEST_EXECUTION_REPORT.md`
- **Implementation Details:** `IMPLEMENTATION_SUMMARY.md`
- **Test Script:** `test-ats-scoring.js`

---

## 🎓 Key Features to Showcase

1. **Live ATS Scoring** - Watch score update in real-time
2. **Circular Progress** - Visual, color-coded indicator
3. **Smart Suggestions** - Actionable improvement tips
4. **Template System** - 3 professional layouts
5. **Color Themes** - 5 customizable colors
6. **Skills Accordion** - Tag-style input with suggestions
7. **Projects Accordion** - Collapsible with tech stack
8. **Export Options** - PDF and plain text
9. **Data Persistence** - Auto-save to localStorage
10. **Responsive Design** - Works on mobile

---

## 🚀 Ready to Test!

**Server Status:** ✅ Running  
**URL:** http://localhost:5173  
**Time to Test:** ~5 minutes  
**Expected Result:** All features working perfectly!

**Happy Testing! 🎉**
