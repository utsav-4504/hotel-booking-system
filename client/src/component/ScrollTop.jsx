import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTopHandler = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <>
      {visible && (
        <button
          onClick={scrollTopHandler}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-yellow-500 text-slate-900 shadow-lg hover:bg-yellow-400 transition flex items-center justify-center"
          aria-label="Scroll to top"
        >
          <FaArrowUp />
        </button>
      )}
    </>
  );
}

export default ScrollToTop;