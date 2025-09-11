import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const ScrollToTop: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth", // يخلي الحركة ناعمة
    });
  }, [pathname]);

  return <>{children}</>;
};
