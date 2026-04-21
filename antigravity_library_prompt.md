# 🏛️ ANTIGRAVITY MASTER PROMPT — College Digital Library: 3D Landing Page
name - ARCANA library system


> **Project Type:** UI-Dominant Single Page Application (Landing Page)
> **Focus:** 3D Interactive Bookshelf with cursor-driven book pull animation
> **Data:** All dummy/mock records — NO database, NO backend
> **Goal:** An unforgettable, award-worthy, 3D web experience

---

## 📦 STEP 1 — INSTALL THESE PACKAGES FIRST

Before writing any code, install the following. Each serves a specific UI/UX purpose for this project:

```bash
# 3D Engine — for bookshelf, book geometry, lighting, shadows
npm install three @types/three

# Spring-based animation — for the smooth book pull/push physics
npm install @react-spring/three @react-spring/web

# React Three Fiber — React renderer for Three.js (critical for 3D interactivity)
npm install @react-three/fiber

# React Three Drei — helper components (camera, lighting, environment maps, text3D)
npm install @react-three/drei

# GSAP — for scroll-triggered timeline animations, hero entrance, staggered reveals
npm install gsap @gsap/react

# Lenis — buttery smooth scroll (replaces native scroll entirely)
npm install lenis

# Framer Motion — for 2D UI panel transitions, modal slides, micro-interactions
npm install framer-motion

# React Icons — for UI icons (search, bookmark, user, open book etc.)
npm install react-icons

# Google Fonts (via CSS @import) — use Playfair Display + DM Serif Text
# No install needed — add to global CSS

# Noise/grain texture overlay — for atmospheric film-grain background feel
npm install simplex-noise
```

---

## 🎨 STEP 2 — STITCH DESIGN SYSTEM PROMPT

> **Send this to Stitch to generate the design tokens, color system, component library, and visual direction:**

---

### STITCH PROMPT:

Design a **dark academia luxury** UI system for a College Digital Library web app. This is a 3D-interactive, scroll-driven landing page. The aesthetic must feel like standing inside an ancient Oxford library that has been lit dramatically for a film scene — rich, warm, atmospheric, with deep shadows and golden candlelight accents.

**Color Palette:**

Generate a complete dark-mode color system:
- Background base: near-black with warm undertone (`#0D0A07` range)
- Shelf wood texture tones: `#3B2A1A`, `#5C3D1E`, `#7A5230` — use these as surface accents
- Gold accent (book spines, hover glow, CTAs): `#C8973F` to `#F0C060` gradient
- Cream/parchment text: `#EDE8DC` primary, `#B8A98A` secondary
- Deep crimson: `#7A1B1B` — for category tags and active states
- Ambient glow: Soft amber `rgba(200, 151, 63, 0.15)` for background halos
- Glass morphism panels: `rgba(255, 255, 255, 0.04)` with `backdrop-filter: blur(20px)`

**Typography:**

- Display / Headings: **Playfair Display** (Google Fonts) — serif, editorial, classic
- Sub-headings: **DM Serif Text** — slightly more modern serif
- Body / UI: **Crimson Pro** — elegant readable serif for descriptions
- Monospace accents (ISBN, codes): **Courier Prime**
- Use large, dramatic type sizing: hero headline should be 96px–120px desktop
- Letterspace headlines generously: `letter-spacing: 0.05em`
- Use italic variants heavily — they reinforce the literary aesthetic

**Component Styles to Generate:**

1. **BookCard UI Panel** — appears on hover over a 3D book. Glass morphism card (frosted dark glass), gold border-top `2px solid #C8973F`, book cover thumbnail left, title + author right, "Read Now" CTA button (gold fill, dark text). Slide-up animation on appear.

2. **Navigation Bar** — ultra-minimal floating top bar. Semi-transparent dark glass background. Logo left: a small open-book SVG icon + "ARCANA" wordmark in Playfair Display spaced caps. Center: ghost-style nav links (Browse · Reading Room · My Shelf · About). Right: Search icon + Avatar circle. On scroll: bar gains a thin gold bottom border.

3. **Search Bar** — full-width hero search. Parchment-toned input field with a magnifying glass icon in gold. Placeholder: *"Search by title, author, subject..."* On focus: glows with warm amber shadow. Below: quick filter pills (Fiction · Science · History · Law · Engineering · Arts).

4. **Category Tag Pills** — small rounded pills, dark glass background, gold text, subtle border. On hover: fill with gold, text goes dark.

5. **Section Headers** — large serif headline left-aligned, with a thin horizontal gold rule below that animates in width from 0 to full on scroll.

