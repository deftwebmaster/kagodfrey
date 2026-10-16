# Keith A Godfrey — Photography

A static modern studio portfolio for Keith A Godfrey, Dallas, Texas. Built with plain HTML, CSS, and JavaScript. No installation, build step, hosted fonts, or external services.

## Deploy

Upload `index.html`, `styles.css`, `script.js`, `favicon.svg`, and the complete `webp/` directory to your web root. Keep the folder structure intact. Relative paths support hosting at the root or in a subdirectory.

The ready-to-upload files are also in `keith-godfrey-portfolio.zip` and the `keith-godfrey-portfolio/` directory. Preview locally with `python3 -m http.server 8000`, then visit http://localhost:8000.

## What's included

- A bold typographic cover with paired portrait and nature photographs.
- A curated sequence of 16 images with a dark nature spread.
- An expandable archive of all 34 supplied photographs, with category filters.
- A fullscreen viewer with previous/next buttons, arrow keys, Escape, and mobile swipe support.
- Reduced-motion support, native keyboard focus, descriptive image text, and lazy loading.
- Dallas location and direct email links to keith@kagodfrey.com.

The native archive and direct image links work without JavaScript. The layout uses system sans-serif fonts, so exact letterforms can differ between operating systems. Original photo files are unchanged.

## Editing

- `index.html`: copy, contact information, image sequence, captions, and metadata.
- `styles.css`: color variables at the top, editorial image placements, and responsive layouts.
- `script.js`: archive filtering, restrained reveal motion, and the photo viewer.

Selected photo links use `data-set="selection"`; archive links use `data-set="archive"`. Archive figures use `data-category="people"`, `"still-life"`, or `"nature"`. Keep the image width, height, and descriptive alt text when changing photos.

The Open Graph image currently uses a relative photo path. Once the final public URL is known, change `og:image` to that photo’s absolute HTTPS URL and add `og:url`/canonical metadata for your domain.
