# BlackQuill Digital Agency

Nigeria's only digital agency dedicated to authors, publishers and literary organisations.

## Tech Stack
- **React 18** + **React Router v6**
- **Tailwind CSS v3**
- **Framer Motion v11** — page transitions, accordion, hover animations, card interactions
- **GSAP v3** + **ScrollTrigger** — hero entrance, scroll-reveal, staggered children, counters
- **Vite 5** — bundler & dev server

## Pages
| Route | File | Description |
|-------|------|-------------|
| `/` | `Home.jsx` | Full hero, services, projects, testimonials, CTA |
| `/services` | `Services.jsx` | Service cards, accordion deep-dive, process |
| `/projects` | `Projects.jsx` | Filterable project grid, testimonials |
| `/about` | `About.jsx` | Mission, how we work, values, team |
| `/pricing` | `Pricing.jsx` | 3 plan cards, comparison table, add-ons, FAQ |
| `/contact` | `Contact.jsx` | Animated form with validation + success state |

## Animation highlights
- **GSAP** cinematic hero entrance with stagger, skew and blur
- **GSAP ScrollTrigger** — every section reveals on scroll
- **GSAP counter** — animated number counting when in view
- **Framer Motion** page transitions via `AnimatePresence`
- **Framer Motion** accordion open/close with height animation
- **Framer Motion** project card hover overlays
- **Framer Motion** pricing card lift on hover
- **Framer Motion** filter tabs animated background switch
- **Custom cursor** with lerp-follow and grow-on-hover
- **CSS marquee** ticker with pause-on-hover
- Gold shimmer text animation on hero

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:5173

## Build for production

```bash
npm run build
npm run preview
```

## Customisation
- **Brand data**: `src/data/index.js` — update services, projects, plans, testimonials, team
- **Colours**: `tailwind.config.js` + `src/index.css` CSS variables (`gold: #C9A84C`)
- **Fonts**: `index.html` Google Fonts import + `tailwind.config.js`
