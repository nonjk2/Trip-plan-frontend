import React, { memo } from 'react';
import Message from './Message';
import Icons from '@/components/common/Icons';
import PlaceCard from './PlaceCard';
import { openModalType } from '../AICreateComponents';

const StreamMessageList = memo(
  ({
    messages,
    addOpenModal,
    addOpenModalHandler,
  }: {
    messages: MsgType;
    addOpenModal: openModalType;
    addOpenModalHandler: (data: PlanDetailType) => void;
  }) => {
    return messages.map((msg, idx) => {
      const AIMessage: boolean = msg.sender === 'ai';

      return (
        <div className="flex gap-[1.2rem]" key={msg.text + idx}>
          <div className="">
            <div className="relative w-[4.2rem] h-[4.2rem]">
              {AIMessage && <Icons.AIIcon />}
            </div>
          </div>
          <div className="flex flex-col w-full gap-[0.8rem]">
            {AIMessage && (
              <strong className="text-[1.4rem] leading-[1.82rem] font-normal select-none">
                마플 AI
              </strong>
            )}
            {AIMessage && msg.text.length === 0 ? (
              <>loading...</>
            ) : (
              <>
                <Message msg={msg} />
                {msg.tooloutPutData && (
                  <div className="flex flex-col gap-2 mt-2">
                    {msg.tooloutPutData.map((item) => {
                      if (!item.output.planData) {
                        return <></>;
                      }
                      return (
                        <PlaceCard
                          key={item.tool_call_id}
                          place={item}
                          addOpenModal={addOpenModal}
                          addOpenModalHandler={addOpenModalHandler}
                        />
                      );
                    })}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      );
    });
  }
);

StreamMessageList.displayName = 'stream-list';
export default StreamMessageList;
