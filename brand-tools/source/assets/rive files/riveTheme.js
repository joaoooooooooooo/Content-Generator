export const RIVE_BORDER_STROKE = {
  dark: "#6E6E6E",
  light: "#B5B5B5",
};

export const RIVE_POINT_COLOR = {
  dark: "#FFFFFF",
  light: "#000000",
};

export const RIVE_STROKE_WIDTH = 1;
export const RIVE_POINT_SIZE = 8;
export const RIVE_STROKE_COLOR_CHANGE_EVENT = "rive-stroke-color-change";

let riveStrokeColorOverride = null;

export function getRiveBorderStrokeColor() {
  if (riveStrokeColorOverride) {
    return riveStrokeColorOverride;
  }

  return document.documentElement.classList.contains("dark")
    ? RIVE_BORDER_STROKE.dark
    : RIVE_BORDER_STROKE.light;
}

export function setRiveBorderStrokeColorOverride(color) {
  riveStrokeColorOverride = color;
  window.dispatchEvent(new Event(RIVE_STROKE_COLOR_CHANGE_EVENT));
}

export function getRivePointColor() {
  return document.documentElement.classList.contains("dark")
    ? RIVE_POINT_COLOR.dark
    : RIVE_POINT_COLOR.light;
}

export function getRiveStrokeWidth() {
  return RIVE_STROKE_WIDTH;
}

export function getRivePointSize() {
  return RIVE_POINT_SIZE;
}

export function hexToRiveColor(hex) {
  return Number.parseInt(`ff${hex.slice(1)}`, 16);
}
