# Announce Title

Native Canvas adaptation of [SnapCN Announce Title](https://snapcn.dev/docs/scenes/announce-title), under the adjacent MIT license. Google Sans is bundled under its SIL Open Font License in `public/motion-chips/announce-title`.

Preserves the measured shot boundaries (18, 41, 80, 110), exponential title/intro settles, opposing macro movement, reverse tagline reveal. The closing tagline uses the selected solid text color throughout its reveal. The opening perspective is rendered with projected raster strips; symbols use a solid color without glow and are centered on measured path bounds rather than viewBox padding. Opening shots use additive shutter accumulation (20 rush samples, 12 intro samples) to reproduce the motion blur without a DOM player.

The reference sequence spans 170 frames at 30fps. `referenceDuration` maps each layer's local timeline to that sequence, so changing a layer or scene duration stretches the scene. Playback speed can accelerate it and hold the final frame. Long title and tagline sequences compress their stagger to finish before the next cut.

Uses the shared Motion Chips layer renderer, timeline, transparency, and export workflow. No Remotion dependency. Verified with automated draw-command and timing checks, not live browser testing.
