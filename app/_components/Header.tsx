import NavToggle from "./NavToggle";

async function Header() {
  return (
    <header className="relative z-10 w-full p-2 md:px-8 md:py-6 bg-gradient-to-b from-black/80 via-black/40 to-transparent transition-all">
      <NavToggle />
    </header>
  );
}

export default Header;
