# Keith A Godfrey — Photography

A static modern studio portfolio for Keith A Godfrey, Dallas, Texas. Built with plain HTML, CSS, and JavaScript. No installation, build step, hosted fonts, or external services.

## Deploy

Upload `index.html`, `styles.css`, `script.js`, `favicon.svg`, and the complete `webp/` directory to your web root. Keep the folder structure intact. Relative paths support hosting at the root or in a subdirectory.

The ready-to-upload files are also in `keith-godfrey-portfolio.zip` and the `keith-godfrey-portfolio/` directory. Preview locally with `python3 -m http.server 8000`, then visit http://localhost:8000.

## What's included

- A bold typographic cover with paired jumping-frog and sunflower photographs.
- 21 unique featured and selected photographs, with a dark nature spread.
- An archive of 18 additional photographs, open by default, with category filters. Visitors can collapse it.
- A fullscreen viewer with previous/next buttons, arrow keys, Escape, and mobile swipe support.
- Reduced-motion support, native keyboard focus, descriptive image text, and lazy loading.
- Keith’s illustrated studio logo and camera portrait in the Perspective section.
- Each photograph appears once on the page; featured work is excluded from the archive.
- Dallas location and direct email links to keith@kagodfrey.com.

The native archive and direct image links work without JavaScript. The layout uses system sans-serif fonts, so exact letterforms can differ between operating systems. Original photo files are unchanged. The selected blueberry image uses a separately saved AI-enhanced version, `webp/IMG_1343-enhanced.webp`; its original is `webp/IMG_1343.webp`. AI reconstruction adds fine surface detail rather than recovering original sensor data.

## Editing

- `index.html`: copy, contact information, image sequence, captions, and metadata.
- `styles.css`: color variables at the top, editorial image placements, and responsive layouts.
- `script.js`: archive filtering, restrained reveal motion, and the photo viewer.

Selected photo links use `data-set="selection"`; archive links use `data-set="archive"`. Archive figures use `data-category="people"`, `"still-life"`, or `"nature"`. Keep the image width, height, and descriptive alt text when changing photos.

The Open Graph image currently uses a relative photo path. Once the final public URL is known, change `og:image` to that photo’s absolute HTTPS URL and add `og:url`/canonical metadata for your domain.

The archive blueberry-bowl photo also uses a separate AI-enhanced file, `webp/IMG_1342-enhanced.webp`; its original is preserved at `webp/IMG_1342.webp`.
