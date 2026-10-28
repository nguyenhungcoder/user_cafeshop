"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function updateGuest(formData: FormData) {
  console.log("🚀 [Server Action] Bắt đầu chạy hàm updateGuest...");

  // Lấy session hiện tại của người dùng
  const session = await getServerSession(authOptions);
  console.log("👤 Session lấy được - Email: ", session?.user?.email);

  if (!session || !session.user) {
    console.log("❌ LỖI: Không tìm thấy Session!");
    throw new Error("Bạn phải đăng nhập để thực hiện hành động này");
  }

  // 1. Lấy dữ liệu từ các ô Input của Form
  const phoneNumber = formData.get("phoneNumber");
  const address = formData.get("address");

  // 2. Chuẩn bị dữ liệu gửi sang Quarkus (Đã sửa phoneNumber thành phone)
  const updateData = {
    email: session.user.email,
    phone: phoneNumber, // ✅ Đã sửa thành 'phone' để trùng khớp 100% với GuestDTO ở Backend
    address: address,
    fullName: session.user.name,
  };

  console.log("📦 Payload chuẩn bị gửi sang Quarkus: ", updateData);

  try {
    // 3. Gọi API sang Quarkus (Cổng 8081)
    const res = await fetch(`http://localhost:8081/api/users/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateData),
    });

    console.log("🌐 Trạng thái phản hồi từ Quarkus: HTTP " + res.status);

    if (!res.ok) {
      // Đọc thông báo lỗi dạng JSON hoặc Text từ Quarkus trả về
      const errorData = await res.json().catch(() => null);
      const serverErrorMessage =
        errorData?.message || "Không thể cập nhật thông tin";

      console.error(
        "❌ Quarkus từ chối cập nhật. Chi tiết:",
        errorData || res.statusText,
      );

      // Quăng chính xác thông báo lỗi từ server để hiển thị lên giao diện
      throw new Error(serverErrorMessage);
    }

    console.log("✅ Cập nhật thành công, đang revalidate cache...");
    // Làm tươi lại cache của trang profile để hiển thị dữ liệu mới ngay lập tức
    revalidatePath("/account/profile");

    return { success: true };
  } catch (error: any) {
    console.error("❌ Lỗi CATCH khi fetch tới Quarkus:", error);
    // ✅ CẢI TIẾN: Nếu là lỗi do chính mình quăng ra ở block "if (!res.ok)" thì giữ nguyên, ngược lại mới báo bảo trì
    throw new Error(
      error.message || "Hệ thống đang bảo trì, vui lòng thử lại sau.",
    );
  }
}
