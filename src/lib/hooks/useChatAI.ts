import { useState } from 'react';

interface UseAIChatProps {
  planData: PlanDataType;
  setPlanData: (data: PlanDataType) => void;
  threadId: string | null;
  setThreadId: (id: string | null) => void;
}

export const useAIChat = ({
  planData,
  setPlanData,
  threadId,
  setThreadId,
}: UseAIChatProps) => {
  const [messages, setMessages] = useState<MsgType>([]);
  const [streamingMessage, setStreamingMessage] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (message?: string, isUserInput = true) => {
    setIsLoading(true);
    const userMessage = message;
    if (!userMessage) return;

    if (isUserInput) {
      setMessages((prev) => [...prev, { sender: 'user', text: userMessage }]);
      //   setInput('');
    }

    const response = await fetch(`/api/ai-create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage, planData, threadId }),
    });

    if (!response.ok) {
      return;
    }

    const reader = response.body?.getReader();
    if (!reader) return;

    const decoder = new TextDecoder();
    let newAiMessage = '';
    let toolOutputData: toolOutputData[] | null = null;
    while (true) {
      const { value, done } = await reader.read();
      setIsStreaming(true);
      if (done) break;

      const chunk = decoder.decode(value);

      // 끝
      if (chunk === '[DONE]') {
        if (newAiMessage) {
          setMessages((prev) => [
            ...prev,
            {
              sender: 'ai',
              text: newAiMessage,
              tooloutPutData: toolOutputData ?? undefined,
            },
          ]);
          setStreamingMessage('');
        }
        setIsStreaming(false);
        setIsLoading(false);

        break;
      }

      // 메세지 출력데이터
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

      // 함수생성 아웃풋
      if (chunk.startsWith('[TOOL_OUTPUT]')) {
        const toolOutputStr = chunk.replace('[TOOL_OUTPUT]', '').trim();
        try {
          const toolOutput: { tool_call_id: string; output: string }[] =
            JSON.parse(toolOutputStr);
          const output: toolOutputData[] = toolOutput.map((e) => {
            const outputReturnValue: outPutReturnVal = JSON.parse(e.output);
            return {
              tool_call_id: e.tool_call_id,
              output: outputReturnValue,
            };
          });
          console.log(output);
          toolOutputData = output;
        } catch (e) {
          console.error('TOOL_OUTPUT JSON 파싱 오류:', e);
        }
        continue;
      }

      // 쓰레드 id
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

  return {
    messages,
    streamingMessage,
    isStreaming,
    isLoading,
    handleSendMessage,
  };
};

// const handleSendMessage = async (message?: string, isUserInput = true) => {
//   setIsLoading(true);
//   const userMessage = message || input.trim();
//   if (!userMessage) return;

//   if (isUserInput) {
//     setMessages((prev) => [...prev, { sender: 'user', text: userMessage }]);
//     setInput('');
//   }

//   const response = await fetch(`/api/ai-create`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ message: userMessage, planData, threadId }),
//   });

//   if (!response.ok) {
//     return;
//   }

//   const reader = response.body?.getReader();
//   if (!reader) return;

//   const decoder = new TextDecoder();
//   let newAiMessage = '';
//   let toolOutputData: toolOutputData[] | null = null;
//   while (true) {
//     const { value, done } = await reader.read();
//     setIsStreaming(true);
//     if (done) break;

//     const chunk = decoder.decode(value);

//     // 끝
//     if (chunk === '[DONE]') {
//       if (newAiMessage) {
//         setMessages((prev) => [
//           ...prev,
//           {
//             sender: 'ai',
//             text: newAiMessage,
//             tooloutPutData: toolOutputData ?? undefined,
//           },
//         ]);
//         setStreamingMessage('');
//       }
//       setIsStreaming(false);
//       setIsLoading(false);

//       break;
//     }

//     // 메세지 출력데이터
//     if (chunk.startsWith('[DATA]')) {
//       const dataStr = chunk.replace('[DATA]', '').trim();
//       try {
//         const jsonData = JSON.parse(dataStr);
//         const data: parsingData = JSON.parse(jsonData);
//         setPlanData(data.planData);
//       } catch (e) {
//         console.error('JSON 파싱 오류:', e);
//       }
//       continue;
//     }

//     // 함수생성 아웃풋
//     if (chunk.startsWith('[TOOL_OUTPUT]')) {
//       const toolOutputStr = chunk.replace('[TOOL_OUTPUT]', '').trim();
//       try {
//         const toolOutput: { tool_call_id: string; output: string }[] =
//           JSON.parse(toolOutputStr);
//         const output: toolOutputData[] = toolOutput.map((e) => {
//           const outputReturnValue: outPutReturnVal = JSON.parse(e.output);
//           return {
//             tool_call_id: e.tool_call_id,
//             output: outputReturnValue,
//           };
//         });
//         console.log(output);
//         toolOutputData = output;
//       } catch (e) {
//         console.error('TOOL_OUTPUT JSON 파싱 오류:', e);
//       }
//       continue;
//     }

//     // 쓰레드 id
//     if (chunk.startsWith('[THREAD_ID]')) {
//       const newThreadId = chunk.replace('[THREAD_ID]', '').trim();
//       setThreadId(newThreadId);
//       const storedData = localStorage.getItem('plan');
//       if (!storedData) return null;
//       const parsedData: LocalPlanDataType = JSON.parse(storedData);

//       localStorage.setItem(
//         'plan',
//         JSON.stringify({ ...parsedData, threadId: newThreadId })
//       );
//       continue;
//     }

//     newAiMessage += chunk;
//     setStreamingMessage(newAiMessage);
//   }
// };
