import LayoutPostSubItems from '@/components/pages/my/LayoutPostSubItems';

interface MypagePostLayoutProps {
  children: React.ReactNode;
}

const MypagePostLayout = ({ children }: MypagePostLayoutProps) => {
  return (
    <div className="flex flex-col gap-[1.2rem]">
      <LayoutPostSubItems type="myPost" />
      {children}
    </div>
  );
};

export default MypagePostLayout;
