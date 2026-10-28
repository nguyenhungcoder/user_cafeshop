"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { log } from "console";

export default function MyOrdersPage() {
  const { data: session, status } = useSession();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const customerEmail = session?.user?.email;

  const fetchOrders = () => {
    if (!customerEmail) return;

    fetch(`http://localhost:8081/api/orders/customer/${customerEmail}`)
      .then((res) => {
        if (!res.ok) throw new Error("API chưa sẵn sàng hoặc bị lỗi");
        return res.json();
      })
      .then((data) => {
        console.log("🔍 Dữ liệu đơn hàng lấy được từ Backend:", data);
        const sortedOrders = data.sort((a: any, b: any) => b.id - a.id);
        setOrders(sortedOrders);
      })
      .catch((err) => {
        console.error("Lỗi lấy đơn hàng:", err);
        setError("Không thể kết nối lấy dữ liệu đơn hàng.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated" || !customerEmail) {
      setLoading(false);
      return;
    }

    fetchOrders();

    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, [status, customerEmail]);

  const handleCancel = async (orderId: number) => {
    if (window.confirm("Bạn có chắc chắn muốn hủy đơn hàng này không?")) {
      try {
        const res = await fetch(
          `http://localhost:8081/api/orders/${orderId}/cancel`,
          {
            method: "PUT",
          },
        );

        if (res.ok) {
          toast.success("Đã hủy đơn hàng thành công! ❌");
          fetchOrders();
        } else {
          toast.error("Không thể hủy đơn hàng (Đơn có thể đã được xử lý).");
        }
      } catch (err) {
        toast.error("Lỗi kết nối tới máy chủ.");
        console.error(err);
      }
    }
  };

  if (status === "loading" || loading)
    return (
      <p className="text-primary-200 p-8 text-lg font-semibold animate-pulse">
        Đang tải đơn hàng...
      </p>
    );

  if (status === "unauthenticated" || !customerEmail)
    return (
      <div className="p-8">
        <p className="text-red-400 text-lg bg-red-900/20 p-4 rounded-lg border border-red-800 inline-block">
          Vui lòng đăng nhập để xem lịch sử đơn hàng của bạn.
        </p>
      </div>
    );

  if (error) return <p className="text-red-500 p-8 text-lg">{error}</p>;

  return (
    <div className="p-8 min-h-full">
      <h1 className="text-2xl font-bold mb-6 text-primary-500 uppercase tracking-wider">
        Lịch sử đơn hàng
      </h1>

      {orders.length === 0 ? (
        <div className="text-primary-200 bg-primary-900/20 p-6 rounded-lg border border-primary-800">
          <p>
            Bạn chưa có đơn hàng nào. Hãy ra Menu đặt ngay một ly cà phê nhé!
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order: any) => (
            <div
              key={order.id}
              className="border border-primary-800 p-6 rounded-xl bg-primary-950/30 hover:bg-primary-900/30 transition-colors shadow-sm"
            >
              <div className="flex justify-between items-start mb-4 border-b border-primary-800 pb-4">
                <div>
                  <span className="font-mono text-lg font-bold text-primary-300">
                    {order.orderId}
                  </span>
                  <p className="text-sm text-primary-200/60 mt-1">
                    Ngày đặt: {order.orderDate}
                  </p>
                </div>

                {/* 3. HIỂN THỊ TRẠNG THÁI & NÚT HỦY */}
                <div className="flex flex-col items-end gap-2">
                  <span
                    className={`px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide ${
                      order.status === "Chờ xử lý"
                        ? "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
                        : order.status === "Đã hủy"
                          ? "bg-red-500/20 text-red-400 border border-red-500/30"
                          : "bg-green-500/20 text-green-300 border border-green-500/30"
                    }`}
                  >
                    {order.status}
                  </span>

                  {/* Nút hủy bo tròn và có hiệu ứng lún */}
                  {order.status === "Chờ xử lý" && (
                    <button
                      onClick={() => handleCancel(order.id)}
                      className="px-4 py-1.5 mt-1 text-xs font-semibold text-red-400 border border-red-500/30 rounded-full hover:bg-red-500/10 transition-all active:scale-95"
                    >
                      Hủy đơn hàng
                    </button>
                  )}
                </div>
              </div>

              <div className="py-2 space-y-3">
                {order.items?.map((item: any, index: number) => (
                  <div
                    key={index}
                    className="flex justify-between text-base text-primary-100"
                  >
                    <span className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded bg-primary-800 flex items-center justify-center text-xs font-bold text-primary-300">
                        x{item.quantity}
                      </span>
                      {item.productName}
                    </span>
                    <span className="font-medium text-primary-200">
                      {(item.price * item.quantity).toLocaleString("vi-VN")} đ
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-end mt-4 pt-4 border-t border-primary-800">
                <span className="text-primary-200 uppercase text-sm font-semibold">
                  Tổng cộng:
                </span>
                <span className="text-2xl font-bold text-primary-500">
                  {order.totalPrice.toLocaleString("vi-VN")} đ
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
