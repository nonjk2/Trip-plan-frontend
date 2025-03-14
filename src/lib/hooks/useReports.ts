import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export const REPORT_REASON_MAP: Record<number, string> = {
  1: '스팸홍보 및 도배',
  2: '음란물',
  3: '불법정보',
  4: '욕설/생명경시/혐오/차별적 표현',
  5: '개인정보 노출',
  6: '불쾌한 표현',
  7: '청소년 유해 내용',
};

type selectType = {
  id: number;
  reports: 'comment' | 'plan' | 'review' | 'reviewcomment';
};

export interface UseReportsReturn {
  isOpen: boolean;
  openModal: (reports: selectType['reports'], planId: number) => void;
  closeModal: () => void;
  submitReport: () => void;
  selectedPlan: selectType | null;
  selectedReason: number[];
  toggleReason: (reasonId: number) => void;
  isPending: boolean;
}

const useReports = (): UseReportsReturn => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<selectType | null>(null);
  const [selectedReason, setSelectedReason] = useState<number[]>([]);

  const openModal = (reports: selectType['reports'], planId: number) => {
    setSelectedPlan({ id: planId, reports });
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedPlan(null);
    setSelectedReason([]);
  };

  const toggleReason = (reasonId: number) => {
    setSelectedReason((prev) =>
      prev.includes(reasonId)
        ? prev.filter((id) => id !== reasonId)
        : [...prev, reasonId]
    );
  };

  const reportRequest = async () => {
    if (!selectedPlan || selectedReason.length === 0) {
      throw new Error('⚠️ 신고할 사유를 선택해주세요!');
    }

    let request_url = '';
    switch (selectedPlan.reports) {
      case 'comment':
        request_url = `/reports/plans/comments/${selectedPlan.id}`;
        break;
      case 'plan':
        request_url = `/reports/plans/${selectedPlan.id}`;
        break;
      case 'review':
        request_url = `/reports/reviews/${selectedPlan.id}`;
        break;
      case 'reviewcomment':
        request_url = `/reports/reviews/comments/${selectedPlan.id}`;
        break;
      default:
        throw new Error('🚨 올바르지 않은 신고 타입입니다.');
    }

    const response = await fetch('/proxy' + request_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        reportReasons: selectedReason,
      }),
    });

    if (!response.ok) {
      throw new Error('🚨 신고 요청에 실패했습니다.');
    }

    return {
      url: request_url,
      reasons: selectedReason.map((id) => REPORT_REASON_MAP[id]),
    };
  };

  const { mutate: submitReport, isPending } = useMutation({
    mutationFn: reportRequest,
    onSuccess: (data) => {
      toast.success('✅ 신고가 정상적으로 접수되었습니다.');
      console.log('✅ 신고 제출 완료:', data);
      closeModal();
    },
    onError: (error) => {
      toast.error(error.message || '신고 제출 중 오류가 발생했습니다.');
      console.error('❌ 신고 제출 중 오류 발생:', error);
    },
  });

  return {
    isPending,
    isOpen,
    openModal,
    closeModal,
    submitReport,
    selectedPlan,
    selectedReason,
    toggleReason,
  };
};

export default useReports;
