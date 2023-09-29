import { config } from "@/utils/webappconfig";
import _ from "lodash";
import { Bounce, Flip, Slide, Zoom, cssTransition } from "react-toastify";

export function customToastTransition(transition) {
  const { toastTransition } = config.toasts;

  const transitionList = {
    Slide,
    Zoom,
    Flip,
    Bounce,
    RotateCenter: cssTransition({
      enter: "rotate-center",
      exit: "rotate-center",
    }),
    FadeInForward: cssTransition({
      enter: "fade-in-fwd",
      exit: "fade-in-fwd-rev",
    }),
  };

  const transitionInConfig =
    toastTransition.charAt(0).toUpperCase() + toastTransition.slice(1);

  const transitionInEmitter =
    !_.isUndefined(transition) &&
    transitionList[transition.charAt(0).toUpperCase() + transition.slice(1)];

  return transitionInEmitter || transitionList[transitionInConfig];
}
