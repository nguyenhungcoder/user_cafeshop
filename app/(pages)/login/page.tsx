"use client";

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";

export default function LoginPage() {
  const { status } = useSession();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Tự động chuyển hướng nếu đã đăng nhập
  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/account/");
    }
  }, [status, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        toast.error("Email hoặc mật khẩu không chính xác!");
      } else {
        toast.success("Đăng nhập thành công!");
        router.push("/account");
        router.refresh();
      }
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      toast.error("Có lỗi hệ thống, vui lòng thử lại sau.");
    } finally {
      // Đảm bảo luôn tắt trạng thái loading dù thành công hay thất bại
      setIsSubmitting(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex-1 flex items-center justify-center bg-primary-950 min-h-[80vh]">
        <p className="text-primary-200 text-xl tracking-[0.2em] uppercase animate-pulse">
          Đang kiểm tra...
        </p>
      </div>
    );
  }

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
              Đăng nhập
            </h1>
            <p className="text-primary-400 text-base">
              Chào mừng bạn đến với{" "}
              <span className="text-accent-400">The Coffee Shop</span>
            </p>
          </div>

          {/* CARD CONTAINER */}
          <div className="bg-primary-900/20 backdrop-blur-xl p-8 md:p-10 shadow-2xl border border-primary-800/50 rounded-[2.5rem]">
            <form className="space-y-6" onSubmit={handleLogin}>
              {/* EMAIL */}
              <div className="space-y-2 mb-3">
                <label
                  htmlFor="email"
                  className="block text-xs uppercase tracking-widest font-bold text-primary-500 ml-1 cursor-pointer"
                >
                  Email
                </label>
                <div className="relative flex items-center">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <EnvelopeIcon className="h-5 w-5 text-primary-500" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    required
                    className="px-2 block w-full pl-10 pr-4 py-4 bg-primary-950/60 border border-primary-800 rounded-2xl text-primary-50 placeholder-primary-800 focus:outline-none focus:ring-2 focus:ring-accent-500/40 transition-all text-base"
                    placeholder="khanhhung@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* MẬT KHẨU */}
              <div className="space-y-2 mb-3">
                <label
                  htmlFor="password"
                  className="block text-xs uppercase tracking-widest font-bold text-primary-500 ml-1 cursor-pointer"
                >
                  Mật khẩu
                </label>
                <div className="relative flex items-center">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <LockClosedIcon className="h-5 w-5 text-primary-500" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    required
                    className="block w-full pl-10 pr-4 py-4 px-2 bg-primary-950/60 border border-primary-800 rounded-2xl text-primary-50 placeholder-primary-800 focus:outline-none focus:ring-2 focus:ring-accent-500/40 transition-all text-base"
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
                  className="w-full py-4 rounded-2xl text-base font-bold text-primary-950 bg-accent-500 hover:bg-accent-400 active:scale-[0.97] transition-all tracking-widest uppercase shadow-lg shadow-accent-900/20 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Đang xử lý..." : "Đăng nhập ngay"}
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

            {/* ĐĂNG NHẬP GOOGLE */}
            <button
              type="button"
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
              Continue with Google
            </button>

            {/* 👇 ĐÃ CHỈNH SỬA: Tách Đăng ký và Quên mật khẩu ra cho đẹp */}
            <div className="mt-8 flex flex-col items-center space-y-4 text-sm font-medium">
              <p className="text-primary-500">
                Chưa có tài khoản?{" "}
                <Link
                  href="/register"
                  className="text-accent-500 font-bold hover:underline ml-1"
                >
                  Đăng ký ngay
                </Link>
              </p>

              <Link
                href="/forgetpassword"
                className="text-primary-400 hover:text-accent-400 transition-colors underline-offset-4 hover:underline"
              >
                Bạn quên mật khẩu?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
