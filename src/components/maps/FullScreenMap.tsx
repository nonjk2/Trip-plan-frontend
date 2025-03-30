import { createPortal } from 'react-dom';

const FullscreenMap = ({ children }: { children: React.ReactNode }) => {
  if (typeof window === 'undefined') return null;
  const el = document.getElementById('fullscreen-map-root');
  return el ? createPortal(children, el) : null;
};

export default FullscreenMap;
