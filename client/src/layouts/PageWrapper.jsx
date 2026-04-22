import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ScrollToTop from "../common/ScrollToTop";

function PageWrapper({ children }) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, [pathname]);

  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-hidden">
      {children}
      <ScrollToTop />
    </div>
  );
}

export default PageWrapper;