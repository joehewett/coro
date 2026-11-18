import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Every page opens at its top, instead of keeping the previous page's scroll position. */
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
};

export default ScrollToTop;
