import Link from 'next/link';
import LogoWithText from './LogoWithText';
import PlanSettingRouter from './header/PlanSettingRouter';
import AuthProfile from './header/AuthProfile';

const Header = () => {
  return (
    <header className="w-full bg-var-primary-500">
      <div className="flex justify-between max-w-[132.8rem] w-full mx-auto items-center py-[3.2rem] px-[2.4rem]">
        <div className="flex items-center gap-[6rem]">
          <Link href="/">
            <LogoWithText />
          </Link>
          <nav className="flex gap-[6rem]">
            <Link
              href="/search"
              className="text-[2.4rem] text-white font-semibold"
            >
              여행 일정
            </Link>
            <PlanSettingRouter />
            <Link
              href="/review/create"
              className="text-[2.4rem] text-white font-semibold"
            >
              여행 후기
            </Link>
          </nav>
        </div>

        <AuthProfile />
      </div>
    </header>
  );
};

export default Header;
