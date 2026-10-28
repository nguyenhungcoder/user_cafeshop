import Image from "next/image";
import Link from "next/link";

export default function AboutSection() {
  return (
    <section className="py-24 px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
        {/* --- CỘT TRÁI: NỘI DUNG VÀ THỐNG KÊ --- */}
        <div className="flex flex-col gap-10">
          {/* Hàng chứa các con số to giống mẫu */}
          <div className="flex gap-12 items-baseline">
            <div>
              <span className="text-5xl md:text-6xl font-bold text-primary-50">
                5
              </span>
              <span className="text-xs md:text-sm tracking-[0.3em] uppercase text-primary-200 ml-3">
                Vùng trồng
              </span>
            </div>
            <div>
              <span className="text-5xl md:text-6xl font-bold text-primary-50">
                12
              </span>
              <span className="text-xs md:text-sm tracking-[0.3em] uppercase text-primary-200 ml-3">
                Món Signature
              </span>
            </div>
          </div>

          {/* Đoạn văn mô tả */}
          <p className="text-primary-100 text-lg md:text-xl leading-relaxed font-light">
            Nằm ẩn mình giữa lòng thành phố nhộn nhịp, The Coffee Shop mang đến
            một không gian mộc mạc và tĩnh lặng. Nơi những hạt cà phê hảo hạng
            nhất được tuyển chọn và pha chế thủ công, tạo nên trải nghiệm chuẩn
            5 sao.
          </p>

          {/* Link Tìm hiểu thêm với gạch chân mảnh */}
          <div>
            <Link
              href="/about"
              className="text-xs font-bold uppercase tracking-[0.2em] text-primary-50 border-b border-primary-700 hover:border-primary-50 pb-1 transition-colors"
            >
              Tìm hiểu thêm
            </Link>
          </div>
        </div>

        {/* --- CỘT PHẢI: BỐ CỤC ẢNH GHÉP (COLLAGE) --- */}
        {/* Khối này được đặt height cố định để các ảnh con bên trong có thể 'bay lượn' tự do */}
        <div className="relative h-[500px] sm:h-[600px] w-full hidden md:block">
          {/* Ảnh 1: To nhất, nằm góc trên cùng bên phải */}
          <div className="absolute top-0 right-0 w-[60%] h-[55%] rounded-2xl overflow-hidden shadow-2xl z-10">
            <Image
              src="/about-1.jpg"
              alt="Không gian quán"
              fill
              className="object-cover"
            />
          </div>

          {/* Ảnh 2: Nằm giữa, hơi lệch trái, ĐÈ lên Ảnh 1 (z-20) */}
          <div className="absolute top-[30%] left-[5%] w-[45%] h-[50%] rounded-2xl overflow-hidden shadow-2xl z-20">
            <Image
              src="/about-2.jpg"
              alt="Pha chế cà phê"
              fill
              className="object-cover"
            />
          </div>

          {/* Ảnh 3: Nằm góc dưới bên phải */}
          <div className="absolute bottom-0 right-[4%] w-[45%] h-[35%] rounded-2xl overflow-hidden shadow-2xl z-10">
            <Image
              src="/about-3.jpg"
              alt="Hạt cà phê"
              fill
              className="object-cover"
            />
          </div>

          {/* Ảnh 4: Nhỏ nhất, nằm góc dưới cùng bên trái */}
          <div className="absolute bottom-[5%] left-[-21%] w-[25%] h-[25%] rounded-2xl overflow-hidden shadow-2xl z-0">
            <Image
              src="/about-4.jpg"
              alt="Chi tiết quán"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* --- GIAO DIỆN MOBILE (Chỉ hiện 1 ảnh cho gọn) --- */}
        <div className="md:hidden relative h-[350px] w-full rounded-2xl overflow-hidden mt-8">
          <Image
            src="/about-1.jpg"
            alt="Không gian quán"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
