import { TSearchList } from '@/types/responseData/search';

interface getSearchListProps {
  day?: string | null;
  transportCategoryName?: string | null;
  people?: string | null;
  categoryNames?: string[];
  keyword?: string | null;
  lastId: number | null;
  lastValue: string | null;
}

export const getSearchList = async (
  queryParams: getSearchListProps
): Promise<TSearchList> => {
  let queryString = '';

  (Object.keys(queryParams) as (keyof getSearchListProps)[]).forEach((key) => {
    const value = queryParams[key];

    if (value === undefined || value === null) {
      if (key === 'lastId' || key === 'lastValue') {
        queryString += `${key}=null&`;
      }
      return;
    }

    if (Array.isArray(value)) {
      value.forEach((item) => {
        queryString += `${key}=${item}&`;
      });
    } else {
      queryString += `${key}=${value}&`;
    }
  });
  queryString = queryString.slice(0, -1);

  try {
    const response = await fetch(
      `/api/proxy/plans/search?size=16&direction=DESC${
        queryString && '&' + queryString
      }`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw {
        message: errorData.message || '검색결과 불러오기 실패',
      };
    }
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
