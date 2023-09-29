import { useEffect, useLayoutEffect, useState } from "react";

export default function useDimensions() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  const handleSize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    handleSize();

    window.addEventListener("resize", handleSize);

    return () => window.removeEventListener("resize", handleSize);
  }, []);

  return windowSize;
}
