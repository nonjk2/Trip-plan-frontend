'use client';

import { FormEvent, useRef, useState } from 'react';
import { usePlanContext } from '@/providers/contexts/PlanContext';
import { useAIChat } from '@/lib/hooks/useChatAI';
import useAutoScroll from '@/lib/hooks/useAutoScroll';
import ChatDisplay from './chat/ChatDisplay';
import ChatInputBox from './chat/ChatInputBox';

type openModalType = {
  open: boolean;
  data: PlanDetailType | null;
};

const AICreateComponents = () => {
  const { planData, setPlanData } = usePlanContext();
  const [addOpenModal, setOpenModal] = useState<openModalType>({
    open: false,
    data: null,
  });
  const [threadId, setThreadId] = useState<string | null>(() => {
    const storedData = localStorage.getItem('plan');
    if (!storedData) return null;
    const parsedData: LocalPlanDataType = JSON.parse(storedData);

    try {
      return parsedData.threadId ?? null;
    } catch (error) {
      console.error('Error parsing localStorage:', error);
      return null;
    }
  });
  const {
    messages,
    streamingMessage,
    isStreaming,
    isLoading,
    handleSendMessage,
  } = useAIChat({ planData, setPlanData, threadId, setThreadId });
  const addOpenModalHandler = (data?: PlanDetailType | null) => {
    if (addOpenModal.open === false && data) {
      return setOpenModal({ open: true, data });
    }
    console.log(data, addOpenModal.open);
    return setOpenModal({ open: false, data: null });
  };
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useAutoScroll([messages, streamingMessage], messagesEndRef);
  const onSubmitHandler = (
    e: FormEvent<HTMLFormElement>,
    input: string,
    callbackFn: () => void
  ) => {
    e.preventDefault();
    handleSendMessage(input);
    callbackFn();
  };
  return (
    <div className="flex flex-col h-full">
      <ChatDisplay
        messages={messages}
        messagesEndRef={messagesEndRef}
        streamingMessage={streamingMessage}
        isStreaming={isStreaming}
        addOpenModal={addOpenModal}
        addOpenModalHandler={addOpenModalHandler}
      />
      <ChatInputBox
        addOpenModal={addOpenModal}
        addOpenModalHandler={addOpenModalHandler}
        onSubmit={onSubmitHandler}
        isLoading={isLoading}
      />
    </div>
  );
};

export default AICreateComponents;
export type { openModalType };
