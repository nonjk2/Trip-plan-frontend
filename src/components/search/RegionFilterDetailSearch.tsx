import { useState } from 'react';
import Search from '../plan-setting-step/plan-setting-step-tab/plan-setting-tab-search/Search';
import FilterSearchItems from '../plan-setting-step/plan-setting-step-tab/plan-setting-tab-search/FilterSearchItems';
import { regions } from '@/constants/regions';
import { useFilterStore } from '@/stores/filterStores';
import toast from 'react-hot-toast';

type SearchResult = { parent: string; child: string };

const RegionFilterDetailSearch = () => {
  const [, setSelectedItem] = useState<SearchResult | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);

  const { setSearchDetails, selectedDetails } = useFilterStore(
    (state) => state.region
  );

  const handleSelect = (item: SearchResult) => {
    const newDetail = { parent: item.parent, child: item.child };
    setSelectedItem(newDetail);
    setSearchTerm(`${newDetail?.parent} > ${newDetail?.child}`);

    const isDuplicate = selectedDetails.some((e) => {
      return e.parent === newDetail.parent && e.child === newDetail.child;
    });
    if (isDuplicate) {
      return toast.error('동일한 장소가 있습니다');
    }

    setSearchDetails(newDetail);
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);

    if (!term.trim()) {
      setResults([]);
      return;
    }

    const matchedResults: SearchResult[] = [];
    Object.entries(regions).forEach(([parent, children]) => {
      children.forEach((child) => {
        if (child.includes(term) || parent.includes(term)) {
          matchedResults.push({ parent, child });
        }
      });
    });

    setResults(matchedResults);
  };

  return (
    <Search<SearchResult>
      title="지역명 또는 장소를 입력해주세요"
      list={results}
      onSelect={handleSelect}
      searchTerm={searchTerm}
      onSearchChange={handleSearchChange}
      renderItem={(item, handleSelect) => (
        <FilterSearchItems
          handleSelect={handleSelect}
          items={item}
          key={`${item.parent}>${item.child}`}
        />
      )}
    />
  );
};

export default RegionFilterDetailSearch;
