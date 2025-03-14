import LayoutPostSubItems from '@/components/pages/my/LayoutPostSubItems';

interface MypageDibsLayoutProps {
  children: React.ReactNode;
}

const MypageDibsLayout = ({ children }: MypageDibsLayoutProps) => {
  return (
    <div className="flex flex-col gap-[1.2rem]">
      <LayoutPostSubItems type="dibs" />
      {children}
    </div>
  );
};

export default MypageDibsLayout;
