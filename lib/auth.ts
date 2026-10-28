import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        try {
          // 🌟 ĐỒNG BỘ: Chuyển URL gọi sang cổng login trung tâm /api/auth/login của bảng gộp
          const res = await fetch("http://localhost:8081/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          if (res.ok) {
            const user = await res.json();

            // Trả về dữ liệu đầy đủ (giữ lại trường phone, address cũ + bơm thêm role và token của Quarkus)
            return {
              id: user.id?.toString() || user.email,
              name: user.fullName || "Khách hàng",
              email: user.email,
              phone: user.phone || "",
              address: user.address || "",
              role: user.role || "USER", // Quyền 'USER' hoặc 'ADMIN' từ MySQL
              backendToken: user.token, // Chìa khóa JWT dùng để gọi các API có trạm gác @RolesAllowed
            };
          }
          return null;
        } catch (error) {
          console.error("Lỗi authorize NextAuth:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    // 🌟 BƠM DỮ LIỆU VÀO TOKEN: Lưu giữ cả các trường cũ lẫn các trường bảo mật mới (role, backendToken)
    async jwt({ token, user, trigger, session }) {
      // Khi user đăng nhập thành công lần đầu tiên
      if (user) {
        token.id = user.id;
        token.phone = (user as any).phone;
        token.address = (user as any).address;
        token.role = (user as any).role;
        token.backendToken = (user as any).backendToken;
      }

      // Khi người dùng ở giao diện bấm nút "Update Profile" và kích hoạt hàm update()
      if (trigger === "update" && session) {
        token.name = session.name || token.name;
        token.phone = session.phone || token.phone;
        token.address = session.address || token.address;
      }
      return token;
    },

    // 🌟 ĐẨY DỮ LIỆU RA SESSION: Giúp trang giỏ hàng và các trang khác dễ dàng kiểm tra quyền hạn khách
    async session({ session, token }) {
      if (session.user && token) {
        (session.user as any).id = token.id;
        (session.user as any).phone = token.phone;
        (session.user as any).address = token.address;
        (session.user as any).role = token.role; // Trích xuất quyền ra ngoài Client
        (session.user as any).backendToken = token.backendToken; // Trích xuất mã Token ra ngoài Client
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret:
    process.env.NEXTAUTH_SECRET || "Chuoi_Bao_Mat_Tam_Thoi_Cua_Hung_123!@#",
};