6. **Footer** — three-column dark footer. Column 1: Logo + one-line tagline in italic serif. Column 2: Quick links. Column 3: Contact / college name. Bottom bar: copyright in small spaced caps. Top edge: a decorative ornamental SVG divider (a horizontal flourish line).

7. **CTA Buttons** — Primary: gold background `#C8973F`, dark text, slight letter-spacing, no border-radius (sharp corners reinforce the bookish editorial feel). Secondary: transparent with gold border, gold text.

8. **Scroll Progress Indicator** — thin gold horizontal line at very top of viewport indicating scroll depth.

9. **Custom Cursor** — replace default cursor with: a small golden open-book SVG that scales up slightly when hovering over a 3D book on the shelf. Add a trailing dot behind it.

---

## 🏗️ STEP 3 — FULL APPLICATION ARCHITECTURE & COMPONENT TREE

```
App.jsx
├── CustomCursor.jsx           ← Golden book cursor + trail
├── SmoothScroll.jsx           ← Lenis smooth scroll wrapper
├── ScrollProgress.jsx         ← Gold top progress bar
│
├── Navbar.jsx                 ← Floating glass nav
│
├── HeroSection.jsx            ← MAIN 3D SCENE
│   ├── BookshelfCanvas.jsx    ← React Three Fiber canvas (fills viewport)
│   │   ├── ShelfGeometry.jsx  ← 3D wooden shelf rows
│   │   ├── BookMesh.jsx       ← Individual 3D book (hover = pull out)
│   │   ├── AmbientLighting.jsx← Warm candle-tone point lights
│   │   └── DustParticles.jsx  ← Floating gold particle dust motes
│   └── HeroText.jsx           ← "ARCANA" headline overlaid on canvas
│
├── SearchSection.jsx          ← Hero search bar + filter pills
│
├── FeaturedBooks.jsx          ← Horizontal scroll card carousel
│
├── CategoriesSection.jsx      ← Category grid with hover lift effect
│
├── HowItWorks.jsx             ← 3-step process (animated icons)
│
├── RecentlyAdded.jsx          ← Book grid, 2D cards
│
├── TestimonialsSection.jsx    ← Student/staff quote cards
│
└── Footer.jsx                 ← Dark footer with ornament
```

---

## 🎯 STEP 4 — THE SIGNATURE INTERACTION: 3D BOOKSHELF

> This is the heart of the entire landing page. Build this with obsessive attention to physics and feel.

### The Bookshelf Scene (`BookshelfCanvas.jsx`)

**Setup:**
- Canvas fills 100% of viewport height (hero section)
- Camera: Perspective camera, FOV 60, position `[0, 0, 8]`
- OrbitControls: DISABLED (we control camera via mouse parallax instead)
- Mouse parallax: As user moves mouse, camera subtly tilts `±3deg` on X and Y axes (GSAP quickTo for smoothness) — makes the shelf feel alive and 3D even without interaction

**The Shelf:**
- 2 rows of shelves rendered as 3D Box geometries
- Wood material: MeshStandardMaterial with a warm brown roughness map
- Shelf has visible depth — books sit slightly recessed
- Subtle ambient occlusion in corners for depth
- A warm PointLight positioned above-left mimicking a hanging lamp — casts dynamic shadows
- A secondary cool RectAreaLight from far right adds rim lighting on book spines
- Floating dust mote particles: 200 tiny gold spheres slowly drifting upward, slight random oscillation

**The Books (`BookMesh.jsx`):**

Each book is a BoxGeometry with:
- Varying heights (0.8–1.2 units) and widths (0.12–0.22 units) — realistic variation
- Depth: 0.9 units
- Spine texture: Programmatically generated canvas texture with:
  - Colored background (each book has a unique rich color — deep burgundy, forest green, navy, burnt sienna, dusty purple, etc.)
  - Title text rendered onto spine via canvas API
  - Thin gold lines as decorative spine borders
  - Author name in small italic below
- MeshStandardMaterial: metalness 0.1, roughness 0.8 (matte paper feel)
- On spine: a subtle gold foil effect (shininess only on title area)

**The Pull Animation (THE STAR FEATURE):**

