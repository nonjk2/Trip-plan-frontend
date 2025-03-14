export default function Dibs({ isLiked }: { isLiked: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="36"
      fill={isLiked ? '#1C68FF' : 'white'}
    >
      <path
        stroke={isLiked ? '' : 'black'}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M7.5 31.5v-24a3 3 0 0 1 3-3h15a3 3 0 0 1 3 3v24l-8.877-5.707a3 3 0 0 0-3.246 0L7.5 31.5Z"
      />
    </svg>
  );
}
