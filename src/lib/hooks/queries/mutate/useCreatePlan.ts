import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

type UseCreatePlanProps = {
  formData: { planData: PlanDataType; image: File | null };
  callbackFn?: () => void;
  queryKeyType: string[];
};

const createPlan = async (formData: FormData) => {
  const response = await fetch('/api/proxy', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('서버 응답 실패');
  }

  return response.json();
};

const useCreatePlan = ({
  formData: { image, planData },
  callbackFn,
  queryKeyType,
}: UseCreatePlanProps) => {
  const queryClient = useQueryClient();
  const formData = new FormData();
  const defaultFormData = new FormData();
  formData.append(
    'plan',
    JSON.stringify({ ...planData, transportation: 'CAR' } as PlanDataType)
  );

  if (image) {
    formData.append('thumbnail', image);
  }
  const mutation = useMutation({
    mutationFn: (customFormData?: FormData) =>
      createPlan(customFormData ?? defaultFormData),

    onSuccess: () => {
      toast.dismiss();
      toast.success('여행 계획이 성공적으로 등록되었습니다!');
      queryClient.invalidateQueries({ queryKey: queryKeyType });
      if (callbackFn) callbackFn();
    },
    onError: (error) => {
      console.error('업로드 실패:', error);
      toast.dismiss();
      toast.error('업로드 실패. 다시 시도해주세요.');
    },
  });

  return mutation;
};

export default useCreatePlan;
