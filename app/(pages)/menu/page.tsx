"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FireIcon,
  ScaleIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
// Nhúng component Footer vào đây
import Footer from "@/app/_components/Footer";

export default function Page() {
  // 1. Các State quản lý Dữ liệu và Giao diện
  const [drinks, setDrinks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10; // Số sản phẩm trên mỗi trang

  // 2. Fetch dữ liệu từ API một lần khi trang được tải
  useEffect(() => {
    async function fetchDrinks() {
      try {
        const res = await fetch("http://localhost:8081/api/products");
        if (!res.ok) throw new Error("Không thể tải danh sách sản phẩm");
        const data = await res.json();
        setDrinks(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchDrinks();
  }, []);

  // 3. Tự động chuyển về trang 1 nếu người dùng gõ tìm kiếm hoặc đổi danh mục
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  const filteredDrinks = drinks.filter((drink) => {
    // 1. Lọc theo tên sản phẩm (không phân biệt hoa thường)
    const matchSearch = drink.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());

    // 2. Lọc theo danh mục
    // LƯU Ý: Thay 'category_name' bằng đúng cái tên bạn thấy trong Console ở Bước 1
    const categoryValue = drink.category_name || "";

    const matchCategory =
      selectedCategory === "All" ||
      categoryValue.trim() === selectedCategory.trim();

    return matchSearch && matchCategory;
  });

  // 5. Tính toán Phân trang dựa trên danh sách ĐÃ LỌC
  const totalPages = Math.ceil(filteredDrinks.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentDrinks = filteredDrinks.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  return (
    <>
      <div className="py-12 px-8 max-w-7xl mx-auto overflow-hidden min-h-screen">
        {/* PHẦN TIÊU ĐỀ */}
        <div className="mb-12 animate-slide-up">
          <h1 className="text-4xl md:text-5xl text-accent-400 font-medium mb-8 tracking-tight">
            Thực đơn cà phê thượng hạng
          </h1>
          <p className="text-primary-200 text-lg leading-relaxed text-justify">
            Khám phá những hương vị cà phê độc bản được tuyển chọn từ các vùng
            nguyên liệu trứ danh. Từng ly cà phê mang hương thơm tinh tế, vị đậm
            đà và hậu vị sâu lắng, tạo nên trải nghiệm thưởng thức đầy cảm hứng.
            Không chỉ là thức uống, đó còn là khoảnh khắc thư giãn nhẹ nhàng để
            khởi đầu ngày mới trọn vẹn hơn.
          </p>
        </div>

        {/* KHU VỰC TÌM KIẾM & LỌC ĐÃ ĐƯỢC THU NHỎ */}
        {/* Đổi justify-between thành justify-start để chúng dồn về bên trái cho gọn */}
        <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-start animate-slide-up">
          {/* Ô Tìm kiếm (Fix độ rộng thành md:w-80 ~ 320px) */}
          <div className="relative w-full md:w-[320px]">
            <input
              type="text"
              placeholder="Tìm kiếm cà phê..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-primary-950 border px-2 border-primary-800 text-primary-100 rounded-xl py-2 pl-2 pr-2 focus:outline-none focus:border-accent-500 transition-colors"
            />
          </div>

          {/* Bộ lọc Danh mục (Fix độ rộng thành md:w-56 ~ 224px) */}
          <div className="w-full md:w-56 relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-primary-950 border border-primary-800 text-primary-600 rounded-xl py-3 px-4 focus:outline-none focus:border-accent-500 appearance-none cursor-pointer transition-colors"
            >
              <option value="All">Tất cả danh mục</option>
              <option value="Cà phê Rang xay">Cà phê Rang xay</option>
              <option value="Cà phê Hòa tan">Cà phê Hòa tan</option>
              <option value="Cà phê Hạt">Cà phê Hạt</option>
            </select>
            {/* Mũi tên giả */}
          </div>
        </div>

        {/* HIỂN THỊ TRẠNG THÁI (Loading / Trống / Dữ liệu) */}
        {loading ? (
          <div className="text-center py-20 border border-dashed border-primary-800 rounded-lg animate-slide-up">
            <p className="text-primary-400 text-lg">Đang tải thực đơn...</p>
          </div>
        ) : filteredDrinks.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-primary-800 rounded-lg animate-slide-up">
            <p className="text-primary-400 text-lg">
              Không tìm thấy sản phẩm nào phù hợp với tìm kiếm của bạn.
            </p>
          </div>
        ) : (
          <>
            {/* LƯỚI DANH SÁCH SẢN PHẨM */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {currentDrinks.map((drink: any, index: number) => (
                <div
                  key={drink.id}
                  className="animate-slide-up flex flex-col md:flex-row border border-primary-900 bg-transparent overflow-hidden group shadow-sm"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Khối ảnh bên trái */}
                  <div className="relative w-full md:w-2/5 h-64 md:h-auto overflow-hidden">
                    {/* TAG Danh mục góc trái ảnh */}
                    {drink.category && (
                      <span className="absolute top-3 left-3 bg-accent-500 text-primary-950 text-[10px] font-bold px-3 py-1 uppercase tracking-widest z-10 shadow-md">
                        {drink.category}
                      </span>
                    )}
                    <img
                      src={`http://localhost:8081/uploads/${drink.image_url}`}
                      alt={drink.name}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105 bg-white"
                    />
                  </div>

                  {/* Khối nội dung bên phải */}
                  <div className="flex-1 p-8 flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl text-accent-400 font-semibold mb-4 uppercase tracking-wider">
                        {drink.name}
                      </h3>

                      {/* Thông số */}
                      <div className="flex flex-col gap-3 text-primary-200 mb-6">
                        <div className="flex items-center gap-3">
                          <FireIcon className="h-5 w-5 text-primary-600 shrink-0" />
                          <span>
                            Hương vị:{" "}
                            <span className="font-semibold text-primary-50">
                              {drink.roast || "Rang Đậm"}
                            </span>
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <ScaleIcon className="h-5 w-5 text-primary-600 shrink-0" />
                          <span>
                            Quy cách:{" "}
                            <span className="font-semibold text-primary-50">
                              {drink.weight || "Túi 500g"}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Phần Giá và Nút chi tiết */}
                    <div className="flex justify-between items-end border-t border-primary-900 pt-6 mt-4">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-primary-400 uppercase tracking-widest mb-1">
                          Giá từ
                        </span>
                        <p className="text-2xl font-light text-primary-50">
                          {drink.price?.toLocaleString("vi-VN")}
                          <span className="text-sm text-primary-400 ml-1">
                            ₫
                          </span>
                        </p>
                      </div>

                      <Link
                        href={`/menu/${drink.id}`}
                        className="flex items-center gap-1.5 text-primary-300 hover:text-accent-400 transition-colors uppercase tracking-widest text-[11px] font-medium group/link pb-0.5"
                      >
                        Chi tiết & Đặt mua
                        <ArrowRightIcon className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-2" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* NÚT ĐIỀU HƯỚNG PHÂN TRANG */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-6 mt-16 animate-slide-up">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className={`flex items-center gap-2 px-4 py-2 border rounded-sm transition-colors ${
                    currentPage === 1
                      ? "border-primary-900 text-primary-700 cursor-not-allowed"
                      : "border-primary-800 text-primary-300 hover:bg-primary-900 hover:text-primary-50"
                  }`}
                >
                  <ChevronLeftIcon className="w-4 h-4" /> Trước
                </button>

                <span className="text-primary-300 text-sm">
                  Trang{" "}
                  <span className="font-bold text-accent-400">
                    {currentPage}
                  </span>{" "}
                  / {totalPages}
                </span>

                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className={`flex items-center gap-2 px-4 py-2 border rounded-sm transition-colors ${
                    currentPage === totalPages
                      ? "border-primary-900 text-primary-700 cursor-not-allowed"
                      : "border-primary-800 text-primary-300 hover:bg-primary-900 hover:text-primary-50"
                  }`}
                >
                  Sau <ChevronRightIcon className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <Footer />
    </>
  );
}
