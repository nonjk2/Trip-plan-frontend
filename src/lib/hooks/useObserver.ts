import { debounce } from 'lodash';
import { useEffect, useRef } from 'react';
// import _ from 'lodash';

type UseIntersectionObserverProps = {
  sections: string[];
  threshold?: number;
  onChange: (activeSection: string | null) => void;
};

const useIntersectionObserver = ({
  sections,
  threshold = 0.1,
  onChange,
}: UseIntersectionObserverProps) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const debouncedOnChange = debounce((id) => {
    onChange(id);
    console.log(id);
  }, 200);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            debouncedOnChange(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: '-35% 0px -40% 0px',
        threshold: 0.35,
      }
    );

    const targets = sections
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    targets.forEach((target) => observer.observe(target));

    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [sections, threshold, onChange]);
};

export default useIntersectionObserver;
