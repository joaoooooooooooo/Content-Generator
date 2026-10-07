# Channel Thread

Native Canvas adaptation of [SnapCN Channel Thread](https://snapcn.dev/docs/social/channel-thread). No Remotion runtime is used.

The reference layout, arrival beats, scroll curve, and fade envelope come from the MIT source at `https://snapcn.dev/r/channel-thread.json`. Copyright and permission text are preserved in `LICENSE.snapcn.txt`. Default sample avatars are from SnapCN's public `/avatars/07.jpg` and `/avatars/13.jpg`. Barlow is bundled under the SIL Open Font License in `public/social/channel-thread/Barlow-OFL.txt`.

Timing is stored in seconds at 1× speed, independent of output FPS. The default four messages use the reference's 0, 12, 60, and 84 frames at 30 FPS. Playback speed scales the entire animation. Duration controls the captured clip; use **Fit duration to messages** after extending a conversation.

Up to twelve editable messages are stored as flat control values (`message1.text`, `message1.author`, etc.). Consecutive messages with matching author, timestamp, and avatar share a header. Blank messages are skipped. Opening/arrival times are normalized chronologically; adjusted times are disclosed in the editor. Long lines shrink to fit. Missing avatars use an initial tile.

The stage, thumbnail, project poster, and export use the same draw function. All poses are pure functions of the requested frame, with no wall-clock animation or capture-only layout.
