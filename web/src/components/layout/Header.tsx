import Nav from "./Nav";
import Logo from "./Logo";

export default function Header() {
  return (
    <header id="header" className="sticky top-0">
      <nav className="flex flex-wrap items-center justify-between bg-teal-500 p-6 ">
        <Logo />
        <Nav />
      </nav>
    </header>
  );
}
