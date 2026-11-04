# Design and asset references

Research performed in Google Chrome through Playwright on 4 November 2026. Reference websites informed the visual direction; their site designs, logos, and proprietary photography were not copied into this project.

## Browser research

- [European café interiors, Roman arches and heritage green](https://www.google.com/search?q=European+cafe+Roman+arches+interior+heritage+green&udm=2): reviewed the visual language of arched windows, cream façades, green interiors, brass, and warm timber.
- [Assam and Darjeeling tea bungalow interiors](https://www.google.com/search?q=Assam+tea+bungalow+interior+cane+heritage+Darjeeling+tea+room&udm=2): reviewed veranda light, cane furniture, tea-room warmth and botanical surroundings. Search results included Ging Tea House, Mim Tea Bungalow, and tea estate stays in North Bengal and Assam.
- [Kanchenjunga and Darjeeling imagery](https://www.google.com/search?q=Kanchenjunga+Darjeeling+Unsplash): explored mountain imagery for the later scroll-journey request. Unsplash’s search page presented a browser check, so the site uses the directly available licensed image assets listed below.

Research captures are in `output/playwright/research-arches.png` and `output/playwright/research-tea-bungalows.png` locally.

## Original brand reference

The user-supplied `old logo.jpeg` depicts brass lettering, a leaf wreath and a steaming tea cup on dark wood. It is preserved unchanged. The site’s original SVG line drawings reinterpret those motifs for a lighter interface; they do not replace the supplied source image. The primary name, **Da Duke**, is larger and more prominent than the secondary italic **and Chai**.

## Photographs

All photographs are local optimized copies from Unsplash, covered by the [Unsplash License](https://unsplash.com/license). These are visual concept images and do not document the actual business. The Himalayan scene is a regional mood reference; it is not represented as a photograph of the café’s location or of Darjeeling specifically.

| Local asset          | Original source                                                                    |
| -------------------- | ---------------------------------------------------------------------------------- |
| `cafe-table.webp`    | [Sunlit café table](https://images.unsplash.com/photo-1445116572660-236099ec97a0)  |
| `cafe-exterior.webp` | [European café terrace](https://images.unsplash.com/photo-1559925393-8be0ec4767c8) |
| `cafe-interior.webp` | [Warm café lights](https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb)   |
| `tea.webp`           | [Tea and biscuits](https://images.unsplash.com/photo-1544787219-7f47ccb76574)      |
| `croissant.webp`     | [Croissants](https://images.unsplash.com/photo-1555507036-ab1f4038808a)            |
| `cake.webp`          | [Chocolate cake](https://images.unsplash.com/photo-1578985545062-69928b1d9587)     |
| `rome.webp`          | [Rome’s Colosseum](https://images.unsplash.com/photo-1552832230-c0197dd311b5)      |
| `mountains.webp`     | [Himalayan scenery](https://images.unsplash.com/photo-1544735716-392fe2489ffa)     |

The original JPEG downloads are retained locally under ignored `output/source-images/`. `scripts/prepare-images.mjs` documents the eight photograph conversions, original emblem, and social-card assembly; the deployed images are already prepared, so the build does not run or download anything through that script.

## Type and colours

- Cormorant Garamond: expressive serif headings and italic details.
- Manrope: quiet, readable supporting text and interface controls.
- Both font families are bundled via Fontsource with their package license notices.
- Ivory `#f6f4ec`, forest `#283f32`, muted green `#626e57`, aged brass `#987a4c`.

The arch, tea cup, leaves, wreath, favicon and social-card layout were created for this website. No music, analytics, advertising, or third-party embeds are loaded.
