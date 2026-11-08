# Keith A Godfrey — Photography

A static modern studio portfolio for Keith A Godfrey, Dallas, Texas. Built with plain HTML, CSS, and JavaScript. No installation, build step, hosted fonts, or external services.

## Deploy

Upload `index.html`, `styles.css`, `script.js`, `favicon.svg`, `robots.txt`, `sitemap.xml`, and the complete `webp/` and `images/` directories to your web root. Include `.nojekyll` and `CNAME` in the publishing folder for GitHub Pages. Keep the folder structure intact. Relative paths support hosting at the root or in a subdirectory.

The ready-to-upload files are also in `keith-godfrey-portfolio.zip` and the `keith-godfrey-portfolio/` directory. Preview locally with `python3 -m http.server 8000`, then visit http://localhost:8000.

## What's included

- A bold typographic cover with paired jumping-frog and sunflower photographs.
- 21 unique featured and selected photographs, with a dark nature spread.
- An archive of 31 additional photographs, open by default, with category filters. Visitors can collapse it.
- A fullscreen viewer with previous/next buttons, arrow keys, Escape, and mobile swipe support.
- Reduced-motion support, native keyboard focus, descriptive image text, and lazy loading.
- Keith’s illustrated studio logo and camera portrait in the Perspective section.
- Each photograph appears once on the page; featured work is excluded from the archive.
- Dallas location and direct email links to keith@kagodfrey.com.

The native archive and direct image links work without JavaScript. The layout uses system sans-serif fonts, so exact letterforms can differ between operating systems. Original photo files are unchanged. The selected blueberry image uses a separately saved AI-enhanced version, `webp/keith-godfrey-blueberries-close-up-enhanced.webp`; its original is `webp/keith-godfrey-blueberries-close-up-original.webp`. AI reconstruction adds fine surface detail rather than recovering original sensor data.

## Editing

- `index.html`: copy, contact information, image sequence, captions, and metadata.
- `styles.css`: color variables at the top, editorial image placements, and responsive layouts.
- `script.js`: archive filtering, restrained reveal motion, and the photo viewer.

Selected photo links use `data-set="selection"`; archive links use `data-set="archive"`. Archive figures use `data-category="people"`, `"still-life"`, or `"nature"`. Keep the image width, height, and descriptive alt text when changing photos.

Canonical, social-card, structured-data, and sitemap URLs are configured for `https://kagodfrey.com/`. Update them together if the production domain changes.

The archive blueberry-bowl photo also uses a separate AI-enhanced file, `webp/keith-godfrey-blueberries-yellow-bowl-enhanced.webp`; its original is preserved at `webp/keith-godfrey-blueberries-yellow-bowl-original.webp`.

## November 8 photo additions

Added 13 distinct photographs to the archive with descriptive titles, alt text, and People / Still life / Nature categories. All photos retain their full proportions. Keith’s supplied biography replaces the generic Perspective copy.

At the owner’s request, six reference/screenshot files were excluded: `IMG_3423.webp`, `IMG_5152.webp`, `IMG_5169.webp`, `IMG_5186.webp`, `IMG_5187.webp`, and `IMG_5461.webp`. `IMG_0681.webp` repeats the dog-with-rope photograph; the higher-resolution `keith-godfrey-dog-rope-toy-black-white.webp` is included once.

## SEO and sharing

- Search title and description describe Keith’s Dallas location and photography work.
- Canonical URL: https://kagodfrey.com/.
- Open Graph and large Twitter/X cards use the complete cartoon studio artwork, exported as a JPEG at `images/keith-a-godfrey-photography-share-card.jpg` without cropping.
- JSON-LD describes Keith as a Person, the WebSite, the CollectionPage, and the 52-photo gallery. No unverified address, reviews, awards, or social profiles are added.
- `sitemap.xml` lists the home page and its 54 visible images using descriptive URLs; `robots.txt` points to it.
- Primary photo filenames are lowercase, descriptive, hyphenated names. `image-filename-map.json` records all 56 renames and original file hashes.
- All page links and image sources use the descriptive filenames. Byte-identical old-filename copies are deliberately included for existing public image links, on GitHub Pages. These compatibility copies are not displayed again or listed in the sitemap. No custom redirects are required or included.

After uploading, check the public home page, share image, robots.txt, and sitemap.xml. Submit the sitemap in Google Search Console and request a home-page recrawl. Refresh cached share previews through your platform’s inspector if the old card persists. These are prepared static files; search indexing and live-host configuration are not changed here.

## GitHub Pages

Unzip the package into your repository’s configured publishing folder (the branch root or `docs/`), including `.nojekyll`, `CNAME`, `robots.txt`, `sitemap.xml`, and both image directories. `.nojekyll` keeps this plain static site out of Jekyll processing. `CNAME` contains `kagodfrey.com` for branch-based publishing; confirm the same custom domain in your repository’s Pages settings. A custom GitHub Actions deployment manages its domain through Pages settings instead.

GitHub Pages does not use `_redirects`, so that file is omitted. Keep the legacy image copies in `webp/` to preserve existing image URLs; the page and sitemap use only the new descriptive paths. Uploading only the renamed images would break previously shared image URLs.

GitHub hosting references: https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages and https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site .
