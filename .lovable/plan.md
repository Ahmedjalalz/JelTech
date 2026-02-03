
# Multi-Page Website Implementation Plan

## Overview
Transform the Jeltech website from a single-page to a multi-page application with three distinct pages, add new sections, and update the tech stack with proper icons.

---

## Page Architecture

```text
+------------------+     +------------------+     +------------------+
|      HOME (/)    |     |   ABOUT (/about) |     | CONTACT (/contact)|
+------------------+     +------------------+     +------------------+
| - Navbar         |     | - Navbar         |     | - Navbar          |
| - Hero Section   |     | - About Section  |     | - Contact Section |
| - Services       |     | - Why Choose Us  |     | - FAQ Section     |
| - Projects       |     | - Team Section   |     | - Footer          |
| - Footer         |     | - Tech Stack     |     +------------------+
+------------------+     | - Footer         |
                         +------------------+
```

---

## Files to Create

### 1. `src/pages/About.tsx`
New page component combining:
- Existing AboutSection
- New WhyChooseUsSection
- New TeamSection
- Updated TechStackSection

### 2. `src/pages/Contact.tsx`
New page component with:
- Existing ContactSection
- New FAQSection

### 3. `src/components/TeamSection.tsx`
"Meet Our Team" section featuring:
- Section header with consistent styling
- Responsive grid (2 cols mobile, 3-4 cols desktop)
- Team member cards with:
  - Rounded avatar images with green border on hover
  - Name below image
  - Designation (Frontend Developer, Mobile Developer, Business Developer, etc.)
- Placeholder team members to be replaced later with real data

### 4. `src/components/WhyChooseUsSection.tsx`
Key differentiators section with:
- 4 stat cards with animated counters
- Stats: Years Experience, Projects Delivered, Client Satisfaction, Technologies Mastered
- Icon + number + label layout
- Hover animations matching site style

### 5. `src/components/FAQSection.tsx`
Frequently Asked Questions using Radix Accordion:
- Questions about project timeline, communication, technologies, pricing
- Animated expand/collapse
- Green accent on active item

### 6. `src/components/ProcessSection.tsx`
"Our Process" visual timeline:
- 5 steps: Discovery, Design, Development, Testing, Launch
- Horizontal layout on desktop, vertical on mobile
- Numbered circles with icons
- Connecting lines between steps
- Scroll-triggered reveal animations

---

## Files to Modify

### 1. `src/App.tsx`
Add new routes:
```text
/        -> Index (Home)
/about   -> About
/contact -> Contact
*        -> NotFound
```

### 2. `src/pages/Index.tsx`
Simplify to include only:
- Navbar
- HeroSection
- ServicesSection
- ProcessSection (new)
- ProjectsSection
- Footer

Remove: AboutSection, TechStackSection, ContactSection (moved to other pages)

### 3. `src/components/Navbar.tsx`
- Convert anchor links to React Router `Link` components
- Update nav structure:
  - Home -> `/`
  - Services -> `/#services` (scroll on home)
  - Work -> `/#work` (scroll on home)
  - About -> `/about`
  - Contact -> `/contact`
- Handle scroll-to-section for hash links
- Ensure active state styling for current page

### 4. `src/components/Footer.tsx`
- Convert links to React Router `Link` components
- Update link targets to match new page structure

### 5. `src/components/TechStackSection.tsx`
Update technologies array:

**Remove:** GraphQL, AWS, Docker

**Updated stack (16 technologies):**
| Technology | Icon |
|------------|------|
| JavaScript | Yellow "JS" badge |
| TypeScript | Blue "TS" badge |
| React | Atom symbol |
| Next.js | Vercel triangle |
| Tailwind CSS | Official SVG logo |
| Node.js | Green circle |
| Express.js | "Ex" badge |
| Nest.js | Red cat icon |
| MongoDB | Leaf icon |
| PostgreSQL | Elephant icon |
| Prisma | Diamond icon |
| PWA | Mobile app icon |
| SEO | Search/chart icon |
| Socket.io | Lightning icon |
| Vercel | Triangle icon |
| GitHub | Octocat icon |

### 6. `src/components/HeroSection.tsx`
Update CTA buttons to use React Router:
- "Start a Project" -> `/contact`
- "View Our Work" -> `/#work`

---

## Technical Implementation Details

### React Router Navigation
Using `react-router-dom`:
- `Link` component for internal navigation
- Handle hash scrolling with `useEffect` and `useLocation`
- Scroll to top on page change

### Team Member Data Structure
```text
interface TeamMember {
  name: string;
  role: string;
  image: string; // placeholder initially
}
```

### Process Steps Structure
```text
interface ProcessStep {
  number: number;
  title: string;
  description: string;
  icon: LucideIcon;
}
```

### FAQ Data Structure
```text
interface FAQItem {
  question: string;
  answer: string;
}
```

---

## Visual Consistency
All new sections will maintain:
- Dark theme with `#45BE43` green accents
- Framer Motion scroll-triggered animations
- Consistent typography (Inter font)
- Glassmorphism effects where appropriate
- Hover glow effects on interactive elements
- Responsive design (mobile-first)

---

## Summary of Changes

| Type | Count |
|------|-------|
| New Pages | 2 (About, Contact) |
| New Components | 4 (Team, WhyChooseUs, FAQ, Process) |
| Modified Files | 6 (App, Index, Navbar, Footer, TechStack, Hero) |
| Total Tech Stack | 16 technologies |
