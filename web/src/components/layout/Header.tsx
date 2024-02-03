import DesktopNav from "./DesktopNav";
import Logo from "./Logo";
import MobileNav from "./MobileNav";

export default function Header() {
  return (
    <header id="header">
      <nav className="flex flex-wrap items-center justify-between bg-teal-500 p-6">
        <Logo />
        <MobileNav />
        <DesktopNav />
      </nav>
    </header>
  );
}
