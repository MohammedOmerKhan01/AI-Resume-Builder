# AI Resume Builder - Test Checklist

## Test Date: ___________
## Tester: ___________

---

## 1. LocalStorage Persistence ✓
**Test Steps:**
1. Navigate to `/builder`
2. Fill in personal info (name, email, phone, location)
3. Add a summary
4. Add 1 education entry
5. Add 1 experience entry
6. Add 1 project with tech stack
7. Add 5+ skills across categories
8. Refresh the page (F5)

**Expected Result:** All data should persist and reload correctly

**Status:** □ Pass □ Fail

**Notes:**
___________________________________________

---

## 2. Live Preview Updates ✓
**Test Steps:**
1. Navigate to `/builder`
2. Type in the "Name" field
3. Observe the right preview panel

**Expected Result:** Preview updates in real-time as you type (no delay)

**Status:** □ Pass □ Fail

**Notes:**
___________________________________________

---

## 3. Template Switching Preserves Data ✓
**Test Steps:**
1. Navigate to `/builder`
2. Fill in some data (name, summary, 1 skill)
3. Click on "Modern" template thumbnail
4. Click on "Minimal" template
5. Click back to "Classic" template

**Expected Result:** 
- Layout changes instantly
- All data remains intact
- No data loss

**Status:** □ Pass □ Fail

**Notes:**
___________________________________________

---

## 4. Color Theme Persists After Refresh ✓
**Test Steps:**
1. Navigate to `/builder` or `/preview`
2. Select "Navy" color theme
3. Refresh the page (F5)
4. Check the selected color

**Expected Result:** Navy theme should still be selected and applied

**Status:** □ Pass □ Fail

**Notes:**
___________________________________________

---

## 5. ATS Score Calculates Correctly ✓
**Test Steps:**
1. Navigate to `/builder`
2. Start with empty form (score should be 0)
3. Add name → score should be 10
4. Add email → score should be 20
5. Add phone → score should be 25
6. Add summary (>50 chars with action verb "built") → score should be 45
7. Add 1 education → score should be 55
8. Add 5 skills → score should be 65
9. Add 1 project → score should be 75
10. Add LinkedIn → score should be 80
11. Add GitHub → score should be 85
12. Add 1 experience with description → score should be 100

**Expected Result:** Score matches expected values at each step

**Status:** □ Pass □ Fail

**Actual Scores:**
- Empty: ___
- +Name: ___
- +Email: ___
- +Phone: ___
- +Summary: ___
- +Education: ___
- +Skills: ___
- +Project: ___
- +LinkedIn: ___
- +GitHub: ___
- +Experience: ___

---

## 6. Score Updates Live on Edit ✓
**Test Steps:**
1. Navigate to `/builder`
2. Watch the ATS score circle
3. Add your name
4. Observe score change

**Expected Result:** 
- Score updates immediately (no page refresh needed)
- Circle animation is smooth
- Color changes based on score level:
  - 0-40: Red "Needs Work"
  - 41-70: Amber "Getting There"
  - 71-100: Green "Strong Resume"

**Status:** □ Pass □ Fail

**Notes:**
___________________________________________

---

## 7. Export Buttons Work ✓
**Test Steps:**
1. Navigate to `/preview`
2. Click "Copy Resume as Text"
3. Paste into a text editor
4. Click "Print / Save as PDF"
5. Check for PDF toast message

**Expected Result:**
- Copy button shows "✓ Copied!" for 2 seconds
- Plain text is copied to clipboard
- Print dialog opens
- Toast shows "✓ PDF export ready! Check your downloads." for 3 seconds

**Status:** □ Pass □ Fail

**Notes:**
___________________________________________

---

## 8. Empty States Handled Gracefully ✓
**Test Steps:**
1. Clear localStorage: Open console, run `localStorage.clear()`
2. Refresh page
3. Navigate to `/builder`
4. Check right preview panel
5. Navigate to `/preview`

**Expected Result:**
- No errors in console
- Preview shows "Your resume preview will appear here as you fill in the form."
- ATS score shows 0 with suggestions
- No broken UI elements

**Status:** □ Pass □ Fail

**Notes:**
___________________________________________

---

## 9. Mobile Responsive Layout Works ✓
**Test Steps:**
1. Open browser DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select "iPhone 12 Pro" or similar
4. Navigate through all pages: `/`, `/builder`, `/preview`, `/proof`
5. Test form inputs
6. Test template picker
7. Test color picker

**Expected Result:**
- Layout adapts to mobile screen
- All elements are accessible
- No horizontal scroll
- Buttons are tappable
- Forms are usable

**Status:** □ Pass □ Fail

**Notes:**
___________________________________________

---

## 10. No Console Errors on Any Page ✓
**Test Steps:**
1. Open browser console (F12)
2. Navigate to `/` → Check console
3. Navigate to `/builder` → Check console
4. Navigate to `/preview` → Check console
5. Navigate to `/proof` → Check console
6. Navigate to `/rb/01-problem` → Check console
7. Navigate to `/rb/proof` → Check console

**Expected Result:** No red errors in console (warnings are acceptable)

**Status:** □ Pass □ Fail

**Errors Found:**
___________________________________________

---

## Additional Tests

### Skills Section
**Test Steps:**
1. Navigate to `/builder`
2. Scroll to Skills section
3. Type "React" in Technical Skills input
4. Press Enter
5. Click "✨ Suggest Skills" button
6. Wait 1 second
7. Click X on a skill chip

**Expected Result:**
- Skill appears as chip after Enter
- Suggest button shows loading state
- Suggested skills appear in correct categories
- Clicking X removes the skill

**Status:** □ Pass □ Fail

---

### Projects Section
**Test Steps:**
1. Navigate to `/builder`
2. Scroll to Projects section
3. Click "+ Add Project"
4. Click on project header to expand
5. Fill in title, description (check 200 char limit)
6. Add tech stack items
7. Add URLs
8. Click "Delete Project"

**Expected Result:**
- Project expands/collapses on click
- Character counter updates (max 200)
- Tech stack chips appear
- Project is removed on delete

**Status:** □ Pass □ Fail

---

### Modern Template Two-Column Layout
**Test Steps:**
1. Navigate to `/builder`
2. Add some data (name, skills, education, experience, projects)
3. Select "Modern" template
4. Check preview layout

**Expected Result:**
- Left sidebar (35%) shows: name, contact, skills, education
- Right main area (65%) shows: summary, experience, projects
- Sidebar has colored background
- Text in sidebar is white

**Status:** □ Pass □ Fail

---

## Summary

**Total Tests:** 13
**Passed:** ___
**Failed:** ___
**Pass Rate:** ___%

**Critical Issues:**
___________________________________________
___________________________________________

**Minor Issues:**
___________________________________________
___________________________________________

**Recommendations:**
___________________________________________
___________________________________________

---

## Sign-off

**Tester Signature:** ___________________
**Date:** ___________________
