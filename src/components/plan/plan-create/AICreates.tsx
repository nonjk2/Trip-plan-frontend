'use client';

import { useState } from 'react';
import Icons from '@/components/common/Icons';
import dynamic from 'next/dynamic';
const DynamicAICreateComponent = dynamic(() => import('./AICreateComponents'), {
  ssr: false,
});

const AICreates = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isBoardOpen, setIsBoardOpen] = useState(true);
  const openAICreateComponent = () => {
    setIsBoardOpen(false);
    setIsOpen(true);
  };
  return (
    <>
      {/* AI 버튼 */}
      <section className="fixed bottom-[3.6rem] right-[3.6rem] flex flex-col space-y-[1.2rem]">
        {isBoardOpen && (
          <div className="w-[27.3rem] h-[6.8rem] rounded-[1.2rem] py-[1.2rem] pr-[1.6rem] pl-[2rem] gap-[0.4rem] flex flex-col shadow-shadow-[0px_0px_20px_0px_#0000001A] bg-white">
            <div className="flex justify-between basic-text">
              <p>마플 AI에게 일정 추천받으세요</p>
              <div
                className="cursor-pointer"
                onClick={() => setIsBoardOpen(false)}
              >
                <Icons.Close.CloseIcon size={20} />
              </div>
            </div>
            <div
              className="basic-text opacity-30 font-normal cursor-pointer"
              onClick={openAICreateComponent}
            >
              대화 시작하기
            </div>
          </div>
        )}
        <div className="flex justify-end">
          <button
            onClick={openAICreateComponent}
            className="cursor-pointer transition-all z-50 hover:scale-110"
          >
            <Icons.AIIcon size={60} />
          </button>
        </div>
      </section>

      {/* AI 채팅창 */}
      <div
        className={`fixed bottom-[3.6rem] right-[3.6rem] w-[40rem] h-[80rem] bg-white shadow-xl rounded-[1.6rem] z-50 flex flex-col 
                    transition-all duration-300 ease-in-out transform 
                    ${
                      isOpen
                        ? 'opacity-100 scale-100'
                        : 'opacity-0 scale-75 pointer-events-none'
                    }`}
      >
        {/* 닫기 버튼 (기존 아이콘 유지) */}
        <div className="flex justify-between w-full h-[3.6rem] p-[2.4rem]">
          <h2 className="text-[2.4rem] font-semibold leading-[3.6rem]">대화</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <Icons.Close.CloseIcon size={24} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto pt-[3.2rem]">
          <DynamicAICreateComponent />
        </div>
      </div>
    </>
  );
};

export default AICreates;
