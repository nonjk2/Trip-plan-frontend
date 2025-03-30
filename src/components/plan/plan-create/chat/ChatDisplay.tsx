import Icons from '@/components/common/Icons';
import StreamMessageList from './StreamMesssageList';
import Message from './Message';
import { RefObject } from 'react';
import { BounceLoader } from 'react-spinners';
import { openModalType } from '../AICreateComponents';
interface ChatDisplayProps {
  messages: MsgType;
  streamingMessage: string;
  isStreaming: boolean;
  messagesEndRef: RefObject<HTMLDivElement | null>;
  addOpenModal: openModalType;
  addOpenModalHandler: (data: PlanDetailType) => void;
}
const ChatDisplay = ({
  messages,
  streamingMessage,
  isStreaming,
  messagesEndRef,
  addOpenModal,
  addOpenModalHandler,
}: ChatDisplayProps) => (
  <div
    className="flex-1 overflow-y-auto space-y-[1.6rem] px-[2.4rem] pb-[1.2rem]"
    ref={messagesEndRef}
  >
    <StreamMessageList
      messages={messages}
      addOpenModal={addOpenModal}
      addOpenModalHandler={addOpenModalHandler}
    />
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
            <BounceLoader color="#1C68FF" />
          ) : (
            <>
              <Message msg={{ sender: 'ai', text: streamingMessage }} />
            </>
          )}
        </div>
      </div>
    )}
  </div>
);

export default ChatDisplay;
//   <div className="flex flex-col h-full">
//     <div className="flex-1 overflow-y-auto space-y-[1.6rem] px-[2.4rem]">
//       <StreamMessageList messages={messages} />

// {isStreaming && (
//   <div className="flex gap-[1.2rem]">
//     <div className="">
//       <div className="relative w-[4.2rem] h-[4.2rem]">
//         <Icons.AIIcon />
//       </div>
//     </div>
//     <div className="flex flex-col w-full gap-[0.8rem]">
//       <strong className="text-[1.4rem] leading-[1.82rem] font-normal select-none">
//         마플 AI
//       </strong>

//       {streamingMessage.length === 0 ? (
//         <>loading...</>
//       ) : (
//         <>
//           <Message msg={{ sender: 'ai', text: streamingMessage }} />
//         </>
//       )}
//     </div>
//   </div>
// )}
//       <div ref={messagesEndRef} />
//     </div>
