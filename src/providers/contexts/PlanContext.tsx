'use client';
import useCreatePlan from '@/lib/hooks/queries/mutate/useCreatePlan';
import useExitPrompt from '@/lib/hooks/useExitprompt';
import { PlanSchema } from '@/types/schema/planSchema';
import { useParams, useRouter } from 'next/navigation';
import React, { createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

type PlanContextType = {
  planData: PlanDataType;
  setPlanData: React.Dispatch<React.SetStateAction<PlanDataType>>;
  image: {
    image: File | null;
    setImage: React.Dispatch<React.SetStateAction<File | null>>;
  };
  handleSubmit: () => Promise<void>;
  mode: 'full' | 'planner';
  toggleMode: () => void;
  dayTab: number;
  setDayHandler: (day: number) => void;
  recommendPlan: toolOutputData[];
  setRecommendPlan: (recommendPlan: toolOutputData[]) => void;
};

export const PlanContext = createContext<PlanContextType | undefined>(
  undefined
);
const initialDatas = {
  title: '',
  subtitle: '',
  startDate: '',
  endDate: '',
  category: [],
  people: 0,
  transportation: '',
  days: [],
};
export const PlanProvider: React.FC<{
  children: React.ReactNode;
  initialData?: PlanDataType;
}> = ({ children }) => {
  const [planData, setPlanData] = useState<PlanDataType>(
    initialDatas as PlanDataType
  );
  const [recommendPlan, setRecommendPlan] = useState<toolOutputData[]>([]);
  const [dayTab, setDayTab] = useState(1);
  const [mode, setMode] = useState<PlanContextType['mode']>('planner');
  const { planid } = useParams<{ planid: string }>();
  const [image, setImage] = useState<File | null>(null);
  const { setIsEditing } = useExitPrompt();
  const router = useRouter();
  const { mutate } = useCreatePlan({
    formData: { planData, image },
    queryKeyType: ['plans'],
    callbackFn: () => router.push('/'),
  });
  const setRecommendPlans = (plan: toolOutputData[]) => {
    const newPlan = [...recommendPlan, ...plan];
    setRecommendPlan(newPlan);
  };
  const setDayHandler = (day: number) => {
    setDayTab(day);
  };

  useEffect(() => {
    setIsEditing(true);

    try {
      const storedPlans = localStorage.getItem('planData');
      const parsedPlans: LocalPlanDataType[] = storedPlans
        ? JSON.parse(storedPlans)
        : [];

      const foundPlan = parsedPlans.find((e) => e.planId === planid);

      if (foundPlan) {
        setPlanData(foundPlan.planData);
        localStorage.setItem(
          'plan',
          JSON.stringify({
            ...foundPlan,
          })
        );
        return;
      }

      const storedSinglePlan = localStorage.getItem('plan');
      if (storedSinglePlan) {
        setPlanData(JSON.parse(storedSinglePlan));
        return;
      }
    } catch (error) {
      console.error('로컬스토리지 데이터 로드 실패:', error);
    }
  }, [planid, setIsEditing]);

  const handleSubmit = async () => {
    const validationResult = PlanSchema.safeParse(planData);

    if (!validationResult.success) {
      toast.error(
        validationResult.error.issues[0]?.message || '유효성 검증 실패'
      );
      return;
    }

    mutate(); // 실행
  };

  const toggleMode = () => {
    setMode((prev) => {
      if (prev === 'full') {
        return 'planner';
      } else {
        return 'full';
      }
    });
  };

  return (
    <PlanContext
      value={{
        planData,
        setPlanData,
        image: {
          image,
          setImage,
        },
        handleSubmit,
        mode,
        toggleMode,
        setDayHandler,
        dayTab,
        recommendPlan,
        setRecommendPlan: setRecommendPlans,
      }}
    >
      {children}
    </PlanContext>
  );
};

export const usePlanContext = () => {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error('컨텍스트에러.');
  }
  return context;
};
