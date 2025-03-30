/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, RefObject, DependencyList } from 'react';

const useAutoScroll = (
  dependencyList: DependencyList,
  targetRef: RefObject<HTMLElement | null>
) => {
  useEffect(() => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, dependencyList);
};

export default useAutoScroll;
