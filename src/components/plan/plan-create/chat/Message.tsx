type MsgType = {
  sender: 'user' | 'ai';
  text: string;
};
import Markdown from 'react-markdown';
const Message = ({ msg }: { msg: MsgType }) => {
  return (
    <div
      className={`flex w-full ${
        msg.sender === 'user'
          ? 'justify-end items-center'
          : 'justify-start items-end'
      }`}
    >
      <div
        className={`relative w-full p-[1.2rem] rounded-lg max-w-max text-[1.4rem] leading-[1.82rem] tracking-normal text-white ${
          msg.sender === 'user' ? 'bg-gray-300 text-black' : 'bg-blue-500'
        }`}
      >
        <Markdown>{msg.text}</Markdown>
      </div>
    </div>
  );
};

export default Message;
