"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { useCart } from "@/app/_context/CartContext";
import { useSession } from "next-auth/react";
import {
  TrashIcon,
  PlusIcon,
  MinusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { cart, clearCart, updateQuantity, removeFromCart } = useCart();
  const { data: session } = useSession();
  const router = useRouter();

  // STATE GIỎ HÀNG
  const [selectedIds, setSelectedIds] = useState<any[]>([]);

  // STATE MODAL XÁC NHẬN ĐƠN HÀNG
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Tiền mặt");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedItems = cart.filter((item) => selectedIds.includes(item.id));
  const total = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleToggleItem = (id: any) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id],
    );
  };

  const handleToggleAll = () => {
    if (selectedIds.length === cart.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(cart.map((item) => item.id));
    }
  };

  // 1. KHI NHẤN "ĐẶT HÀNG NGAY" -> CHỈ MỞ MODAL KIỂM TRA THÔNG TIN
  const handleOpenConfirmModal = () => {
    if (cart.length === 0) return toast.error("Giỏ hàng đang trống!");

    if (selectedItems.length === 0) {
      return toast.error("Vui lòng chọn ít nhất 1 sản phẩm để thanh toán!");
    }

    if (!session) {
      toast.error("Vui lòng đăng nhập để đặt hàng!");
      return router.push("/login");
    }

    const user: any = session.user;

    if (!user?.phone || !user?.address) {
      toast.error("Vui lòng cập nhật Số điện thoại và Địa chỉ để giao hàng!");
      return router.push("/account/profile?redirect=/account/cart");
    }

    // Mở Modal Xác Nhận
    setShowConfirmModal(true);
  };

  // 2. KHI NHẤN "XÁC NHẬN THANH TOÁN" TRONG MODAL -> MỚI GỌI API QUARKUS
  const handleFinalCheckout = async () => {
    setIsSubmitting(true);
    const user: any = session?.user;

    // 🌟 SỬA ĐOẠN NÀY ĐỂ MAPPING DỮ LIỆU ĐÚNG VỚI BACKEND
    const orderData = {
      customerName: user?.name || "Khách hàng",
      customerEmail: user?.email,
      customerPhone: user?.phone,
      customerAddress: user?.address,
      items: selectedItems.map((item) => ({
        productId: item.id, // Mapping từ item.id của Frontend sang productId của Backend
        productName: item.name, // Gửi tên kèm theo để đảm bảo
        price: item.price,
        quantity: item.quantity,
        imageUrl: (item as any).image_url || (item as any).imageUrl || null,
      })),
      totalPrice: total,
      paymentMethod: paymentMethod,
    };

    // Thêm log để kiểm tra trước khi gửi
    console.log(
      "🚀 Dữ liệu gửi lên Backend:",
      JSON.stringify(orderData, null, 2),
    );

    try {
      const res = await fetch("http://localhost:8081/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (res.ok) {
        toast.success("🎉 Đặt hàng thành công! Đơn đã gửi tới Admin.");
        selectedIds.forEach((id) => removeFromCart(id));
        setSelectedIds([]);
        setShowConfirmModal(false); // Đóng Modal
      } else {
        toast.error("❌ Máy chủ Quarkus báo lỗi.");
      }
    } catch (err) {
      toast.error("Lỗi kết nối tới Quarkus!");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const user: any = session?.user;

  return (
    <div className="p-4 max-w-4xl mx-auto relative">
      <h2 className="text-2xl text-accent-400 font-semibold mb-4 uppercase tracking-widest border-b border-primary-900 pb-4">
        Giỏ hàng của bạn
      </h2>

      {cart.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-primary-800 rounded-lg">
          <p className="text-primary-300 text-lg">
            Chưa có sản phẩm nào trong giỏ.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center gap-3 pb-4 ">
            <input
              type="checkbox"
              id="selectAll"
              className="w-5 h-5 accent-accent-500 rounded cursor-pointer transition-all"
              checked={selectedIds.length === cart.length && cart.length > 0}
              onChange={handleToggleAll}
            />
            <label
              htmlFor="selectAll"
              className="text-primary-200 cursor-pointer font-medium hover:text-primary-50 transition-colors"
            >
              Chọn tất cả ({cart.length} sản phẩm)
            </label>
          </div>

          {cart.map((item) => (
            <div
              key={item.id}
              className={`flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-primary-900 pb-4 transition-all ${
                selectedIds.includes(item.id)
                  ? "bg-primary-900/20 px-2 rounded-lg"
                  : ""
              }`}
            >
              <div className="flex-1 flex items-center gap-4">
                <input
                  type="checkbox"
                  className="w-5 h-5 accent-accent-500 rounded cursor-pointer"
                  checked={selectedIds.includes(item.id)}
                  onChange={() => handleToggleItem(item.id)}
                />
                <div>
                  <h3 className="mt-2 text-lg text-primary-50 font-medium">
                    {item.name}
                  </h3>
                  <p className="text-sm text-primary-300">
                    {item.price.toLocaleString()} đ / sản phẩm
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center border border-primary-700 rounded-md overflow-hidden bg-primary-950">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="p-2 text-primary-300 hover:bg-primary-800 hover:text-accent-400 disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors"
                  >
                    <MinusIcon className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center text-primary-50 font-medium">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-2 text-primary-300 hover:bg-primary-800 hover:text-accent-400 transition-colors"
                  >
                    <PlusIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between md:w-48">
                <span className="text-lg font-semibold text-accent-400">
                  {(item.price * item.quantity).toLocaleString()} đ
                </span>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-primary-400 hover:text-red-500 hover:bg-red-500/10 rounded-full transition-colors"
                  title="Xóa sản phẩm"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}

          <div className="flex flex-col items-end pt-6">
            <div className="text-xl text-primary-200 mb-6 flex items-center">
              <span>Tổng thanh toán ({selectedIds.length} sản phẩm):</span>
              <span className="text-3xl font-bold text-accent-400 ml-4">
                {total.toLocaleString()} đ
              </span>
            </div>

            <button
              onClick={handleOpenConfirmModal}
              className="w-full md:w-auto px-12 bg-accent-500 text-primary-950 font-bold py-4 hover:bg-accent-400 transition-colors uppercase tracking-widest rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Đặt hàng ngay
            </button>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 3. MODAL XÁC NHẬN ĐƠN HÀNG (ĐÃ TĂNG KÍCH THƯỚC CHỮ) */}
      {/* ========================================================= */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-primary-950 border border-primary-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-slide-up">
            {/* Header Modal */}
            <div className="sticky top-0 bg-primary-950/90 backdrop-blur-md px-6 py-5 border-b border-primary-800 flex justify-between items-center z-10">
              <h3 className="text-2xl font-bold text-accent-400 uppercase tracking-widest">
                Xác nhận đơn hàng
              </h3>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="p-2 text-primary-400 hover:bg-primary-800 hover:text-white rounded-full transition-colors"
              >
                <XMarkIcon className="w-7 h-7" />
              </button>
            </div>

            <div className="p-6 md:p-8 space-y-8">
              {/* Thông tin khách hàng */}
              <div className="p-4 border border-primary-800/50 rounded-xl ">
                <h4 className=" text-base font-bold text-primary-400 uppercase tracking-wider mb-5 border-b border-primary-800/50 pb-3">
                  Thông tin giao hàng
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-primary-50">
                  <div>
                    <p className="text-sm text-primary-400 mb-1">Họ và tên</p>
                    <p className="text-lg font-bold">
                      {user?.name || "Khách hàng"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-primary-400 mb-1">
                      Số điện thoại
                    </p>
                    <p className="text-lg font-bold">{user?.phone}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm text-primary-400 mb-1">Email</p>
                    <p className="text-lg font-bold">{user?.email}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm text-primary-400 mb-1">
                      Địa chỉ nhận hàng
                    </p>
                    <p className="text-lg font-bold">{user?.address}</p>
                  </div>
                </div>
              </div>

              {/* Chi tiết đơn hàng */}
              <div className="mt-4">
                <h4 className="text-base font-bold text-primary-400 uppercase tracking-wider mb-2 pb-2">
                  Sản phẩm đã chọn ({selectedItems.length})
                </h4>
                <div className="space-y-4 max-h-56 overflow-y-auto pr-2 custom-scrollbar mt-3">
                  {selectedItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center text-base mb-3 "
                    >
                      <div className="flex items-center gap-4">
                        <span className="w-8 h-8 bg-primary-800 text-primary-200 rounded flex items-center justify-center font-bold text-sm">
                          x{item.quantity}
                        </span>
                        <span className="text-primary-50 font-medium">
                          {item.name}
                        </span>
                      </div>
                      <span className="font-bold text-lg text-primary-200">
                        {(item.price * item.quantity).toLocaleString()} đ
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hình thức thanh toán */}
              <div>
                <h4 className="text-base font-bold text-primary-400 uppercase tracking-wider mb-2 pb-3">
                  Hình thức thanh toán
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label
                    className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all ${paymentMethod === "Tiền mặt" ? "bg-accent-500/10 border-accent-500 text-accent-400" : "border-primary-800 text-primary-300 hover:bg-primary-800/50"}`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="Tiền mặt"
                      className="accent-accent-500 w-5 h-5"
                      checked={paymentMethod === "Tiền mặt"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span className="font-semibold text-base">
                      Thanh toán khi nhận hàng (COD)
                    </span>
                  </label>

                  <label
                    className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all ${paymentMethod === "Chuyển khoản" ? "bg-accent-500/10 border-accent-500 text-accent-400" : "border-primary-800 text-primary-300 hover:bg-primary-800/50"}`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="Chuyển khoản"
                      className="accent-accent-500 w-5 h-5"
                      checked={paymentMethod === "Chuyển khoản"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span className="font-semibold text-base">
                      Chuyển khoản ngân hàng
                    </span>
                  </label>
                </div>
              </div>

              {/* Tổng tiền và Nút xác nhận */}
              <div className="pt-6 border-t border-primary-800 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-xs md:text-xs text-primary-100">
                  Tổng thanh toán:{" "}
                  <span className="text-3xl md:text-4xl font-black text-accent-400 ml-2">
                    {total.toLocaleString()} đ
                  </span>
                </div>
                <div className="flex w-full md:w-auto gap-3">
                  <button
                    onClick={() => setShowConfirmModal(false)}
                    disabled={isSubmitting}
                    className="flex-1 md:flex-none px-5 py-2 rounded-lg text-base font-bold border border-primary-700 text-primary-300 hover:bg-primary-800 hover:text-white transition-colors"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={handleFinalCheckout}
                    disabled={isSubmitting}
                    className="flex-1 md:flex-none px-5 py-2 rounded-lg text-base font-bold bg-accent-500 text-primary-950 hover:bg-accent-400 transition-colors uppercase tracking-wider shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center min-w-[160px]"
                  >
                    {isSubmitting ? (
                      <span className="animate-pulse">Đang xử lý...</span>
                    ) : (
                      "Xác nhận"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
