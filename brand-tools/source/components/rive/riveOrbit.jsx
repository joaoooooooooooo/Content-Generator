import { useEffect } from "react";
import {
  RuntimeLoader,
  useRive,
  useViewModel,
  useViewModelInstance,
  useViewModelInstanceColor,
  useViewModelInstanceNumber,
} from "@rive-app/react-webgl2";
import moonvineOrbitSrc from "@/assets/rive files/moonvine orbit.riv?url";
import riveWasmUrl from "@rive-app/webgl2/rive.wasm?url";
import {
  getRiveBorderStrokeColor,
  getRivePointColor,
  getRivePointSize,
  getRiveStrokeWidth,
  hexToRiveColor,
  RIVE_STROKE_COLOR_CHANGE_EVENT,
} from "@/assets/rive files/riveTheme";

// Keep the Rive engine in the application bundle instead of relying on its CDN.
RuntimeLoader.setWasmUrl(riveWasmUrl);

export default function RiveOrbit({
  className,
  style,
  stateMachines = "State Machine 1",
  ...props
}) {
  const { rive, RiveComponent } = useRive({
    src: moonvineOrbitSrc,
    stateMachines,
    autoplay: true,
  });
  const viewModel = useViewModel(rive, { useDefault: true });
  const viewModelInstance = useViewModelInstance(viewModel, {
    rive,
    useDefault: true,
  });
  const strokeColorBinding = useViewModelInstanceColor(
    "Stroke Color",
    viewModelInstance,
  );
  const strokeWidthBinding = useViewModelInstanceNumber(
    "Stroke Thickness",
    viewModelInstance,
  );
  const pointColorBinding = useViewModelInstanceColor(
    "Point Color",
    viewModelInstance,
  );
  const pointSizeBinding = useViewModelInstanceNumber(
    "Point Size",
    viewModelInstance,
  );

  useEffect(() => {
    strokeWidthBinding.setValue(getRiveStrokeWidth());
    pointSizeBinding.setValue(getRivePointSize());
  }, [pointSizeBinding, strokeWidthBinding]);

  useEffect(() => {
    const applyThemeBindings = () => {
      const riveStrokeColor = hexToRiveColor(getRiveBorderStrokeColor());

      strokeColorBinding.setValue(riveStrokeColor);
      pointColorBinding.setValue(hexToRiveColor(getRivePointColor()));
    };

    applyThemeBindings();

    const observer = new MutationObserver(applyThemeBindings);
    observer.observe(document.documentElement, {
      attributeFilter: ["class"],
      attributes: true,
    });

    window.addEventListener(RIVE_STROKE_COLOR_CHANGE_EVENT, applyThemeBindings);

    return () => {
      observer.disconnect();
      window.removeEventListener(
        RIVE_STROKE_COLOR_CHANGE_EVENT,
        applyThemeBindings,
      );
    };
  }, [pointColorBinding, strokeColorBinding]);

  return <RiveComponent className={className} style={style} {...props} />;
}
