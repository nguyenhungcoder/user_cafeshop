"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react"; // 👈 THÊM MỚI: Import useSession từ NextAuth

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: any) => void;
  updateQuantity: (id: number, newQuantity: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession(); // 👈 THÊM MỚI: Lấy thông tin session hiện tại
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loadedKey, setLoadedKey] = useState<string | null>(null); // 👈 Chốt chặn chống ghi đè lỗi dữ liệu

  // Tự động sinh khóa localStorage động theo Email người dùng (Nếu chưa đăng nhập sẽ dùng "guest")
  const cartKey = session?.user?.email
    ? `coffee_cart_${session.user.email}`
    : "coffee_cart_guest";

  // ==========================================
  // CẬP NHẬT: ĐỒNG BỘ VỚI LOCAL STORAGE THEO TÀI KHOẢN
  // ==========================================

  // 1. Lấy dữ liệu từ localStorage mỗi khi đổi tài khoản (cartKey thay đổi)
  useEffect(() => {
    if (status === "loading") return; // Đợi NextAuth xác thực xong session rồi mới xử lý

    const savedCart = localStorage.getItem(cartKey);
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error("Lỗi đọc giỏ hàng từ localStorage", error);
        setCart([]);
      }
    } else {
      setCart([]); // Reset giỏ hàng trống nếu tài khoản này chưa từng thêm món
    }
    setLoadedKey(cartKey); // Đánh dấu đã tải xong dữ liệu của tài khoản hiện tại
  }, [cartKey, status]);

  // 2. Lưu vào localStorage mỗi khi giỏ hàng của tài khoản đó có sự thay đổi
  useEffect(() => {
    // CHỈ lưu khi dữ liệu giỏ hàng trong State đã thực sự thuộc về tài khoản hiện tại
    // Giúp ngăn việc giỏ hàng tài khoản A vô tình đè vào tài khoản B lúc vừa chuyển đổi
    if (loadedKey === cartKey && status !== "loading") {
      localStorage.setItem(cartKey, JSON.stringify(cart));
    }
  }, [cart, cartKey, loadedKey, status]);

  // ==========================================

  // Hàm thêm vào giỏ hỗ trợ cộng dồn số lượng tùy ý
  const addToCart = (product: any) => {
    const quantityToAdd = product.quantity || 1;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantityToAdd }
            : item,
        );
      }

      return [...prev, { ...product, quantity: quantityToAdd }];
    });
  };

  // Hàm cập nhật số lượng
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  // Hàm xóa sản phẩm
  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    toast.success("Đã xóa sản phẩm khỏi giỏ hàng");
  };

  // Hàm làm trống giỏ (sau khi đặt hàng thành công)
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}
