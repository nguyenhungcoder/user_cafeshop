"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function ForgetPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Gọi API sang Quarkus để yêu cầu reset mật khẩu
      const res = await fetch(
        "http://localhost:8081/api/users/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        },
      );

      if (!res.ok) {
        const textData = await res.text();
        let errorMessage = "Không tìm thấy tài khoản!";
        try {
          const errorData = JSON.parse(textData);
          errorMessage = errorData.message || errorMessage;
        } catch (parseError) {
          console.error("Backend trả về không phải JSON:", textData);
        }
        throw new Error(errorMessage);
      }
      // Thông báo thành công và báo cho người dùng mật khẩu mới
      toast.success("Thành công! Mật khẩu mới của bạn là: 123456", {
        duration: 6000, // Hiển thị lâu hơn 1 chút (6 giây) để người dùng kịp đọc
      });
      setEmail(""); // Xóa rỗng ô nhập sau khi gửi thành công
    } catch (error: any) {
      toast.error(error.message || "Có lỗi xảy ra, vui lòng thử lại sau!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center min-h-[80vh] bg-primary-950 px-4 py-20">
      <div
        style={{ width: "100%", maxWidth: "420px" }}
        className="animate-slide-up"
      >
        {/* TIÊU ĐỀ */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-accent-400 uppercase tracking-[0.2em] mb-3">
            Quên Mật Khẩu
          </h1>
          <p className="text-primary-400 text-base px-4">
            Nhập email tài khoản của bạn. Hệ thống sẽ cấp lại mật khẩu mặc định
            cho bạn.
          </p>
        </div>

        {/* CARD CONTAINER */}
        <div className="bg-primary-900/20 backdrop-blur-xl p-8 md:p-10 shadow-2xl border border-primary-800/50 rounded-[2.5rem]">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* EMAIL INPUT */}
            <div className="space-y-2 mb-3">
              <label
                htmlFor="email"
                className="block text-xs uppercase tracking-widest font-bold text-primary-500 ml-1 cursor-pointer"
              >
                Email đăng ký
              </label>
              <div className="relative flex items-center">
                <input
                  id="email"
                  type="email"
                  required
                  className="px-2 block w-full pl-4 pr-4 py-4 bg-primary-950/60 border border-primary-800 rounded-2xl text-primary-50 placeholder-primary-800 focus:outline-none focus:ring-2 focus:ring-accent-500/40 transition-all text-base"
                  placeholder="khanhhung@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                disabled={isSubmitting || !email}
                className="w-full py-4 rounded-2xl text-base font-bold text-primary-950 bg-accent-500 hover:bg-accent-400 active:scale-[0.97] transition-all tracking-widest uppercase shadow-lg shadow-accent-900/20 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Đang xử lý..." : "Lấy lại mật khẩu"}
              </button>
            </div>
          </form>

          {/* QUAY VỀ TRANG ĐĂNG NHẬP */}
          <div className="mt-8 text-center text-sm font-medium">
            <Link
              href="/login"
              className="text-primary-400 hover:text-accent-500 transition-colors flex items-center justify-center gap-2"
            >
              <span>&larr;</span> Quay lại trang Đăng nhập
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
