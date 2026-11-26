# Try the Look — Runway

A single-page Nike-branded streetwear lookbook recreation based on the supplied exact-recreation brief.

## Stack
- Plain HTML, CSS and vanilla JavaScript — no framework or build step.
- Custom Web Component: `<runway-section>`.
- Responsive desktop runway and mobile classic presentation.

## Run locally
Open `index.html` in a browser, or serve this folder with any static file server (for example `python3 -m http.server 8000`).

## Project structure
- `index.html` — semantic page shell, navigation, custom element and styling bag dialog.
- `styles.css` — responsive runway, product panel, popup and styling bag presentation.
- `app.js` — exact six-look and eight-product data, carousel, product pins, size selection and local styling bag.

## Exact source data
All original model, product and logo images are referenced from the absolute URLs under `https://reel-ref-try-the-look.vercel.app/assets/`. The supplied Shopify product links, variant IDs, labels, prices, look order and pin coordinates are retained in the implementation.

## Commerce behavior
Product detail links open the supplied Shopify product pages. The styling bag is a browser-local shortlist saved in localStorage. The static recreation does not process payments or create Shopify orders; checkout remains on the linked Shopify storefront.