```
STATE: each book tracks:
  - isHovered: boolean
  - pullProgress: spring value 0 → 1

ON CURSOR ENTER book:
  1. @react-spring/three spring animates book's Z position:
     - from Z=0 (flush in shelf)
     - to Z=1.8 (pulled out toward camera)
  2. Simultaneously:
     - Slight upward Y shift (+0.05) — like picking up a book
     - Scale X: 1 → 1.02 (barely perceptible swelling)
     - A warm PointLight attached to THIS book activates, casting a halo
     - Gold rim light brightens on the book's spine
  3. A glass-morphism Info Panel slides up from below the book (2D HTML overlay via drei <Html>):
     - Book title (large Playfair Display)
     - Author name
     - Category tag pill
     - Short description (2 lines)
     - "Read Now" button (gold)
     - "Add to Shelf" icon button
  4. Neighboring books nudge slightly apart (spring physics on X position)
     — like real books shifting when one is pulled

ON CURSOR LEAVE:
  1. Spring reverses: book smoothly slides back into shelf
  2. Info panel fades out and slides down simultaneously
  3. Neighboring books return to original positions
  4. Book light deactivates

SPRING CONFIG:
  tension: 180, friction: 22
  — this gives a satisfying slightly-bouncy physical feel
  — NOT instant, NOT rubbery — like holding a real book's weight
```

**Dummy Book Data (20 books, 2 rows of 10):**

```javascript
const BOOKS = [
  { id: 1, title: "The Oxford Compendium", author: "Dr. A. Mehta", category: "History", color: "#4A1942", year: 2021, desc: "A sweeping account of academic thought across five centuries." },
  { id: 2, title: "Principles of Thermodynamics", author: "Prof. R. Sharma", category: "Engineering", color: "#1A3A4A", year: 2022, desc: "Foundational engineering thermodynamics for undergraduates." },
  { id: 3, title: "The Gujarati Renaissance", author: "N. Patel", category: "Literature", color: "#3A1A1A", year: 2020, desc: "Poetry and prose from Gujarat's literary golden age." },
  { id: 4, title: "Quantum Mechanics Vol. II", author: "Dr. S. Iyer", category: "Physics", color: "#1A2A3A", year: 2023, desc: "Advanced quantum theory for postgraduate students." },
  { id: 5, title: "Laws of Civil Procedure", author: "Justice K. Rao", category: "Law", color: "#2A1A0A", year: 2019, desc: "A landmark reference on Indian civil court procedure." },
  { id: 6, title: "Organic Chemistry Decoded", author: "Dr. P. Joshi", category: "Chemistry", color: "#0A2A1A", year: 2022, desc: "Mechanisms, reactions, and synthesis simplified." },
  { id: 7, title: "Architecture of Empires", author: "M. Desai", category: "Architecture", color: "#2A2A0A", year: 2021, desc: "Built environments of the ancient world reimagined." },
  { id: 8, title: "Neural Networks Explained", author: "Dr. V. Krishnan", category: "CS / AI", color: "#1A0A2A", year: 2023, desc: "From perceptrons to transformers — a complete journey." },
  { id: 9, title: "Macroeconomic Theory", author: "Prof. A. Shah", category: "Economics", color: "#3A2A0A", year: 2020, desc: "Growth, inflation, and fiscal policy in emerging markets." },
  { id: 10, title: "The Human Genome", author: "Dr. R. Nair", category: "Biology", color: "#0A1A2A", year: 2022, desc: "A complete guide to genomics and genetic engineering." },
  { id: 11, title: "Sanskrit Grammar: Roots", author: "Prof. D. Bhatt", category: "Languages", color: "#4A2A0A", year: 2018, desc: "Classical Sanskrit morphology and syntax for scholars." },
  { id: 12, title: "Fluid Mechanics", author: "Dr. H. Parmar", category: "Engineering", color: "#0A3A2A", year: 2021, desc: "Viscosity, turbulence, and flow — theory and problems." },
  { id: 13, title: "Indian Philosophy: Advaita", author: "Swami A. Sharma", category: "Philosophy", color: "#2A0A1A", year: 2017, desc: "Non-dualism and consciousness in Vedantic tradition." },
  { id: 14, title: "Calculus: Theory & Practice", author: "Dr. M. Trivedi", category: "Mathematics", color: "#0A2A3A", year: 2023, desc: "Real analysis, integration, and multivariable calculus." },
  { id: 15, title: "Clinical Psychology Today", author: "Dr. S. Mehrotra", category: "Psychology", color: "#3A0A2A", year: 2022, desc: "Assessment, diagnosis, and modern therapeutic approaches." },
  { id: 16, title: "Environmental Law in India", author: "A. Menon", category: "Law", color: "#1A3A0A", year: 2020, desc: "Pollution regulation, forest rights, and constitutional law." },
  { id: 17, title: "Art History: Modern India", author: "P. Varma", category: "Arts", color: "#3A1A3A", year: 2019, desc: "From the Bengal School to contemporary Indian artists." },
  { id: 18, title: "Database Systems Design", author: "Dr. K. Pillai", category: "CS", color: "#0A1A3A", year: 2023, desc: "Relational models, query optimization, and NoSQL." },
  { id: 19, title: "Strength of Materials", author: "Prof. B. Chaudhary", category: "Civil Engg", color: "#2A1A2A", year: 2021, desc: "Stress, strain, and structural analysis fundamentals." },
  { id: 20, title: "The Poetics of Silence", author: "Dr. L. Kapoor", category: "Literature", color: "#1A1A0A", year: 2020, desc: "A meditation on absence and meaning in modern fiction." },
];
```

