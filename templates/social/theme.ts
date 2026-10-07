// Canvas equivalents of styles/design system/apta-design-system.md.
// Keep the editor UI's tokens separate from the artwork's brand tokens.
const neutral = { black: '#000000', white: '#FFFFFF', darker: '#222222', gray: '#666666' };
export const socialTheme = {
  background: { primary: neutral.white, alternate: neutral.black },
  text: { primary: neutral.darker, alternate: neutral.white, secondary: neutral.gray },
  fontFamily: 'Inter Tight',
  tracking: -0.03,
};

export function socialPostColors(mode: unknown) {
  const light = mode === 'Light';
  return {
    background: light ? socialTheme.background.primary : socialTheme.background.alternate,
    text: light ? socialTheme.text.primary : socialTheme.text.alternate,
    secondary: socialTheme.text.secondary,
    graphicFilter: light ? 'invert(1)' : 'none',
  };
}
