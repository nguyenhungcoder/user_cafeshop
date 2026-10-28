import SideNavigation from "@/app/_components/SideNavigation";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // THÊM: max-w-7xl (giới hạn độ rộng), mx-auto (căn giữa tự động), px-8 (tạo lề 2 bên)
    <div className="flex h-full gap-12 max-w-7xl mx-auto px-8 py-12">
      {/* CỘT TRÁI (Sidebar) */}
      <div className="w-64 shrink-0">
        <SideNavigation />
      </div>

      {/* CỘT PHẢI (Nội dung) */}
      <div className="flex-1 py-1">{children}</div>
    </div>
  );
}
