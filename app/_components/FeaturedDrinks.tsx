import Link from "next/link";
import { FireIcon, ScaleIcon } from "@heroicons/react/24/outline";

// 1. Hàm lấy dữ liệu trực tiếp từ Backend Quarkus
async function getFeaturedDrinks() {
  try {
    const res = await fetch("http://localhost:8081/api/products", {
      cache: "no-store", // Đảm bảo luôn lấy dữ liệu mới nhất
    });

    if (!res.ok) throw new Error("Không thể kết nối đến API");
    const data = await res.json();
    return data.slice(0, 3); // Lấy 3 sản phẩm đầu tiên
  } catch (error) {
    console.error("Lỗi Fetch Data:", error);
    return []; // Trả về mảng rỗng nếu lỗi
  }
}

// 2. Chuyển thành Server Component (thêm async)
export default async function FeaturedDrinks() {
  const drinks = await getFeaturedDrinks();

  return (
    <section className="py-24 max-w-7xl mx-auto px-8">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-primary-900 pb-4">
        <h2 className="text-3xl md:text-4xl text-primary-50 uppercase font-semibold tracking-widest">
          Thực đơn đặc trưng
        </h2>
        <Link
          href="/menu"
          className="mt-6 md:mt-0 border border-primary-600 px-6 py-2 text-sm uppercase tracking-widest text-primary-100 hover:bg-primary-900 transition-colors"
        >
          Tất cả sản phẩm
        </Link>
      </div>

      {/* Thông báo nếu chưa có dữ liệu */}
      {drinks.length === 0 && (
        <p className="text-primary-200 text-center text-lg">
          Đang cập nhật thực đơn...
        </p>
      )}

      {/* GRID SẢN PHẨM */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {drinks.map((drink: any) => (
          // Thêm class group để làm hiệu ứng hover ảnh
          <div key={drink.id} className="flex flex-col bg-transparent group">
            {/* VỊ TRÍ 1: Đổi thẻ div bọc ảnh thành thẻ Link */}
            <Link
              href={`/menu/${drink.id}`}
              className="relative h-72 w-full mb-6 overflow-hidden block"
            >
              <img
                src={`http://localhost:8081/uploads/${drink.image_url}`}
                alt={drink.name}
                // Thêm group-hover:scale-105 để ảnh zoom nhẹ khi trỏ chuột
                className="object-contain w-full h-full bg-white transition-transform duration-500 group-hover:scale-105 p-2"
              />
            </Link>

            {/* Thông tin chính */}
            <h3 className="text-xl md:text-2xl text-primary-50 font-semibold mb-3 uppercase tracking-wider truncate">
              {drink.name}
            </h3>

            {/* Meta info (Lấy roast và weight từ Database) */}
            <div className="flex gap-6 text-sm text-primary-300 mb-4 font-light">
              <div className="flex items-center gap-1.5">
                <FireIcon className="h-4 w-4" />
                <span>{drink.roast || "Rang Đậm"}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ScaleIcon className="h-4 w-4" />
                <span>{drink.weight || "Túi 500g"}</span>
              </div>
            </div>

            {/* VỊ TRÍ 2: Link Xem chi tiết nhỏ (Đã chuẩn) */}
            <Link
              href={`/menu/${drink.id}`}
              className="text-xs font-semibold uppercase tracking-widest text-primary-200 hover:text-accent-400 transition-colors mb-6 block"
            >
              XEM CHI TIẾT
            </Link>

            {/* Footer của Card (Giá + Nút mua) */}
            <div className="mt-auto pt-4 border-t border-primary-800 flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-[10px] text-primary-400 mb-1">
                  Chỉ từ
                </span>
                <div className="text-lg text-primary-50 font-semibold">
                  {drink.price ? drink.price.toLocaleString("vi-VN") : "0"}đ{" "}
                  <span className="text-xs text-primary-400 font-normal">
                    / túi
                  </span>
                </div>
              </div>

              {/* VỊ TRÍ 3: Đổi thẻ button thành thẻ Link */}
              <Link
                href={`/menu/${drink.id}`}
                className="border border-primary-600 px-4 py-2 text-xs uppercase tracking-widest text-primary-100 hover:bg-primary-800 transition-colors"
              >
                MUA NGAY
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
