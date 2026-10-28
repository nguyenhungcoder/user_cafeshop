import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    // Mình giữ lại pb-10 để tạo lề dưới cùng cho trang web
    <footer className="bg-primary-950 pb-10 px-8 text-primary-200 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Background của khối này sáng hơn nền trang một chút để tạo điểm nhấn */}
        <div className="bg-[#18212f] rounded-lg p-10 grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 text-sm">
          {/* Cột 1: Logo & Social */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 text-accent-500 font-bold text-2xl tracking-widest">
              <div className="relative w-8 h-8 rounded-full overflow-hidden">
                <Image
                  src="/logo1.png"
                  alt="NLT Coffee Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <span>TCS</span>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4 items-center">
              <a href="#" className="hover:text-accent-400 transition-colors">
                <svg
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="#" className="hover:text-accent-400 transition-colors">
                <svg
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm3.98-10.822a1.424 1.424 0 100 2.848 1.424 1.424 0 000-2.848z" />
                </svg>
              </a>
              <a href="#" className="hover:text-accent-400 transition-colors">
                <svg
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                >
                  <path d="M19.05 10.632c-.066-4.524-3.755-8.156-8.293-8.156-4.582 0-8.297 3.715-8.297 8.297 0 4.12 3.018 7.541 6.966 8.19v-5.79h-2.1v-2.4h2.1v-1.826c0-2.078 1.268-3.213 3.123-3.213.888 0 1.651.066 1.874.096v2.172h-1.286c-1.008 0-1.203.479-1.203 1.182v1.589h2.392l-.312 2.4h-2.08v5.79c3.948-.649 6.966-4.07 6.966-8.19z" />
                </svg>
              </a>
            </div>

            <div>
              <button className="bg-primary-800 hover:bg-primary-700 px-4 py-1.5 rounded text-xs font-semibold transition-colors">
                VND
              </button>
            </div>

            <div className="flex gap-4 mt-auto pt-4 text-xs text-primary-400">
              <Link href="/privacy" className="hover:text-primary-100">
                Privacy
              </Link>
              <Link href="/legal" className="hover:text-primary-100">
                Legal Notice
              </Link>
            </div>
          </div>

          {/* Cột 2: Contact */}
          <div className="flex flex-col gap-4">
            <h3 className="text-primary-50 font-semibold text-lg">Contact</h3>
            <div className="space-y-2">
              <p>T: +84-24-3765-5121</p>
              <p>E: nguyenhungg2004@gmail.com</p>
              <p>F: +84-24-3765-5261</p>
            </div>
          </div>

          {/* Cột 3: Address */}
          <div className="flex flex-col gap-4">
            <h3 className="text-primary-50 font-semibold text-lg">
              Store Address
            </h3>
            <div className="space-y-2 leading-relaxed">
              <p>298 Đường Cầu Diễn</p>
              <p>Phường Minh Khai, Bắc Từ Liêm</p>
              <p>Hà Nội, Việt Nam</p>
            </div>
          </div>

          {/* Cột 4: Awards & Copyright */}
          <div className="flex flex-col gap-4 md:items-end">
            <div className="flex gap-4 items-center">
              <div className="text-center border border-primary-700 p-2 rounded">
                <p className="text-[10px] uppercase font-bold text-primary-50">
                  Tripadvisor
                </p>
                <p className="text-xs">Travelers' Choice</p>
              </div>
              <div className="text-center border border-primary-700 p-2 rounded">
                <p className="text-[10px] uppercase font-bold text-primary-50">
                  Cafe Award
                </p>
                <p className="text-xs">Excellence</p>
              </div>
            </div>

            <div className="flex gap-2 mt-2">
              <span className="bg-white text-black px-2 py-0.5 rounded text-[10px] font-bold">
                PayPal
              </span>
              <span className="bg-white text-[#1434CB] px-2 py-0.5 rounded text-[10px] font-bold italic">
                VISA
              </span>
              <span className="bg-white text-[#EB001B] px-2 py-0.5 rounded text-[10px] font-bold">
                Mastercard
              </span>
            </div>

            <div className="mt-auto pt-4 text-xs text-primary-400 text-right">
              Copyright © 2026 The Coffee Shop.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
