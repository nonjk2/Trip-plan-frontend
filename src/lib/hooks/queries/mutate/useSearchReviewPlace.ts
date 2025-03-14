import { useState, useEffect, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import debounce from 'lodash/debounce';

const useSearchReviewPlace = () => {
  const [searchText, setSearchText] = useState('');
  const [dataList, setDataList] = useState<GooglePlaceAPIType[]>([]);

  const fetchPlaces = async (text: string) => {
    if (!text) return [];
    const res = await fetch(`/api/google-places?query=${text}`);
    if (!res.ok) throw new Error('Failed to fetch places');
    const data = await res.json();
    return data.predictions || [];
  };

  const { mutate } = useMutation({
    mutationFn: fetchPlaces,
    onSuccess: (data) => setDataList(data),
  });

  const debouncedSearch = useRef(
    debounce((text: string) => {
      mutate(text);
    }, 300)
  ).current;

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, []);

  const handleSearchChange = (text: string) => {
    setSearchText(text);
    debouncedSearch(text);
  };

  return {
    searchText,
    setSearchText,
    dataList,
    setDataList,
    handleSearchChange,
  };
};

export default useSearchReviewPlace;
