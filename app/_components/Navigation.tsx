import { UserIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function Navigation({
  handleToggle,
}: {
  handleToggle: () => void;
}) {
  return (
    <nav className="z-10 text-xl font-josefin">
      <ul className="flex flex-col md:flex-row gap-8 md:gap-16 items-center">
        {/* MỤC HOME MỚI THÊM */}
        <li>
          <Link
            onClick={handleToggle}
            href="/"
            className="hover:text-accent-400 transition-colors text-black md:text-primary-100 font-medium tracking-wide"
          >
            Home
          </Link>
        </li>

        {/* MỤC MENU (Đổi từ Cabins sang Menu cho thanh thoát) */}
        <li>
          <Link
            onClick={handleToggle}
            href="/menu"
            className="hover:text-accent-400 transition-colors text-black md:text-primary-100 font-medium tracking-wide"
          >
            Menu
          </Link>
        </li>

        <li>
          <Link
            onClick={handleToggle}
            href="/about"
            className="hover:text-accent-400 transition-colors text-black md:text-primary-100 font-medium tracking-wide"
          >
            About
          </Link>
        </li>

        <li>
          {/* Giả lập session chưa đăng nhập để hiện Guest area */}
          {false ? (
            <Link
              onClick={handleToggle}
              href="/account"
              className="hover:text-accent-400 transition-colors text-black md:text-primary-100 flex items-center gap-4"
            >
              <span>Account</span>
            </Link>
          ) : (
            <div className="flex items-center gap-2 group">
              <Link
                onClick={handleToggle}
                href="/login"
                className="hover:text-accent-400 transition-colors text-black md:text-primary-100 font-medium tracking-wide"
              >
                Guest area
              </Link>
              {/* Icon User nhỏ xinh đi kèm */}
              <UserIcon className="h-5 w-5 text-primary-600 group-hover:text-accent-400 transition-colors" />
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
}
