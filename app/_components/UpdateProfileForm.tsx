"use client";

import { useSession } from "next-auth/react";
import { updateGuest } from "@/app/_lib/actions";
import toast from "react-hot-toast";
// 1. Import thêm useRouter và useSearchParams
import { useRouter, useSearchParams } from "next/navigation";

export default function UpdateProfileForm() {
  const { data: session, update } = useSession();

  // 2. Khởi tạo các hook điều hướng
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect"); // Lấy chữ "?redirect=..." trên URL

  async function handleSubmit(formData: FormData) {
    try {
      // 1. Gọi sang Quarkus để lưu Database (Phần này bạn đã làm cực chuẩn)
      await updateGuest(formData);

      const newPhone = formData.get("phoneNumber")?.toString() || "";
      const newAddress = formData.get("address")?.toString() || "";

      // 2. Bọc riêng hàm update của NextAuth vào một "lồng kính"
      // Nếu có lỗi nội bộ từ NextAuth thì nó không làm sập ứng dụng
      try {
        if (update) {
          await update({ phone: newPhone, address: newAddress });
        }
      } catch (sessionError) {
        console.warn(
          "NextAuth update bị lỗi nhẹ, nhưng không sao:",
          sessionError,
        );
      }

      // 3. Vượt qua an toàn, hiện thông báo cho người dùng
      toast.success("Cập nhật thông tin thành công!");

      // 4. CHUYỂN HƯỚNG CỨNG (Hard Redirect)
      if (redirectUrl) {
        setTimeout(() => {
          // Dùng window.location.href để ép trình duyệt tải lại hoàn toàn.
          // Việc này sẽ ép Next.js đi xin lại Session mới nhất từ Server!
          window.location.href = redirectUrl;
        }, 800);
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi cập nhật!");
      // Bạn có thể nhấn F12 -> tab Console để xem lỗi nếu dòng này thực sự bị gọi
      console.error("Lỗi từ Server Action:", error);
    }
  }

  return (
    <form
      action={handleSubmit}
      className="bg-primary-900 py-8 px-12 text-lg flex flex-col gap-6 w-full"
    >
      <div className="space-y-2">
        <label className="text-primary-300 font-semibold">Full name</label>
        <input
          disabled
          defaultValue={session?.user?.name || ""}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <label className="text-primary-300 font-semibold">Email address</label>
        <input
          disabled
          defaultValue={session?.user?.email || ""}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <label className="text-primary-300 font-semibold">Phone number</label>
        <input
          name="phoneNumber"
          // Tự động điền số điện thoại cũ (nếu có)
          defaultValue={(session?.user as any)?.phone || ""}
          placeholder="Nhập số điện thoại liên lạc..."
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm outline-none focus:bg-primary-100 transition-all"
        />
      </div>

      <div className="space-y-2">
        <label className="text-primary-300 font-semibold">
          Shipping address
        </label>
        <input
          name="address"
          // Tự động điền địa chỉ cũ (nếu có)
          defaultValue={(session?.user as any)?.address || ""}
          placeholder="Số nhà, tên đường, phường/xã..."
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm outline-none focus:bg-primary-100 transition-all"
        />
      </div>

      <div className="flex justify-end items-center gap-6">
        <button className="bg-accent-500 px-8 py-4 text-primary-900 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300">
          Update profile
        </button>
      </div>
    </form>
  );
}
