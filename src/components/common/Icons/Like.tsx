export default function Like({ isLiked }: { isLiked: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="36"
      fill={isLiked ? '#1C68FF' : 'black'}
    >
      <path d="M25.5 6.75c-3.15 0-5.925 1.575-7.5 4.05-1.575-2.475-4.35-4.05-7.5-4.05-4.95 0-9 4.05-9 9 0 8.925 16.5 18 16.5 18s16.5-9 16.5-18c0-4.95-4.05-9-9-9Z" />
    </svg>
  );
}
