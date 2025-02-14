'use client';
import Modal from '@/components/common/Modal';
import PlanSetting from '@/components/PlanSetting';
import { useGetProfile } from '@/lib/hooks/queries/useGetProfile';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const PlanSettingRouter = () => {
  const [settingModal, setSettingModal] = useState(false);
  const router = useRouter();
  const { data: users, isError } = useQuery(useGetProfile());
  const confirmOpenModal = () => {
    if (!users?.data || isError) {
      return router.push('/login');
    }
    // const data = localStorage.getItem('planData');
    // if (!!data) {
    //   const { planId } = JSON.parse(data);
    //   if (window.confirm('작성중인 계획이있습니다 이동하시겠습니까?')) {
    //     return router.push(`plan/${planId}/create`);
    //   } else {
    //     localStorage.removeItem('planData');
    //   }
    // }
    setSettingModal(true);
  };
  return (
    <>
      <span
        className="text-[2.4rem] text-white font-semibold cursor-pointer"
        onClick={confirmOpenModal}
      >
        내 여행 계획하기
      </span>
      {settingModal && (
        <Modal onClose={() => setSettingModal(!settingModal)}>
          <PlanSetting onClose={() => setSettingModal(!settingModal)} />
        </Modal>
      )}
    </>
  );
};

export default PlanSettingRouter;
