'use client';

import { useEffect, useRef, useState } from 'react';
import { usePlanContext } from '@/providers/contexts/PlanContext';
import Message from './chat/Message';
import StreamMessageList from './chat/StreamMesssageList';
import Icons from '@/components/common/Icons';

type MsgType = {
  sender: 'user' | 'ai';
  text: string;
}[];
type parsingData = {
  planData: PlanDataType;
};

const AICreateComponents = () => {
  const [messages, setMessages] = useState<MsgType>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { planData, setPlanData } = usePlanContext();
  const [streamingMessage, setStreamingMessage] = useState<string>(''); // ✅ 스트리밍 메시지
  const [isStreaming, setIsStreaming] = useState<boolean>(false); // ✅ 스트리밍 상태
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // ✅ 스크롤을 가장 아래로 이동하는 함수
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // ✅ 메시지가 추가될 때 자동으로 스크롤
  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingMessage]);

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

  const handleSendMessage = async (message?: string, isUserInput = true) => {
    setIsLoading(true);
    const userMessage = message || input.trim();
    if (!userMessage) return;

    if (isUserInput) {
      setMessages((prev) => [...prev, { sender: 'user', text: userMessage }]);
      setInput('');
    }

    const response = await fetch(`/api/ai-create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage, planData, threadId }),
    });

    const reader = response.body?.getReader();
    if (!reader) return;

    const decoder = new TextDecoder();
    let newAiMessage = '';
    while (true) {
      const { value, done } = await reader.read();
      setIsStreaming(true);
      if (done) break;

      const chunk = decoder.decode(value);

      if (chunk === '[DONE]') {
        if (newAiMessage) {
          setMessages((prev) => {
            const finalMessage = newAiMessage;
            setStreamingMessage('');
            return [...prev, { sender: 'ai', text: finalMessage }];
          });

          setIsStreaming(false);
        }
        setIsLoading(false);

        break;
      }
      if (chunk.startsWith('[DATA]')) {
        const dataStr = chunk.replace('[DATA]', '').trim();
        try {
          const jsonData = JSON.parse(dataStr);
          const data: parsingData = JSON.parse(jsonData);
          setPlanData(data.planData);
        } catch (e) {
          console.error('JSON 파싱 오류:', e);
        }
        continue;
      }
      if (chunk.startsWith('[TOOL_OUTPUT]')) {
        const toolOutputStr = chunk.replace('[TOOL_OUTPUT]', '').trim();
        try {
          const toolOutput = JSON.parse(toolOutputStr);
          console.log('🛠 툴 실행 결과:', toolOutput);
        } catch (e) {
          console.error('❌ TOOL_OUTPUT JSON 파싱 오류:', e);
        }
        continue;
      }

      if (chunk.startsWith('[THREAD_ID]')) {
        const newThreadId = chunk.replace('[THREAD_ID]', '').trim();
        setThreadId(newThreadId);
        const storedData = localStorage.getItem('plan');
        if (!storedData) return null;
        const parsedData: LocalPlanDataType = JSON.parse(storedData);

        localStorage.setItem(
          'plan',
          JSON.stringify({ ...parsedData, threadId: newThreadId })
        );
        continue;
      }

      newAiMessage += chunk;
      setStreamingMessage(newAiMessage);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto space-y-[1.6rem] px-[2.4rem]">
        <StreamMessageList messages={messages} />

        {isStreaming && (
          <div className="flex gap-[1.2rem]">
            <div className="">
              <div className="relative w-[4.2rem] h-[4.2rem]">
                <Icons.AIIcon />
              </div>
            </div>
            <div className="flex flex-col w-full gap-[0.8rem]">
              <strong className="text-[1.4rem] leading-[1.82rem] font-normal select-none">
                마플 AI
              </strong>

              {streamingMessage.length === 0 ? (
                <>loading...</>
              ) : (
                <Message msg={{ sender: 'ai', text: streamingMessage }} />
              )}
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="p-[2.4rem] flex shadow-[0px_0px_12px_0px_rgba(0,0,0,0.05)]"
      >
        <div className="flex w-full justify-between bg-[#F7F7F7] rounded-[0.8rem] pl-[2rem] pr-[1.6rem] py-[1.2rem]">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-2 rounded-lg bg-transparent placeholder:text-[1.4rem] placeholder:leading-[1.82rem] text-[1.4rem] leading-[1.82rem] focus:outline-none"
            placeholder="궁금하신 정보를 입력하세요"
            disabled={isLoading}
            autoFocus
          />
          <button type="submit" disabled={isLoading}>
            <Icons.SendMessage />
          </button>
        </div>
      </form>
    </div>
  );
};

export default AICreateComponents;
