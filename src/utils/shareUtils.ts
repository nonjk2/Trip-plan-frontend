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

/**
 * base64 문자열을 Blob 또는 File로 변환하는 함수
 * @param base64 - 이미지 base64 데이터 (순수한 데이터만, 앞에 data:image/png;base64, 없이)
 * @param filename - 저장할 파일 이름
 * @param mimeType - MIME 타입 (예: image/png)
 * @returns File 객체
 */
export const toFileFromBase64 = (
  base64: string,
  filename = 'image.png',
  mimeType = 'image/png'
): File => {
  const byteString = atob(base64); // base64 → 바이너리 문자열
  const byteArray = new Uint8Array(
    Array.from(byteString, (char) => char.charCodeAt(0))
  );

  const blob = new Blob([byteArray], { type: mimeType });

  return new File([blob], filename, { type: mimeType });
};
