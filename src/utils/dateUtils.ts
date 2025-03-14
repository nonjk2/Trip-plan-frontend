export const formatDate = (pageType: string, date: Date) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  const year = dateObj.getFullYear();
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  const day = dateObj.getDate().toString().padStart(2, '0');
  const weekday = new Intl.DateTimeFormat('ko-KR', { weekday: 'short' }).format(
    dateObj
  );

  if (pageType === 'schedule') {
    const weekday = new Intl.DateTimeFormat('ko-KR', {
      weekday: 'short',
    }).format(dateObj);
    return `${month}.${day}(${weekday})`;
  } else if (pageType === 'comment') {
    return `${year}.${month}.${day}`;
  } else if (pageType === 'main') {
    return `${month}.${day}`;
  } else if (pageType === 'review') {
    return `${year}.${month}.${day}(${weekday})`;
  }
};
/**
 *
 *
 * 몇박몇일 만드는함수
 */
export const calculateTripDuration = ({
  endDate,
  startDate,
}: {
  startDate: string;
  endDate: string;
}) => {
  if (!startDate || !endDate) return null;
  const start = new Date(startDate);
  const end = new Date(endDate);
  const duration =
    Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  return { nights: duration - 1, days: duration };
};

export const generateDays = ({
  startDay,
  endDay,
}: {
  startDay: string;
  endDay: string;
}): PlanDayType[] => {
  const result: PlanDayType[] = [];
  const currentDate = new Date(startDay!);
  const endDate = new Date(endDay!);

  let dayIndex = 1;

  while (currentDate <= endDate) {
    const formattedDate = currentDate.toISOString().split('T')[0];
    result.push({
      day: dayIndex,
      cost: 0,
      date: formattedDate,
      detail: [],
    });
    currentDate.setDate(currentDate.getDate() + 1);
    dayIndex++;
  }

  return result;
};
export const formatDatePicker = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

// A박 B일 에서 B값 추출
export const getDaysFromDateFilter = (
  selected: string | null
): string | null => {
  if (!selected) return null;
  const match = selected.match(/\d+일/);
  return match ? match[0].replace('일', '') : null;
};

// string으로 받은 값 포맷팅
export const formatFromString = (param: string): string => {
  const date = new Date(param);

  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${month}월 ${day}일`;
};