---

## 📜 STEP 5 — ALL OTHER PAGE SECTIONS (with dummy data)

### 5.1 Featured Books Carousel

Horizontal scrollable row of 6 book cards. Each card:
- Book cover (colored gradient rectangle with title overlaid — no real images needed)
- Title, Author, Category pill
- Borrowing status badge: "Available" (green) or "2 Copies Left" (amber)
- Hover: card lifts with `translateY(-8px)` and shadow deepens
- GSAP horizontal drag scroll (mouse drag = scroll left/right)

```javascript
const FEATURED = [
  { title: "Neural Networks Explained", author: "Dr. V. Krishnan", category: "CS / AI", available: true, copies: 4, color: "#1A0A2A" },
  { title: "The Oxford Compendium", author: "Dr. A. Mehta", category: "History", available: true, copies: 2, color: "#4A1942" },
  { title: "Quantum Mechanics Vol. II", author: "Dr. S. Iyer", category: "Physics", available: false, copies: 0, color: "#1A2A3A" },
  { title: "Organic Chemistry Decoded", author: "Dr. P. Joshi", category: "Chemistry", available: true, copies: 6, color: "#0A2A1A" },
  { title: "Database Systems Design", author: "Dr. K. Pillai", category: "CS", available: true, copies: 3, color: "#0A1A3A" },
  { title: "Art History: Modern India", author: "P. Varma", category: "Arts", available: true, copies: 1, color: "#3A1A3A" },
];
```

### 5.2 Categories Grid

3×2 grid of category cards. Each card:
- Large category name in Playfair Display
- Count of books (dummy number)
- An SVG icon representing the subject
- On hover: warm gold underline slides in, slight scale up
- Click: filter pills in search section auto-select (no routing needed)

```javascript
const CATEGORIES = [
  { name: "Engineering", count: 142, icon: "⚙️" },
  { name: "Literature", count: 89, icon: "📖" },
  { name: "Law", count: 76, icon: "⚖️" },
  { name: "Sciences", count: 201, icon: "🔬" },
  { name: "Arts & History", count: 64, icon: "🏛️" },
  { name: "Computer Science", count: 118, icon: "💻" },
];
```

### 5.3 Stats Banner

Full-width dark section with 4 animated counters. On scroll into view, numbers count up from 0:

```javascript
const STATS = [
  { value: 12400, label: "E-Books Available", suffix: "+" },
  { value: 3200, label: "Active Readers", suffix: "+" },
  { value: 48, label: "Subject Categories", suffix: "" },
  { value: 98, label: "Satisfaction Rate", suffix: "%" },
];
```

### 5.4 How It Works

3-step horizontal section:
1. 🔐 **Login with College ID** — "Use your institutional email to access the full catalog"
2. 🔍 **Search & Discover** — "Browse 12,000+ titles across all departments"
3. 📖 **Read Anywhere** — "Open any e-book in our built-in reader — no downloads"

Each step: large serif number (01, 02, 03) in gold, heading, body text. Connected by a gold dashed horizontal line between steps.

### 5.5 Testimonials

3 quote cards in a row:

```javascript
const TESTIMONIALS = [
  { quote: "Finding research papers for my thesis used to take hours. Now I search and read within seconds.", name: "Priya Sharma", role: "M.Sc. Chemistry, 3rd Year", initials: "PS" },
  { quote: "As faculty, I appreciate being able to recommend specific chapters directly to students via the platform.", name: "Prof. Rahul Mehta", role: "Department of Civil Engineering", initials: "RM" },
  { quote: "The 3D bookshelf is genuinely the most beautiful library interface I have ever used.", name: "Aditya Patel", role: "B.Tech Computer Science, 2nd Year", initials: "AP" },
];
```

---

