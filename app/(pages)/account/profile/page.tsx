// app/(pages)/account/profile/page.tsx
import UpdateProfileForm from "@/app/_components/UpdateProfileForm";

export const metadata = {
  title: "Update Profile",
};

export default function Page() {
  return (
    // Thêm max-w-4xl (hoặc 5xl) và mx-auto để đưa toàn bộ nội dung vào giữa
    // Thêm px-4 để khi thu nhỏ màn hình nó không bị chạm mép
    <div className="max-w-4xl mx-auto px-4 py-4">
      <h2 className="font-semibold text-3xl text-accent-400 mb-6">
        Update your guest profile
      </h2>

      <p className="text-lg mb-10 text-primary-200 leading-relaxed">
        Cung cấp thông tin địa chỉ và số điện thoại giúp chúng mình giao cà phê
        đến bạn nhanh nhất!
      </p>

      {/* Form này bây giờ sẽ nằm gọn ở giữa trang */}
      <UpdateProfileForm />
    </div>
  );
}
