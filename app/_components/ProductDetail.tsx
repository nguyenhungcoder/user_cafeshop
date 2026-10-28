"use client";
import {
  FireIcon,
  ScaleIcon,
  CheckBadgeIcon,
  TruckIcon,
  ShieldCheckIcon,
  ArrowPathIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarSolid } from "@heroicons/react/24/solid";
import Link from "next/link";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useCart } from "@/app/_context/CartContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ProductDetail({ drink }: { drink: any }) {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1); // STATE QUẢN LÝ SỐ LƯỢNG
  const { addToCart } = useCart();

  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    async function fetchRelated() {
      try {
        const res = await fetch("http://localhost:8081/api/products");
        const data = await res.json();
        const filtered = data.filter((p: any) => p.id !== drink.id).slice(0, 4);
        setRelatedProducts(filtered);
      } catch (error) {
        console.error("Lỗi lấy sản phẩm đề xuất:", error);
      }
    }
    fetchRelated();
  }, [drink.id]);

  // Hàm xử lý tăng giảm số lượng
  const handleQuantity = (type: "increase" | "decrease") => {
    if (type === "decrease" && quantity > 1) setQuantity(quantity - 1);
    if (type === "increase" && quantity < 20) setQuantity(quantity + 1);
  };

  return (
    <div className="max-w-6xl mx-auto px-8 mt-16 md:mt-24 mb-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 border border-primary-800 p-6 md:p-12 bg-primary-950/50 shadow-2xl">
        {/* BÊN TRÁI: KHỐI ẢNH */}
        <div className="relative h-[350px] md:h-[500px] flex justify-center items-center bg-white/5 rounded-sm overflow-hidden border border-primary-900/50">
          <img
            src={`http://localhost:8081/uploads/${drink.image_url}`}
            alt={drink.name}
            className="object-contain w-full h-full p-4 transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* BÊN PHẢI: KHỐI NỘI DUNG */}
        <div className="flex flex-col justify-between py-2">
          <div>
            <h3 className="text-accent-400 font-bold text-4xl md:text-5xl mb-4 tracking-tight uppercase leading-tight">
              {drink.name}
            </h3>

            {/* 1. ĐÁNH GIÁ SAO */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex text-yellow-500">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarSolid key={star} className="w-5 h-5" />
                ))}
              </div>
              <span className="text-primary-300 text-sm">
                (Đánh giá 5.0 - Dựa trên trải nghiệm khách hàng)
              </span>
            </div>

            <p className="text-lg text-primary-200 mb-8 text-justify leading-relaxed font-light">
              {drink.description ||
                "Hương vị cà phê nguyên bản, được chọn lọc kỹ lưỡng từ những hạt cà phê thượng hạng nhất. Đậm đà, quyến rũ và đánh thức mọi giác quan của bạn."}
            </p>

            <ul className="flex flex-col gap-4 mb-4 text-primary-100 border-y border-primary-900/50 py-6">
              <li className="flex items-center gap-4">
                <FireIcon className="h-6 w-6 text-primary-500" />
                <span className="text-lg">
                  Hương vị:{" "}
                  <span className="font-semibold text-primary-50">
                    {drink.roast || "Đặc biệt"}
                  </span>
                </span>
              </li>
              <li className="flex items-center gap-4">
                <ScaleIcon className="h-6 w-6 text-primary-500" />
                <span className="text-lg">
                  Quy cách:{" "}
                  <span className="font-semibold text-primary-50">
                    {drink.weight || "250g"}
                  </span>
                </span>
              </li>
              <li className="flex items-center gap-4">
                <CheckBadgeIcon className="h-6 w-6 text-primary-500" />
                <span className="text-lg text-primary-50 font-semibold">
                  100% Nguyên chất & Hữu cơ
                </span>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <div className="flex flex-row flex-wrap gap-4 text-primary-300 text-sm mt-6">
              <div className="flex flex-col items-center sm:items-start">
                <span className="text-xs text-primary-400 uppercase tracking-[0.2em] mb-1">
                  Mức giá
                </span>
                <p className="text-4xl font-light text-primary-50">
                  {drink.price?.toLocaleString("vi-VN")}
                  <span className="text-xl text-primary-400 ml-1">₫</span>
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                {/* 2. BỘ CHỌN SỐ LƯỢNG */}
                <div className="flex items-center border border-primary-700 rounded-md overflow-hidden bg-primary-950">
                  <button
                    onClick={() => handleQuantity("decrease")}
                    className="px-4 py-3 text-primary-300 hover:bg-primary-800 transition-colors"
                  >
                    <MinusIcon className="w-5 h-5" />
                  </button>
                  <span className="w-12 text-center text-lg font-semibold text-primary-50">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantity("increase")}
                    className="px-4 py-3 text-primary-300 hover:bg-primary-800 transition-colors"
                  >
                    <PlusIcon className="w-5 h-5" />
                  </button>
                </div>

                <button
                  onClick={() => {
                    if (status === "unauthenticated" || !session) {
                      toast.error("Vui lòng đăng nhập để thêm vào giỏ hàng!");
                      router.push("/login");
                      return;
                    }
                    const itemToAdd = {
                      id: drink.id,
                      name: drink.name,
                      price: drink.price,
                      image_url: drink.image_url,
                      weight: drink.weight || "250g",
                      quantity: quantity, // Gửi kèm số lượng
                    };
                    addToCart(itemToAdd);
                    toast.success(
                      `Đã thêm ${quantity} ${drink.name} vào giỏ hàng!`,
                    );
                  }}
                  className="sm:w-auto bg-accent-500 text-l hover:bg-accent-600 text-primary-900 font-bold px-2 py-2 tracking-widest transition-all shadow-lg active:scale-95 whitespace-nowrap"
                >
                  Thêm vào giỏ
                </button>
              </div>
            </div>

            {/* 3. KHUNG CAM KẾT & GIAO HÀNG */}
            <div className="flex flex-row flex-wrap gap-2 text-primary-300 text-sm mt-6">
              <div className="flex items-center gap-3 p-3 bg-primary-950/40 rounded ">
                <TruckIcon className="w-8 h-8 text-accent-500/80" />
                <span>Giao hàng hỏa tốc trong vòng 2h</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-primary-950/40 rounded ">
                <ShieldCheckIcon className="w-8 h-8 text-accent-500/80" />
                <span>Thanh toán an toàn bảo mật 100%</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-primary-950/40 rounded ">
                <ArrowPathIcon className="w-8 h-8 text-accent-500/80" />
                <span>Đổi trả miễn phí nếu lỗi do NSX</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PHẦN ĐỀ XUẤT SẢN PHẨM GIỮ NGUYÊN */}
      <div className="pt-20 border-t border-primary-900">
        <h4 className="text-2xl text-accent-400 font-semibold mb-12 uppercase tracking-widest text-center md:text-left">
          Khám phá thêm thực đơn
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {relatedProducts.map((item: any) => (
            <Link
              href={`/menu/${item.id}`}
              key={item.id}
              className="group cursor-pointer"
            >
              <div className="relative aspect-square overflow-hidden bg-white/5 border border-primary-900 mb-4 rounded-sm shadow-lg">
                <img
                  src={`http://localhost:8081/uploads/${item.image_url}`}
                  alt={item.name}
                  className="object-contain w-full h-full p-4 transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                />
              </div>
              <h5 className="text-primary-100 font-medium tracking-wide group-hover:text-accent-400 transition-colors uppercase text-sm truncate">
                {item.name}
              </h5>
              <p className="text-accent-500 text-lg mt-1 font-light">
                {item.price?.toLocaleString("vi-VN")} ₫
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
