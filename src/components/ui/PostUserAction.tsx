import Image from 'next/image';
import { JSX } from 'react';
import cs from 'classnames';
import { ICONS } from '@/constants/importImages';

interface PostUserActionProps {
  pageType: 'plan' | 'review';
  renderOptions: {
    key: string;
    clickHandler: () => void;
    isLiked: boolean;
    isRender: boolean;
    icon?: JSX.Element;
    image?: {
      src: string;
      alt: string;
    };
  }[];
}

const PostUserAction = ({ pageType, renderOptions }: PostUserActionProps) => {
  const styleSet = {
    plan: {
      text: 'text-[2rem] font-semibold leading-[2.387rem]',
      imgSize: 36,
    },
    review: {
      text: 'text-[1.8rem] font-medium leading-[2.34rem]',
      imgSize: 28,
    },
  };

  return (
    <>
      <div className="flex gap-[3.6rem]">
        {renderOptions.map((option) => {
          return (
            option.isRender && (
              <button
                type="button"
                key={option.key}
                className={cs('flex items-center', {
                  'text-var-primary-500': option.isLiked,
                  'gap-[1.6rem]': pageType === 'plan',
                  'gap-[0.8rem]': pageType === 'review',
                })}
                onClick={option.clickHandler}
              >
                {option.icon ? (
                  option.icon
                ) : option.image ? (
                  <Image
                    src={option.image.src}
                    alt={option.image.alt}
                    width={styleSet[pageType].imgSize}
                    height={styleSet[pageType].imgSize}
                  />
                ) : null}
                <span className={styleSet[pageType].text}>{option.key}</span>
              </button>
            )
          );
        })}
      </div>
      {pageType === 'plan' && (
        <button
          type="button"
          className="flex items-center gap-[1.6rem]"
          onClick={() => console.log('신고하기 클릭')}
        >
          <Image
            src={ICONS.iconSiren.src}
            alt={ICONS.iconSiren.alt}
            width={36}
            height={36}
          />
          <span className="text-[2rem] font-semibold leading-[2.387rem]">
            신고하기
          </span>
        </button>
      )}
    </>
  );
};

export default PostUserAction;
