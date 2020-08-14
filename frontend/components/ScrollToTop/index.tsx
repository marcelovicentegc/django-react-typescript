import { useLocation } from "react-router-dom";
import { useEffect } from "react";

interface IProps {
  distanceFromTop?: number;
}

export const ScrollToTop: React.FC<IProps> = ({ distanceFromTop }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: distanceFromTop ? distanceFromTop : 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return null;
};
