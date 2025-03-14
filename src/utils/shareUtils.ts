import toast from 'react-hot-toast';

const shareButtonClickHandler = () => {
  const url = window.location.href;
  navigator.clipboard
    .writeText(url)
    .then(() => {
      toast.success('URL이 복사되었습니다.');
    })
    .catch((err) => {
      toast.error('URL 복사 실패');
      console.error(err);
    });
};

export default shareButtonClickHandler;
