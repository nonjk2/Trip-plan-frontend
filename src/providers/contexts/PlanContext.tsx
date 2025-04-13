'use client';
import useCreatePlan from '@/lib/hooks/queries/mutate/useCreatePlan';
import useExitPrompt from '@/lib/hooks/useExitprompt';
import { PlanSchema } from '@/types/schema/planSchema';
import { toFileFromBase64 } from '@/utils/shareUtils';
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
  submit: {
    handleSubmit: () => Promise<void>;
    isGenerating: boolean;
  };
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
  const [isGenerating, setIsGenerating] = useState(false);
  const { setIsEditing } = useExitPrompt();
  const router = useRouter();

  const updateSinglePlan = (plans: LocalPlanDataType[]) => {
    if (plans.length > 0) {
      localStorage.setItem('plan', JSON.stringify(plans[0]));
    } else {
      localStorage.removeItem('plan');
    }
  };
  const callbackFn = () => {
    router.push('/');

    const storedPlans = localStorage.getItem('planData');
    const parsedPlans: LocalPlanDataType[] = storedPlans
      ? JSON.parse(storedPlans)
      : [];

    const filteredPlans = parsedPlans.filter((e) => e.planId !== planid);
    localStorage.setItem('planData', JSON.stringify(filteredPlans));
    updateSinglePlan(filteredPlans);
  };

  const { mutate } = useCreatePlan({
    formData: { planData, image },
    queryKeyType: ['plans'],
    callbackFn,
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

    try {
      setIsGenerating(true);
      if (!image) {
        toast.loading('썸네일 이미지 생성 중...');

        const res = await fetch('/api/ai-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            region:
              planData.days[0].detail.map((e) => e.place).join('-') ||
              'a travel destination in Korea',
          }),
        });

        const { base64 } = await res.json();

        if (!base64) {
          toast.dismiss();
          toast.error('AI 이미지 생성 실패');
          return;
        }
        const file = toFileFromBase64(base64, 'jeju-thumbnail.png');

        toast.dismiss();
        toast.success('이미지 생성 완료!');
        toast.loading('여행계획 등록중');
        const formData = new FormData();
        formData.append(
          'plan',
          JSON.stringify({ ...planData, transportation: 'CAR' })
        );
        formData.append('thumbnail', file);

        mutate(formData);
        return;
      }
    } catch (err) {
      console.error('handleSubmit error:', err);
      toast.dismiss();
      toast.error('업로드 중 오류 발생');
    } finally {
      setIsGenerating(false);
    }
    mutate(undefined);
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
        submit: {
          handleSubmit,
          isGenerating,
        },
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
