interface ReviewTitleInputProps {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
}

const ReviewTitleInput = ({ title, setTitle }: ReviewTitleInputProps) => {
  return (
    <input
      type="text"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      className="w-full px-[2.4rem] py-[2rem] bg-[#F7F7F7] text-[2rem] leading-[2.6rem] rounded-xl placeholder:text-[#939393] focus:outline-none"
      placeholder="제목을 입력해주세요"
    />
  );
};

export default ReviewTitleInput;
