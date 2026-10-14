# Keith A Godfrey — Photography

A standalone static photography homepage. No build step, dependencies, or external services.

## Hosting

Upload `index.html`, `styles.css`, `script.js`, `favicon.svg`, and the complete `webp/` folder to your hosting directory, preserving the file structure. All paths are relative, so the site also works in a subdirectory.

Open `index.html` directly, or preview with `python3 -m http.server 8000` and visit http://localhost:8000.

## Editing

- The name, introduction, and footer are in `index.html`.
- Colors and layout are in `styles.css`.
- Each gallery `<figure>` has a `data-category` value: `people`, `still-life`, or `nature`. Keep image dimensions and descriptive alt text when adding photographs.
- The gallery initially shows 12 images. Filters and “View the full collection” reveal the rest. With JavaScript disabled, all 34 photographs remain available as direct image links.
- The viewer supports Escape to close and left/right arrow keys to navigate.

No contact details were supplied, so no placeholder contact links are included. Add Keith’s verified contact information when ready.
