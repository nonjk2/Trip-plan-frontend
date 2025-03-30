/* eslint-disable react-hooks/exhaustive-deps */
import Button from '@/components/common/Button';
import Icons from '@/components/common/Icons';
import ChatInputDropdown from './ChatAddDropdown';
import { usePlanContext } from '@/providers/contexts/PlanContext';
import { FormEvent, useMemo, useState } from 'react';
import { openModalType } from '../AICreateComponents';

interface ChatInputBoxProps {
  onSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    input: string,
    callback: () => void
  ) => void;
  isLoading: boolean;
  addOpenModal: openModalType;
  addOpenModalHandler: (data: PlanDetailType | null) => void;
}
const AIInputForm = ({
  input,
  setInput,
  isLoading,
}: Pick<ChatInputBoxProps, 'isLoading'> & {
  input: string;
  setInput: (val: string) => void;
}) => (
  <div className="flex w-full justify-between bg-[#F7F7F7] rounded-[0.8rem] pl-[2rem] pr-[1.6rem] py-[1.2rem]">
    <input
      type="text"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      className="flex-1 p-2 rounded-lg bg-transparent placeholder:text-[1.4rem] placeholder:leading-[1.82rem] text-[1.4rem] leading-[1.82rem] focus:outline-none"
      placeholder="궁금하신 정보를 입력하세요"
      disabled={isLoading}
    />
    <button type="submit" disabled={isLoading}>
      <Icons.SendMessage />
    </button>
  </div>
);

const ChatInputBox = ({
  onSubmit,
  isLoading,
  addOpenModal,
  addOpenModalHandler,
}: ChatInputBoxProps) => {
  const { planData, setPlanData } = usePlanContext();
  const [select, setSelect] = useState(0);
  const [input, setInput] = useState('');

  const onSelect = (item: number) => {
    setSelect(item);
  };

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (addOpenModal.data !== null && addOpenModal.open) {
      return handleSetPlanData();
    }
    onSubmit(e, input, () => setInput(''));
  };
  const handleSetPlanData = () => {
    const { data } = addOpenModal;
    const updatedDays = planData.days.map((dayData) => {
      if (dayData.day === select) {
        return {
          ...dayData,
          detail: [
            ...dayData.detail,
            { ...data, order: dayData.detail.length + 1 },
          ],
        };
      }
      return dayData;
    });

    setPlanData({
      ...planData,
      days: updatedDays as PlanDayType[],
    });
    setSelect(0);
    addOpenModalHandler(null);
  };
  const dropdownList = useMemo(
    () => planData.days.map((_, i) => `${i + 1}일차`),
    [planData.days.length]
  );
  const AddPlanForm = () => (
    <div className="w-full flex flex-col justify-between h-full">
      <div>
        <div className="flex justify-between">
          <div className="ai-addText">내 일정에 추가하기</div>
          <Icons.Close.CloseIcon
            size={16}
            onClick={() => addOpenModalHandler(null)}
          />
        </div>
        <ChatInputDropdown
          list={dropdownList}
          title={select === 0 ? '일정' : `${select}일차`}
          onSelect={onSelect}
        />
      </div>
      <Button size="md" className="w-full h-[6.6rem]" btnColor="blue">
        추가
      </Button>
    </div>
  );

  return (
    <form
      onSubmit={onSubmitHandler}
      className={`p-[2.4rem] flex shadow-[0px_0px_12px_0px_rgba(0,0,0,0.05)] transition-all ${
        addOpenModal.open ? 'min-h-[20.8rem]' : 'min-h-[9.2rem]'
      }`}
    >
      {addOpenModal.open ? (
        <AddPlanForm />
      ) : (
        <AIInputForm
          input={input}
          setInput={(val: string) => setInput(val)}
          isLoading={isLoading}
        />
      )}
    </form>
  );
};

export default ChatInputBox;
