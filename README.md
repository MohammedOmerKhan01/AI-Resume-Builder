# KodNest Premium Projects

Two premium applications following the KodNest Premium Design System.

## Project 1: AI Resume Builder

A premium, minimal resume builder with autosave and ATS scoring.

### Features

- **Auto-save**: All data persists in localStorage automatically (currently disabled for smooth typing)
- **Live Preview**: Real-time resume preview with empty state handling
- **ATS Scoring**: Deterministic 0-100 score with live updates
- **Smart Suggestions**: Up to 3 actionable suggestions based on missing content
- **Top 3 Improvements**: Prioritized guidance for maximum impact
- **Template System**: 3 templates (Classic, Modern, Minimal) with instant switching
- **Bullet Discipline**: Inline guidance for action verbs and measurable impact
- **Export Options**: Print/PDF and plain-text copy with validation warnings
- **Print Styling**: Professional black/white layout optimized for printing
- **Clean Design**: Off-white background, serif headings, generous spacing
- **Structured Sections**: Personal info, summary, education, experience, projects, skills, links

### ATS Scoring Algorithm (v1)

- +15 if summary is 40-120 words
- +10 if at least 2 projects
- +10 if at least 1 experience entry
- +10 if skills list has ≥8 items
- +10 if GitHub or LinkedIn link exists
- +15 if any experience/project contains numbers (%, X, k, etc.)
- +10 if education has complete fields
- Cap at 100

### Routes

- `/` - Home page with navigation to all routes
- `/builder` - Resume builder with form, ATS score, and live preview
- `/preview` - Full-page clean resume preview
- `/proof` - Proof placeholder

### Verification Steps

**Test Autosave:**
1. Go to http://localhost:5173/builder
2. Fill in some fields (name, email, summary)
3. Refresh the page (F5)
4. ✓ Data should persist and reappear

**Test ATS Score:**
1. Start with empty form - score should be 0
2. Add summary (40-120 words) - score increases by 15
3. Add 2 projects - score increases by 10
4. Add 1 experience with numbers (e.g., "Improved performance by 40%") - score increases by 25 (10 for experience + 15 for numbers)
5. Add 8+ skills - score increases by 10
6. Add GitHub link - score increases by 10
7. Complete education fields - score increases by 10
8. ✓ Score updates live as you type
9. ✓ Suggestions appear/disappear based on what's missing

**Test Live Preview:**
1. Empty form shows "Your resume preview will appear here"
2. Add content - sections appear in preview
3. Remove content - sections disappear
4. ✓ Preview updates in real-time
5. ✓ Empty sections don't show

**Test Sample Data:**
1. Click "Load Sample Data"
2. ✓ All fields populate
3. ✓ ATS score shows high value (85+)
4. ✓ Preview shows complete resume

## Project 2: KodNest Build System

A premium build tracking system with gated progression through 8 development steps.

### Features

- **8-Step Build Track**: Problem → Market → Architecture → HLD → LLD → Build → Test → Ship
- **Gating System**: Must upload artifact before proceeding to next step
- **Premium Layout**: Top bar, context header, 70/30 split workspace, build panel, proof footer
- **Build Panel**: Copy prompts to Lovable, track results, upload artifacts

### Routes

- `/rb/01-problem` - Problem Definition
- `/rb/02-market` - Market Research
- `/rb/03-architecture` - System Architecture
- `/rb/04-hld` - High-Level Design
- `/rb/05-lld` - Low-Level Design
- `/rb/06-build` - Build Implementation
- `/rb/07-test` - Testing & QA
- `/rb/08-ship` - Ship & Deploy
- `/rb/proof` - Proof & Submission Page

## Design System

- **Background**: #F7F6F3 (off-white)
- **Cards**: #ffffff (white)
- **Borders**: #e5e5e5 (light gray)
- **Text**: #1a1a1a, #333, #666 (dark to light)
- **Accent**: #8B0000 (deep red)
- **Success**: #16a34a (green)
- **Spacing**: 8/16/24/40/64px scale
- **Typography**: Georgia serif for headings, system sans-serif for body

## Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Tech Stack

- React 18
- TypeScript
- React Router 6
- Vite
- localStorage for persistence
