import Button from '@/components/common/Button';
import { regions } from '@/constants/regions';
import { useFilterStore } from '@/stores/filterStores';
import { usePlanStore } from '@/stores/planStores';
import React from 'react';

interface DetailedSelectorProps {
  isFilterType?: boolean;
}

const DetailedSelector = ({ isFilterType = false }: DetailedSelectorProps) => {
  const planStore = usePlanStore((state) => state.region);
  const filterStore = useFilterStore((state) => state.region);

  const { selectedRegion, selectedDetails, toggleDetail } = isFilterType
    ? filterStore
    : planStore;

  if (!selectedRegion || !regions[selectedRegion]) return null;
  return (
    <div className="flex flex-col my-[4rem] relative gap-[2rem]">
      <span className="text-[2rem] leading-[3rem] font-semibold">상세선택</span>
      <div className="flex flex-wrap gap-[1.2rem] gap-y-[2rem]">
        {regions[selectedRegion].map((e) => (
          <Button
            key={e}
            size="sm"
            btnColor="white"
            className={`border-none ${
              selectedDetails.some(
                (item) => item.parent === selectedRegion && item.child === e
              )
              ? 'bg-blue-500 text-white'
              : 'bg-var-enable-300 text-[rgb(0,0,0,0.3)]'
            }`}
            onClick={() => toggleDetail(e)}
          >
            {e}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default DetailedSelector;
