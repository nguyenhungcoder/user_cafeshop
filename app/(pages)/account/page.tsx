import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
// 1. Thêm dòng import authOptions này
import { authOptions } from "@/lib/auth";

export const metadata = {
  title: "Guest area",
};

export default async function Page() {
  // 2. Bỏ authOptions vào trong ngoặc
  const session = await getServerSession(authOptions);

  console.log(session, "session");

  // 3. Bảo vệ trang: Nếu không có session (chưa đăng nhập), đẩy về trang login
  if (!session) {
    redirect("/login");
  }

  return (
    <h2 className="font-semibold text-2xl text-accent-400 mb-7">
      Welcome, {session?.user?.name}
    </h2>
  );
}
