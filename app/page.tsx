import Image from "next/image";
import Link from "next/link";
import bg1 from "@/public/bg1.jpg";

// Import các section khác
import AboutSection from "@/app/_components/AboutSection";
import Facilities from "@/app/_components/Facilities";
import FeaturedDrinks from "@/app/_components/FeaturedDrinks";
import FAQ from "@/app/_components/FAQ";
import Footer from "@/app/_components/Footer";
import Newsletter from "./_components/Newsletter";

export default function Page() {
  return (
    <>
      {/* ẢNH NỀN HERO (TRÀN TOÀN MÀN HÌNH VÀ CUỘN THEO) */}
      <div className="absolute top-0 left-0 w-screen h-screen -z-10 overflow-hidden">
        <Image
          fill
          placeholder="blur"
          quality={100}
          className="object-cover object-center" // Căn giữa ảnh để cái ly không bị lệch
          src={bg1}
          alt="Coffee shop paradise"
          priority
        />
      </div>

      {/* LỚP PHỦ NỘI DUNG THANH THOÁT */}
      {/* items-start: Đẩy nội dung lên trên cùng của khối */}
      <div className="h-screen flex flex-col items-center justify-start pt-[23vh] text-center">
        <h1 className="text-5xl md:text-8xl text-primary-50 mb-10 tracking-tight font-normal drop-shadow-lg relative">
          Welcome to paradise.
        </h1>

        <Link
          href="/menu"
          className="bg-accent-500 px-4 py-4 md:px-8 md:py-6 text-primary-900 text-lg font-semibold hover:bg-accent-600 transition-all shadow-xl relative"
        >
          Explore the coffee shop
        </Link>
      </div>

      {/* CÁC PHẦN NỘI DUNG BÊN DƯỚI */}
      <div className="w-screen relative left-1/2 -translate-x-1/2 bg-primary-950">
        <div className="max-w-7xl mx-auto px-8">
          <AboutSection />
          <FeaturedDrinks />
          <Facilities />
          <FAQ />
          <Newsletter />
        </div>
        <Footer />
      </div>
    </>
  );
}
