import { useRef } from 'react';
import QuillWrapper from './QuillWrapper';

interface ReviewTextEditorProps {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
}

const ReviewTextEditor = ({ content, setContent }: ReviewTextEditorProps) => {
  const quillInstance = useRef(null);

  return (
    <div className="mt-[3rem]">
      <QuillWrapper
        forwardedRef={quillInstance}
        value={content}
        onChange={setContent}
        theme="snow"
        style={{ width: '100%', height: '450px' }}
      />
    </div>
  );
};

export default ReviewTextEditor;
