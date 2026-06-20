# Graph Report - .  (2026-06-20)

## Corpus Check
- Corpus is ~4,017 words - fits in a single context window. You may not need a graph.

## Summary
- 36 nodes · 64 edges · 7 communities (6 shown, 1 thin omitted)
- Extraction: 64% EXTRACTED · 36% INFERRED · 0% AMBIGUOUS · INFERRED: 23 edges (avg confidence: 0.92)
- Token cost: 58,443 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Animations & Trust Stats|Animations & Trust Stats]]
- [[_COMMUNITY_Shared Page Layout & Chrome|Shared Page Layout & Chrome]]
- [[_COMMUNITY_main.js Internals|main.js Internals]]
- [[_COMMUNITY_Quote Request Conversion Flow|Quote Request Conversion Flow]]
- [[_COMMUNITY_Services Listing|Services Listing]]
- [[_COMMUNITY_Mobile Navigation|Mobile Navigation]]
- [[_COMMUNITY_Realisations Gallery|Realisations Gallery]]

## God Nodes (most connected - your core abstractions)
1. `index.html (Accueil)` - 9 edges
2. `realisations.html (Réalisations)` - 9 edges
3. `contact.html (Contact)` - 9 edges
4. `services.html (Services)` - 8 edges
5. `apropos.html (À propos)` - 7 edges
6. `Burger Menu Toggle Handler` - 6 edges
7. `Shared Header / Navigation Markup` - 6 edges
8. `assets/css/style.css` - 6 edges
9. `Static HTML/CSS/JS Stack (no framework, no build)` - 5 edges
10. `Site Pages Overview` - 5 edges

## Surprising Connections (you probably didn't know these)
- `apropos.html (À propos)` --references--> `Burger Menu Toggle Handler`  [EXTRACTED]
  apropos.html → assets/js/main.js
- `index.html (Accueil)` --references--> `Burger Menu Toggle Handler`  [EXTRACTED]
  index.html → assets/js/main.js
- `Static HTML/CSS/JS Stack (no framework, no build)` --references--> `Burger Menu Toggle Handler`  [EXTRACTED]
  README.md → assets/js/main.js
- `realisations.html (Réalisations)` --references--> `Burger Menu Toggle Handler`  [EXTRACTED]
  realisations.html → assets/js/main.js
- `index.html (Accueil)` --references--> `Scroll Reveal IntersectionObserver`  [EXTRACTED]
  index.html → assets/js/main.js

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Shared Site Chrome (topbar, header/nav, footer) repeated across all pages** — index_index_html, services_services_html, realisations_realisations_html, apropos_apropos_html, contact_contact_html, shared_header_nav, shared_footer, shared_topbar [INFERRED 0.90]
- **Quote Request (Devis) Conversion Flow spanning hero CTAs, pricing, and the contact form** — index_hero_section, services_pricing_section, contact_devis_form, js_main_contact_form_demo, shared_cta_band [INFERRED 0.85]
- **Scroll-triggered reveal/counter animation mechanism (JS IntersectionObservers + CSS hook attributes)** — js_main_scroll_reveal_observer, js_main_animated_counters, shared_reveal_class, shared_data_count_attr [EXTRACTED 1.00]

## Communities (7 total, 1 thin omitted)

### Community 0 - "Animations & Trust Stats"
Cohesion: 0.25
Nodes (9): Testimonials Section (index.html), Trust Counters Section (index.html), Animated Counters IntersectionObserver, Scroll Reveal IntersectionObserver, AquaFlex Plomberie (fictional plumber business), Static HTML/CSS/JS Stack (no framework, no build), Trust Counters Section (realisations.html), `data-count` / `data-suffix` Attributes (animated counter hook) (+1 more)

### Community 1 - "Shared Page Layout & Chrome"
Cohesion: 0.54
Nodes (8): apropos.html (À propos), index.html (Accueil), Site Pages Overview, realisations.html (Réalisations), Shared CTA Band Pattern, Shared Footer Markup, Shared Topbar (contact info bar), assets/css/style.css

### Community 2 - "main.js Internals"
Cohesion: 0.33
Nodes (5): burger, counters, form, io, navLinks

### Community 3 - "Quote Request Conversion Flow"
Cohesion: 0.50
Nodes (5): contact.html (Contact), devis-form (Quote Request Form), Hero Section (index.html), Contact Form Submit Handler (Demo), Pricing Section (services.html)

### Community 4 - "Services Listing"
Cohesion: 0.67
Nodes (3): Services Cards Section (index.html teaser), Services Cards Overview (services.html), Detailed Service Rows (anchored sections)

### Community 5 - "Mobile Navigation"
Cohesion: 1.00
Nodes (3): Burger Menu Toggle Handler, services.html (Services), Shared Header / Navigation Markup

## Knowledge Gaps
- **11 isolated node(s):** `burger`, `navLinks`, `io`, `counters`, `form` (+6 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `contact.html (Contact)` connect `Quote Request Conversion Flow` to `Shared Page Layout & Chrome`, `Mobile Navigation`?**
  _High betweenness centrality (0.180) - this node is a cross-community bridge._
- **Why does `realisations.html (Réalisations)` connect `Shared Page Layout & Chrome` to `Animations & Trust Stats`, `Mobile Navigation`, `Realisations Gallery`?**
  _High betweenness centrality (0.154) - this node is a cross-community bridge._
- **Why does `Animated Counters IntersectionObserver` connect `Animations & Trust Stats` to `Shared Page Layout & Chrome`?**
  _High betweenness centrality (0.143) - this node is a cross-community bridge._
- **Are the 4 inferred relationships involving `index.html (Accueil)` (e.g. with `Shared CTA Band Pattern` and `Shared Footer Markup`) actually correct?**
  _`index.html (Accueil)` has 4 INFERRED edges - model-reasoned connections that need verification._
- **Are the 4 inferred relationships involving `realisations.html (Réalisations)` (e.g. with `Shared CTA Band Pattern` and `Shared Footer Markup`) actually correct?**
  _`realisations.html (Réalisations)` has 4 INFERRED edges - model-reasoned connections that need verification._
- **Are the 4 inferred relationships involving `contact.html (Contact)` (e.g. with `Shared CTA Band Pattern` and `Shared Footer Markup`) actually correct?**
  _`contact.html (Contact)` has 4 INFERRED edges - model-reasoned connections that need verification._
- **Are the 4 inferred relationships involving `services.html (Services)` (e.g. with `Shared CTA Band Pattern` and `Shared Footer Markup`) actually correct?**
  _`services.html (Services)` has 4 INFERRED edges - model-reasoned connections that need verification._