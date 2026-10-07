import { useEffect, useRef } from "react";
import {
  Alignment,
  Fit,
  Layout,
  RuntimeLoader,
  useRive,
  useViewModel,
  useViewModelInstance,
  useViewModelInstanceColor,
  useViewModelInstanceNumber,
} from "@rive-app/react-webgl2";
import moonvineStepperSrc from "@/assets/rive files/moonvine_stepper.riv?url";
import riveWasmUrl from "@rive-app/webgl2/rive.wasm?url";
import {
  getRiveBorderStrokeColor,
  getRivePointColor,
  getRivePointSize,
  getRiveStrokeWidth,
  hexToRiveColor,
  RIVE_STROKE_COLOR_CHANGE_EVENT,
} from "@/assets/rive files/riveTheme";
import { cn } from "@/lib/utils";

const STEPPER_LAYOUT = new Layout({
  alignment: Alignment.BottomRight,
  fit: Fit.Contain,
});
const STEPPER_SIZE = 874;
const STEPPER_TRIGGER_DELAY_MS = 160;

let stepperTriggerQueue = Promise.resolve();

// Keep the Rive engine in the application bundle instead of relying on its CDN.
RuntimeLoader.setWasmUrl(riveWasmUrl);

export function NextStepsIntro({
  artboard = "Artboard",
  ariaLabel = "Moonvine next steps animation",
  children,
  className,
}) {
  const containerRef = useRef(null);
  const hasTriggeredAnimation = useRef(false);
  const { rive, RiveComponent } = useRive({
    artboard,
    layout: STEPPER_LAYOUT,
    src: moonvineStepperSrc,
    stateMachines: "State Machine 1",
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
  }, [strokeWidthBinding]);

  useEffect(() => {
    pointSizeBinding.setValue(getRivePointSize());
  }, [pointSizeBinding]);

  useEffect(() => {
    const applyThemeBindings = () => {
      strokeColorBinding.setValue(
        hexToRiveColor(getRiveBorderStrokeColor()),
      );
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

  useEffect(() => {
    const container = containerRef.current;

    if (!container || !viewModelInstance || hasTriggeredAnimation.current) {
      return undefined;
    }

    let cancelled = false;
    let queued = false;
    let inView = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting && entry.intersectionRatio >= 0.25;
        if (!inView || queued || hasTriggeredAnimation.current) {
          return;
        }

        queued = true;
        stepperTriggerQueue = stepperTriggerQueue
          .catch(() => undefined)
          .then(
            () =>
              new Promise((resolve) => {
                window.setTimeout(() => {
                  queued = false;
                  if (!cancelled && inView) {
                    const trigger = viewModelInstance.trigger("animationStart");
                    if (trigger) {
                      trigger.trigger();
                      hasTriggeredAnimation.current = true;
                      observer.disconnect();
                    }
                  }
                  resolve();
                }, STEPPER_TRIGGER_DELAY_MS);
              }),
          );
      },
      { threshold: 0.25 },
    );

    observer.observe(container);

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [viewModelInstance]);

  return (
    <div
      className={cn(
        "relative isolate block min-h-[27rem] overflow-hidden md:flex md:min-h-[32rem] md:items-center xl:min-h-[35rem]",
        className,
      )}
      ref={containerRef}
    >
      {children}
      <div
        className="pointer-events-none relative -left-[5%] mt-8 aspect-square w-[110%] max-w-[var(--stepper-size)] md:absolute md:left-auto md:right-0 md:bottom-0 md:mt-0 md:size-[960px] md:max-w-none xl:size-[var(--stepper-size)]"
        style={{
          "--stepper-size": `${STEPPER_SIZE}px`,
          maskImage: "linear-gradient(to bottom, black calc(100% - 48px), transparent 100%)",
        }}
      >
        <RiveComponent
          aria-label={ariaLabel}
          className="size-full"
        />
      </div>
    </div>
  );
}
