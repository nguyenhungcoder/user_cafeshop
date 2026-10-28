import Link from "next/link";
import Image from "next/image";
import logo1 from "@/public/logo1.png";

function Logo({ handleToggle }: { handleToggle: () => void }) {
  return (
    <Link
      onClick={handleToggle}
      href="/"
      className="flex items-center gap-4 z-10 flex-col md:flex-row mb-2 md:mb-0"
    >
      <Image src={logo1} height="60" width="60" alt="Nghiêm Lập Trình logo" />
      <span className="text-xl font-semibold hover:text-accent-400 transition-colors text-black md:text-primary-100">
        The Coffee Shop
      </span>
    </Link>
  );
}

export default Logo;
