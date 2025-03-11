import React, { useState } from 'react';

import RegionSelector from './plan-setting-step-tab/plan-setting-tab-select/RegionSelector';
import DetailedSelector from './plan-setting-step-tab/plan-setting-tab-select/DetailedSelector';
import DetailSearchLocation from './plan-setting-step-tab/plan-setting-tab-search/DetailSearchLocation';
import cs from 'classnames';
import BackButton from '../auth/login/BackButton';
import RegionFilterDetailSearch from '../search/RegionFilterDetailSearch';

type StepType = {
  isFilterType?: boolean;
  title: string;
  onClose?: () => void;
};

const RegionSelectStep = ({
  isFilterType = false,
  title,
  onClose,
}: StepType) => {
  const [activeTab, setActiveTab] = useState<'renderStep' | 'searchTab'>(
    'renderStep'
  );

  const onChangeTabState = (NewTab: 'renderStep' | 'searchTab') => {
    if (activeTab !== NewTab) {
      return setActiveTab(NewTab);
    }

    return;
  };
  return (
    <div className="flex flex-col h-full justify-between gap-[2rem] relative">
      <div>
        {/* 제목탭 */}
        <div className={cs({ 'mt-[4rem]': !isFilterType })}>
          <div className="flex justify-between items-center">
            <span className="leading-[4.2rem] text-[2.8rem] font-bold">
              {title}
            </span>
            {isFilterType && <BackButton onClose={onClose} />}
          </div>
          <div className="relative h-[3.6rem] w-[24rem]">
            <div className="flex mt-[2.8rem] h-[3rem] justify-between">
              <button
                onClick={
                  isFilterType
                    ? () => onChangeTabState('renderStep')
                    : () => onChangeTabState('renderStep')
                }
                className={`${
                  activeTab === 'renderStep'
                    ? 'text-var-primary-500'
                    : 'text-var-enable'
                } btn-tab`}
              >
                지역선택
              </button>
              <button
                onClick={() => onChangeTabState('searchTab')}
                className={`${
                  activeTab === 'searchTab'
                    ? 'text-var-primary-500'
                    : 'text-var-enable'
                } btn-tab`}
              >
                직접선택
              </button>
              <div
                className={`absolute bottom-0 border-b-2 border-b-var-primary-500 w-[10rem] transition-transform duration-300 ${
                  activeTab === 'renderStep'
                    ? 'translate-x-0'
                    : 'translate-x-[14rem]'
                }`}
              />
            </div>
          </div>
        </div>

        {/* 랜더 */}
        <div className="mt-[2rem]">
          {activeTab === 'renderStep' ? (
            <div className="max-h-[50rem] overflow-auto">
              <RegionSelector isFilterType={isFilterType} />
              <DetailedSelector isFilterType={isFilterType} />
            </div>
          ) : (
            <>
              {isFilterType ? (
                <RegionFilterDetailSearch />
              ) : (
                <DetailSearchLocation />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegionSelectStep;
