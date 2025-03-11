type RegionType = {
  parent: string;
  child: string;
  grandChild?: string;
};

type PlanDetailType = {
  order: number;
  place: string;
  streetAddress: string;
  latitude: number;
  longitude: number;
  planCategoryNameId: number;
};

type PlanDayType = {
  day: number;
  cost: number;
  date: string;
  detail: PlanDetailType[];
};

type PlanDataType = {
  title: string;
  transportation: 'CAR' | 'PUBLIC';
  subtitle: string;
  startDate: string;
  endDate: string;
  category: RegionType[];
  people: number;
  days: PlanDayType[];
};

type LocalPlanDataType = {
  planData: PlanDataType;
  planId: string;
  userId: number;
  threadId?: string | null;
};
