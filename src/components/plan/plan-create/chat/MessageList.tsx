import { ReactNode } from 'react';

const MessageList = ({ children }: { children: ReactNode }) => {
  return <div className="flex-1 overflow-y-auto p-4 space-y-2">{children}</div>;
};

export default MessageList;
