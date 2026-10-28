"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  CalendarDaysIcon, // Bạn có thể xóa icon này nếu không dùng đến nữa nhé
  UserIcon,
  ShoppingCartIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";
import SignOutButton from "./SignOutButton";

const navLinks = [
  {
    name: "Home",
    href: "/account",
    icon: <HomeIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Shopping Cart",
    href: "/account/cart",
    icon: <ShoppingCartIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Guest profile",
    href: "/account/profile",
    icon: <UserIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "My order",
    href: "/account/orders",
    icon: <ClipboardDocumentListIcon className="h-5 w-5 text-primary-600" />,
  },
];

export default function SideNavigation() {
  const pathname = usePathname();

  return (
    // Đã thêm pr-8 (khoảng trống bên phải) và đổi thành border-primary-800 (màu viền sáng hơn)
    <nav className="border-r border-primary-800 pr-8 h-full">
      <ul className="flex flex-col gap-2 h-full text-lg">
        {navLinks.map((link) => {
          // Kiểm tra xem link có đang được chọn hay không
          const isActive = pathname === link.href;
          return (
            <li key={link.name}>
              <Link
                href={link.href}
                className={`py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200 ${
                  isActive ? "bg-primary-900 text-primary-100" : ""
                }`}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            </li>
          );
        })}

        {/* Nút Sign out được ép xuống đáy nhờ class mt-auto */}
        <li className="mt-auto">
          <SignOutButton />
        </li>
      </ul>
    </nav>
  );
}
