# Moonvine templates in Content-Generator

The catalogue has four folders, mirrored under `templates/brand-tools`:

- **Features**: 17 visible report post templates, using the original report components,
  logos, fonts, and five illustrative report scenarios.
- **AI Visibility**: Sources cited and Question example posts, using RankItem,
  FrameCard, provider logos, inline text editing, and editable sample counts.
- **List**: two editable Figma layouts: stacked checklist rows and status cards.
  Uses the original Geist font, FrameCard/Badge primitives, and local reference icons.
- **Citation**: five animated citation templates: Orbit and Stepper 01–04.
  The original `moonvine-citation` ID remains the Orbit preset for saved projects.

The existing editor shell, project saving, favorites, composes, Canvas controls,
playback timeline, and exports remain in use. Original upstream motion templates
remain registered for old saved projects but are hidden from the catalogue.

## Rendering

`brand-tools/main.jsx` prepares report and Rive resources in an isolated,
same-origin iframe. This preserves report styling without affecting the editor.
The adapter calls its renderer synchronously after preparation, so text changes,
position changes, canvas resizing, playback, and export do not require PNG
serialization or recapturing a report component.

`responsive-renderer.js` composes at the selected Canvas dimensions. Backgrounds
and fades fill the canvas. Text width, spacing, and artwork placement respond to
the aspect ratio; wide canvases use separate text and artwork columns. There is
no portrait/landscape toggle or fixed post bitmap fitted inside the canvas.

`list/ListItem.jsx` composes reusable design system primitives. List item edits
recapture the four small components; headings, placement, and canvas resizing
compose synchronously through `list/render-list.js`. Empty items are omitted.
All templates default to Serif. Font and Post Theme are in the Canvas panel.
Checklist supports 1-8 items; status cards support 1-6, without number labels.
Click editable text directly on the canvas and type. Native transparent text fields
provide the caret and selection over the actual render, using its font and geometry.
Changes save on each input; click away or press Escape to finish. No popup or Apply step.
The editor overlay is not included in exports. Paid Search is hidden from pickers
but remains registered for existing saved projects.

`citation-animation.js` drives the original Rive state machines from timeline
seconds, with small fixed time steps. Seeking backward and looping rebuild the
animation state. Pausing holds the requested frame, and video/GIF capture uses
the same deterministic drawing path as playback. Resources load from local files.

Artwork position uses the editor's XY pad. Offsets are percentages of canvas
width/height and remain meaningful after resizing. Placements are remembered per
report feature or citation artwork. Previously saved pixel offsets are migrated.
Choosing another template or saved compose preserves the current Canvas size.

## Development and verification

- `npm install`
- `npm run dev` builds the isolated renderer before starting Next.js.
- `npm run build` builds both the renderer and Next.js.
- `npm run build:brand-tools` rebuilds iframe code after edits.
- `npm run test:brand-tools` checks folders, controls, canvas preservation,
  persistence/migration, responsive compositions using a canvas test double,
  timeline-time propagation, and referenced public assets. It also runs the real
  Rive WASM and all five original artboards through the citation adapter with
  GPU drawing mocked, including pause, rewind, cleanup, and renderer API checks.

Generated `public/brand-tools` is ignored. Source assets are checked in. The
sibling MVDS project is not needed to build or run Content-Generator. Refresh the
vendored dependency tree deliberately with `node scripts/import-brand-tools.mjs`
and `node scripts/brand-catalog.mjs`, then review changes and rebuild.

Browser rendering, live WebGL playback, and downloaded exports are not verified;
browser testing is excluded at the user's request. Report scenarios are sample
data, not live report connections.

Devices, OBJ, Web, Docs, and Update/News controls are hidden from the editor rail.
Existing routes and saved device projects are retained. Device model preloading
is disabled while the Devices section is hidden.

## Carousels

The stage shows a same-aspect add tile beside the current slide. Add a slide, then
choose its template in the catalogue. Slides keep their own values, uploaded icon
references and animation duration, and share Canvas dimensions. Click a slide to
edit it; remove it using its caption. Slides are included in project saves and
undo/redo. Export carousel PNGs downloads an ordered ZIP; animated templates use
their representative preview frame in this still-image export.

Post properties use the existing horizontal divider between related groups
(sources, list items, heading, author, report selection, branding, and artwork).
