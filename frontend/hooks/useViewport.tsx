import { useContext } from "react";
import { viewportContext } from "../contexts/ViewportContext";

export const useViewport = () => {
  const { width, height } = useContext(viewportContext);
  return { width, height };
};
