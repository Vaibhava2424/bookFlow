// ScrollToTop.tsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // 🚀 go to top whenever route changes
  }, [pathname]);

  return null;
};

export default ScrollToTop;