## ✨ STEP 6 — ANIMATION CHOREOGRAPHY (GSAP + Framer Motion)

### Page Load Sequence (first 2.5 seconds):
```
0.0s  → Background fades in (dark, atmospheric)
0.3s  → Navbar slides down from top
0.6s  → 3D Canvas fades in — books appear already on shelf
0.8s  → "ARCANA" headline letters stagger in (each letter: scale 0.8→1, opacity 0→1, 80ms delay between)
1.2s  → Subheadline slides up
1.5s  → Search bar slides up + fades in
1.8s  → Filter pills stagger in left-to-right
2.0s  → Dust particles begin floating
2.2s  → Shelf ambient light slowly brightens (like candles being lit)
```

### Scroll Triggers (GSAP ScrollTrigger):
- Section headers: gold rule width animates 0% → 100% as section enters viewport
- Category cards: stagger rise up (`y: 40 → 0`, `opacity: 0 → 1`)
- Stats counter: numbers count up when visible
- Testimonial cards: slight perspective tilt rotates to flat as they enter

### Lenis Smooth Scroll:
- Install and initialize Lenis globally
- Pass Lenis's `requestAnimationFrame` to GSAP's ticker for sync
- Lerp factor: `0.08` (very smooth, slightly lagged — premium feel)

---

## 🖱️ STEP 7 — CUSTOM CURSOR

Replace the system cursor with:
- **Primary cursor**: Small open-book SVG (20×20px), gold `#C8973F`, rotated 15deg
- **Trail**: A small fading dot (8px circle) that follows with ~120ms delay (lerp)
- **Hover state on 3D book**: Cursor scales to 32×32px + glows with amber radial shadow
- **Hover state on CTA buttons**: Cursor morphs to arrow shape
- Implementation: track `mousemove`, update CSS transform via `requestAnimationFrame`

---

## 📐 STEP 8 — LAYOUT & RESPONSIVE SPECS

| Section | Height | Notes |
|---|---|---|
| Navbar | 72px fixed | Floating glass |
| Hero (3D Shelf) | 100vh | Full viewport |
| Search | auto (~160px) | Overlaps hero bottom |
| Featured Books | ~480px | Horizontal scroll |
| Categories | ~400px | 3×2 grid |
| Stats Banner | ~200px | Dark full-width |
| How It Works | ~360px | 3-column |
| Testimonials | ~320px | 3-column |
| Footer | ~280px | 3-column + bottom bar |

**Mobile (< 768px):**
- 3D bookshelf: simplify to a 2D animated version (CSS 3D transforms on flat book elements, same pull mechanic using CSS perspective + translateZ)
- Featured books: vertical stacked cards
- Categories: 2-column grid
- Stats: 2×2 grid

---

## 🔒 STEP 9 — DUMMY AUTH UI (No backend, UI only)

Add a **"Login" modal** triggered from navbar:
- Two tabs: **Student** | **Staff**
- Fields: College Email, Password
- "Login" button: gold, full-width
- Below: "Forgot password?" link
- On click Login: show a brief loading spinner → modal closes → navbar avatar fills with a user initial (purely frontend state, no real auth)
- On logout: avatar clears

This simulates the auth experience without any real logic.

---

## 🎯 FINAL DESIGN PRINCIPLES TO MAINTAIN THROUGHOUT

1. **Every hover state must be deliberate** — nothing should be unstyled on hover
2. **Gold `#C8973F` is the single accent color** — use it consistently, never overuse it
3. **Shadows are warm** — always `rgba(200, 151, 63, 0.X)` tones, never cold blue shadows
4. **Typography hierarchy is strict**: Display → Heading → Sub → Body → Caption — never skip levels
5. **White space is generous** — sections breathe, nothing feels cramped
6. **The 3D bookshelf is the hero** — every other section should feel like it's supporting that centerpiece
7. **Performance**: use `will-change: transform` on animated elements, `React.memo` on BookMesh, instanced meshes if needed for 20 books
8. **Accessibility**: all interactive elements have `aria-label`, color contrast AA compliant for text over dark backgrounds

---

*This is a UI-dominant frontend showcase. No database. No backend. All data is hardcoded mock data. The goal is to create the most visually stunning college library interface ever built — one that makes users stop scrolling and interact.*

---

**Stack Summary:**
`React + Vite` · `Three.js + R3F + Drei` · `@react-spring/three` · `GSAP + ScrollTrigger` · `Lenis` · `Framer Motion` · `Playfair Display + DM Serif + Crimson Pro` · `TailwindCSS`
