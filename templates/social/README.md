# Social templates

Each template has a folder with catalogue metadata (index.ts) and a deterministic canvas drawing (draw.ts). Matching images and SVGs live in public/social/<template>/assets so Next can serve them in both local and static deployments. Shared fonts live in public/social/shared/fonts.

- Export the metadata through templates/social.ts and add it to templates/index.ts.
- Register the drawing in lib/socialRenderer.ts. The stage, catalogue thumbnail, PNG export, and project poster use this same drawing.
- Set meta.socialSize to the authored pixel dimensions. Static social templates have no timing, FPS, safe-area, camera, or media-track controls.
- Text controls support multiline. Upload controls save immutable image blobs in IndexedDB and store a social-asset: reference in the value bag; undo, presets, and project persistence keep that reference.
- Brand tokens live in theme.ts and mirror styles/design system/apta-design-system.md. The font files are copied from that supplied design system. These tokens apply to the artwork, not the editor shell.
- Run node scripts/genExportSources.mjs after changing template files.

Testimonial reproduces Figma file 7oEM2pxW5acrdIrrvsIzDi, node 1:4, at 1080 x 1350. Its original image, crop, SVG quotation mark, wordmark are preserved. The exact Figma typography (600 heading, 400 attribution) is retained; longer edits shrink within their text boxes. Other canvas ratios contain the artwork without distorting the photo or brand assets.

Photo uploads are limited to PNG, JPEG, or WebP under 20 MB. Reset photo returns to the original Figma client image. Fonts and assets are fully local; no Figma connection is required to use or export the template.

Testimonial has its own Light/Dark post theme (Dark by default). The palette applies to the canvas, text, quotation graphic, and wordmark, including the margins on other aspect ratios. The client photo retains its original colors. This setting is independent of the editor theme and persists with the post.

Coverflow Ring Post uses `kind: social-motion`: the existing Coverflow Ring transform sits at the bottom of a portrait post, with a centered editable heading and Apta wordmark above it. Its transparent header drawing is composed into the Pixi stage and catalogue thumbnails by `lib/socialMotionHeader.ts`, so video and GIF exports include the same artwork. Animated posts retain media, timing, FPS, and video export controls. Shared light/dark wordmarks live in `public/social/shared/logos`.
