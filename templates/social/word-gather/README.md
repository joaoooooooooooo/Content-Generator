# Word Gather

Native Canvas adaptation of [SnapCN Word Gather](https://snapcn.dev/docs/text/word-gather), distributed under the adjacent MIT license. The reference motion tables, scattered arrival order, text metrics, and wrapping are preserved. Figtree is bundled under its SIL Open Font License in `public/social/word-gather`.

The renderer uses seconds rather than playback state, so seeking and exports produce the same frames at every frame rate. The reference clock continues beyond its original 49 frames to allow longer sentences to finish. Increase the timeline duration for longer text or slower playback. Whitespace separates words; the text width controls wrapping.

The template uses the shared social renderer for previews, timeline playback, and exports, with no Remotion dependency.
