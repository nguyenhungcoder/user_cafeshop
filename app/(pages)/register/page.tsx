"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast"; // Thêm thư viện thông báo
import {
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

export default function RegisterPage() {
  const router = useRouter(); // Khởi tạo router để chuyển hướng
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Hàm xử lý khi submit form
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 🌟 THAY ĐỔI: Chuyển URL gọi sang trạm trung tâm /api/auth/register của bảng users gộp
      const response = await fetch(
        "http://localhost:8081/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName: name,
            email: email,
            password: password,
          }),
        },
      );

      if (response.ok) {
        // Nếu API trả về thành công (lưu bảng users xong)
        toast.success("Đăng ký thành công! Vui lòng đăng nhập.");
        router.push("/login"); // Chuyển hướng sang trang đăng nhập
      } else {
        // Xử lý khi lỗi (ví dụ: email đã tồn tại)
        const errorData = await response.json();
        toast.error(errorData.message || "Đăng ký thất bại, vui lòng thử lại!");
      }
    } catch (error) {
      console.error("Lỗi đăng ký:", error);
      toast.error("Không thể kết nối đến máy chủ.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="flex justify-center min-h-[80vh] bg-primary-950 px-4 py-20">
        <div
          style={{ width: "100%", maxWidth: "420px" }}
          className="animate-slide-up"
        >
          {/* TIÊU ĐỀ */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-extrabold text-accent-400 uppercase tracking-[0.2em] mb-3">
              Đăng ký
            </h1>
            <p className="text-primary-400 text-base">
              Gia nhập cùng{" "}
              <span className="text-accent-400">The Coffee Shop</span>
            </p>
          </div>

          {/* CARD CONTAINER */}
          <div className="bg-primary-900/20 backdrop-blur-xl p-8 md:p-10 shadow-2xl border border-primary-800/50 rounded-[2.5rem]">
            <form className="space-y-6" onSubmit={handleRegister}>
              {/* HỌ VÀ TÊN */}
              <div className="space-y-2 mb-3">
                <label className="block text-xs uppercase tracking-widest font-bold text-primary-500 ml-1">
                  Họ và Tên
                </label>
                <div className="relative flex items-center">
                  <UserIcon className="absolute left-5 w-6 h-6 text-primary-600 pointer-events-none" />
                  <input
                    type="text"
                    required
                    className="block w-full px-2 pl-14 pr-4 py-4 bg-primary-950/60 border border-primary-800 rounded-2xl text-primary-50 placeholder-primary-800 focus:outline-none focus:ring-2 focus:ring-accent-500/40 transition-all text-base"
                    placeholder="Nguyễn Văn A"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div className="space-y-2 mb-3">
                <label className="block text-xs uppercase tracking-widest font-bold text-primary-500 ml-1">
                  Email
                </label>
                <div className="relative flex items-center">
                  <EnvelopeIcon className="absolute left-5 w-6 h-6 text-primary-600 pointer-events-none" />
                  <input
                    type="type"
                    required
                    className="block w-full pl-14 px-2 pr-4 py-4 bg-primary-950/60 border border-primary-800 rounded-2xl text-primary-50 placeholder-primary-800 focus:outline-none focus:ring-2 focus:ring-accent-500/40 transition-all text-base"
                    placeholder="khanhhung@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* MẬT KHẨU */}
              <div className="space-y-2 mb-3">
                <label className="block text-xs uppercase tracking-widest font-bold text-primary-500 ml-1">
                  Mật khẩu
                </label>
                <div className="relative flex items-center">
                  <LockClosedIcon className="absolute left-5 w-6 h-6 text-primary-600 pointer-events-none" />
                  <input
                    type="password"
                    required
                    className="block w-full pl-14 px-2 pr-4 py-4 bg-primary-950/60 border border-primary-800 rounded-2xl text-primary-50 placeholder-primary-800 focus:outline-none focus:ring-2 focus:ring-accent-500/40 transition-all text-base"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex justify-center mt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-2xl text-base font-bold text-primary-950 bg-accent-500 hover:bg-accent-400 active:scale-[0.97] transition-all tracking-widest uppercase shadow-lg shadow-accent-900/20"
                >
                  {isSubmitting ? "Đang xử lý..." : "Tạo tài khoản"}
                </button>
              </div>
            </form>

            <div className="mt-4 mb-3 relative text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-primary-800/50"></div>
              </div>
              <span className="relative px-3 bg-[#0d141b] text-xs text-primary-600 font-bold uppercase tracking-widest">
                Hoặc
              </span>
            </div>

            {/* ĐĂNG KÝ GOOGLE */}
            <button
              onClick={() => signIn("google", { callbackUrl: "/account" })}
              className="w-full flex justify-center items-center py-4 border border-primary-800 rounded-2xl bg-primary-950/40 text-sm font-semibold text-primary-100 hover:bg-primary-800 transition-all active:scale-[0.97]"
            >
              <Image
                src="https://authjs.dev/img/providers/google.svg"
                alt="Google"
                height={18}
                width={18}
                className="mr-3"
              />
              Sign up with Google
            </button>

            <p className="mt-8 text-center text-sm text-primary-500 font-medium">
              Đã có tài khoản?{" "}
              <Link
                href="/login"
                className="text-accent-500 font-bold hover:underline ml-1"
              >
                Đăng nhập ngay
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}