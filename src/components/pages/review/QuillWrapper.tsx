import Spinner from '@/components/common/Spinner';
import dynamic from 'next/dynamic';
import { ComponentProps } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

interface ForwardedQuillComponent extends ComponentProps<typeof ReactQuill> {
  forwardedRef: React.Ref<ReactQuill>;
}

const QuillWrapper = dynamic(
  async () => {
    const { default: QuillComponent } = await import('react-quill-new');
    const { ImageResize } = await import('quill-image-resize-module-ts');
    QuillComponent.Quill.register('modules/ImageResize', ImageResize);

    const modules = {
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'blockquote', 'underline'],
          [{ color: [] }, { background: [] }],
          [{ align: [] }],
          ['link', 'image'],
        ],
      },
      ImageResize: {
        modules: ['Resize', 'DisplaySize'],
      },
    };

    const Quill = ({ forwardedRef, ...props }: ForwardedQuillComponent) => (
      <QuillComponent ref={forwardedRef} {...props} modules={modules} />
    );
    return Quill;
  },
  {
    loading: () => (
      <div className="mt-[20rem]">
        <Spinner isPageLoading={false} />
      </div>
    ),
    ssr: false,
  }
);

export default QuillWrapper;
