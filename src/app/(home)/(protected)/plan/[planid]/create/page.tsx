import InnerLayout from '@/components/layout/InnerLayout';
import AICreates from '@/components/plan/plan-create/AICreates';
import PlanDayCreates from '@/components/plan/plan-create/PlanDayCreates';
import PlanDetails from '@/components/plan/plan-create/PlanDetails';
import { PlanProvider } from '@/providers/contexts/PlanContext';

import { redirect } from 'next/navigation';
import React from 'react';

const PlanPage = async ({
  params,
}: {
  params: Promise<{ planid: string }>;
}) => {
  const { planid } = await params;

  if (!planid) {
    return redirect('/');
  }

  return (
    <PlanProvider>
      <div className="bg-var-enable-bg">
        <InnerLayout className="min-h-screen">
          <section className="relative w-full bg-var-enable-bg flex justify-center py-[2rem]">
            <div className="flex w-[127.9rem] h-[39.8rem] rounded-[2rem] p-[4rem] bg-white">
              <PlanDetails />
            </div>
          </section>
          <section className="relative w-full bg-var-enable-bg flex justify-center">
            <div className="flex w-[127.9rem] rounded-[2rem] p-[4rem] bg-white">
              <PlanDayCreates />
            </div>
          </section>
        </InnerLayout>
      </div>
      <AICreates />
    </PlanProvider>
  );
};

export default PlanPage;
