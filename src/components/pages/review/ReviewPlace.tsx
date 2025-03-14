import React from 'react';
import Search from '@/components/plan-setting-step/plan-setting-step-tab/plan-setting-tab-search/Search';
import useSearchReviewPlace from '@/lib/hooks/queries/mutate/useSearchReviewPlace';
import SearchKeyWordItems from '@/components/plan/plan-create/modal/RegionItemForGoogleMap';
import Button from '@/components/common/Button';
import { useReviewStore } from '@/stores/reviewStores';

interface ReviewPlaceProps {
  onConfirm: (place: GooglePlaceAPIType) => void;
}

const ReviewPlace = ({ onConfirm }: ReviewPlaceProps) => {
  const { selectedPlace, setSelectedPlace } = useReviewStore();
  const {
    searchText,
    dataList,
    handleSearchChange,
    setSearchText,
    setDataList,
  } = useSearchReviewPlace();

  const handleSelect = (item: GooglePlaceAPIType) => {
    setSearchText(item.structured_formatting.main_text);
    setSelectedPlace(item);
    setDataList([]);
  };

  return (
    <>
      <div className="mt-[2.8rem] grow">
        <Search
          onSelect={handleSelect}
          onSearchChange={handleSearchChange}
          title="지역명 또는 장소를 입력해주세요"
          list={dataList}
          searchTerm={searchText}
          renderItem={(item, handleSelect) => (
            <SearchKeyWordItems
              key={item.place_id}
              handleSelect={handleSelect}
              items={item}
            />
          )}
        />
      </div>
      <Button
        size="lg"
        onClick={() => selectedPlace && onConfirm(selectedPlace)}
        btnColor="blue"
        className="text-white"
        disabled={!selectedPlace}
      >
        다음
      </Button>
    </>
  );
};

export default ReviewPlace;
