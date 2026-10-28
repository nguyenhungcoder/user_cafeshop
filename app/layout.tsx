import { Josefin_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "@/app/_styles/globals.css";
import Header from "./_components/Header";
import { ReactNode } from "react";
import Providers from "./providers";
// 1. IMPORT CART PROVIDER VÀO ĐÂY
import { CartProvider } from "@/app/_context/CartContext";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    template: "The Coffee Shop ",
    default: "The Coffee Shop ",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <meta name="color-scheme" content="dark" />
      <meta name="theme-color" content="#141c24" />
      <link
        rel="canonical"
        href="https://the-wild-oasis-booking-alamin.vercel.app"
      />
      <meta
        name="description"
        content="Explore Nghiêm Lập Trình Booking by Alamin (CodeWithAlamin). Find unique destinations, thrilling activities, and plan your next wild getaway."
      />
      <meta name="application-name" content="Nghiêm Lập Trình Booking" />
      <meta name="referrer" content="origin-when-cross-origin" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      <meta
        name="apple-mobile-web-app-title"
        content="Nghiêm Lập Trình Booking"
      />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="author" content="Alamin, CodeWithAlamin" />
      <meta property="og:author" content="Alamin, CodeWithAlamin" />

      <meta
        name="keywords"
        content="Wild Oasis,
            Wild Oasis Booking,
            Nghiêm Lập Trình Website,
            Nextjs project,
            Thrilling Experiences,
            Adventure,
            Travel,
            Adventure Trips, 
            Jonas Schmedtmann, 
            Alamin, 
            CodeWithAlamin"
      />
      <meta name="robots" content="index, follow" />
      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content="https://the-wild-oasis-booking-alamin.vercel.app"
      />
      <meta property="og:title" content="Nghiêm Lập Trình Booking" />
      <meta
        property="og:description"
        content="Explore Nghiêm Lập Trình Booking by Alamin (CodeWithAlamin). Find unique destinations, thrilling activities, and plan your next wild getaway."
      />
      <meta
        property="og:image"
        content="https://the-wild-oasis-booking-alamin.vercel.app/thumbnail.png"
      />
      <meta
        property="og:image:secure_url"
        content="https://the-wild-oasis-booking-alamin.vercel.app/thumbnail.png"
      />
      <meta property="og:site_name" content="Nghiêm Lập Trình Booking" />
      <meta
        property="og:image:alt"
        content="Thumbnail image of Nghiêm Lập Trình Booking website"
      />
      <meta property="og:updated_time" content="2024-09-13T10:23:00Z" />

      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1920" />
      <meta property="og:image:height" content="1080" />

      <meta property="og:locale" content="en_US" />
      <meta name="geo.region" content="BD-13" />
      <meta name="geo.placename" content="Dhaka" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Nghiêm Lập Trình Booking" />
      <meta
        name="twitter:description"
        content="Explore Nghiêm Lập Trình Booking by Alamin (CodeWithAlamin). Find unique destinations, thrilling activities, and plan your next wild getaway."
      />
      <meta
        name="twitter:image"
        content="https://the-wild-oasis-booking-alamin.vercel.app/thumbnail.png"
      />
      <meta
        name="twitter:url"
        content="https://the-wild-oasis-booking-alamin.vercel.app"
      />
      <meta name="twitter:site" content="@CodeWithAlamin" />
      <meta name="twitter:creator" content="@CodeWithAlamin" />
      <meta
        name="twitter:image:alt"
        content="Thumbnail image of Nghiêm Lập Trình Booking website"
      />
      <body
        className={`${josefin.className} antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col relative`}
      >
        <Providers>
          {/* 2. BỌC CART PROVIDER Ở ĐÂY (ôm toàn bộ giao diện) */}
          <CartProvider>
            <Header />

            <div className="flex">
              <main className="w-full">{children}</main>
            </div>

            {/* 2. THÊM COMPONENT TOASTER VÀO ĐÂY */}
            <Toaster
              position="top-center"
              toastOptions={{
                // Custom giao diện cho hộp thông báo
                style: {
                  background: "#141c24", // Màu nền tối (tương đương bg-primary-950)
                  color: "#fff", // Chữ màu trắng
                  border: "1px solid #1f2937", // Viền mỏng
                  padding: "16px",
                },
                // Custom riêng cho thông báo thành công
                success: {
                  iconTheme: {
                    primary: "#ca8a04", // Màu vàng accent của web
                    secondary: "#fff",
                  },
                },
              }}
            />
            <footer className="sr-only">
              @copyright by Alamin and Jonas Schmedtmann
            </footer>
          </CartProvider>
        </Providers>
      </body>
    </html>
  );
}
