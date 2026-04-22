import { useEffect } from "react";

function usePageTitle(title) {
  useEffect(() => {
    const defaultTitle = "StayLux | Premium Hotel Booking";

    if (title) {
      document.title = `${title} | StayLux`;
    } else {
      document.title = defaultTitle;
    }

    return () => {
      document.title = defaultTitle;
    };
  }, [title]);
}

export default usePageTitle;