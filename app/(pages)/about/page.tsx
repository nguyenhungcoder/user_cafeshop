import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "The Coffee Shop",
  description:
    "Khám phá câu chuyện và nghệ thuật rang xay tại The Coffee Shop.",
};

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-8 py-16 md:py-24 min-h-screen overflow-hidden">
      {/* TIÊU ĐỀ TRANG: Xuất hiện ngay (0s) */}
      <div className="text-center mb-24 animate-slide-up">
        <h1 className="text-4xl md:text-5xl text-accent-400 font-bold mb-8 uppercase tracking-widest">
          Câu chuyện của chúng tôi
        </h1>
        <p className="text-primary-200 text-lg md:text-xl max-w-3xl mx-auto font-light leading-relaxed text-justify md:text-center">
          The Coffee Shop không chỉ là một quán cà phê, mà là kết quả của một
          hành trình tìm kiếm sự hoàn hảo. Chúng tôi tin rằng cà phê là nghệ
          thuật, và mỗi ly cà phê phục vụ là một bản giao hưởng của hương thơm
          và vị giác.
        </p>
      </div>

      {/* SECTION 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center mb-32">
        {/* Chữ bên trái: Bay từ trái vào - Trễ 0.4s */}
        <div
          className="flex flex-col justify-center animate-slide-in-left"
          style={{ animationDelay: "0.4s" }}
        >
          <span className="text-sm uppercase tracking-[0.3em] text-primary-400 mb-4">
            Khởi nguồn
          </span>
          <h2 className="text-3xl md:text-4xl text-primary-50 font-semibold mb-6 uppercase tracking-wide leading-tight">
            Từ những hạt mầm tinh túy nhất
          </h2>
          <p className="text-primary-200 text-lg leading-relaxed mb-6 text-justify font-light">
            Được tuyển chọn kỹ lưỡng từ những vùng trồng đặc hữu hàng đầu, mỗi
            hạt cà phê tại Coffee Shop đều mang trong mình hơi thở của đại ngàn.
          </p>
          <p className="text-primary-200 text-lg leading-relaxed text-justify font-light">
            Chúng tôi làm việc trực tiếp với những người nông dân tâm huyết, duy
            trì quy trình thu hoạch thủ công và rang xay mộc 100% nguyên chất để
            giữ trọn vẹn hương vị nguyên bản, đậm đà và không pha tạp.
          </p>
        </div>

        {/* Ảnh bên phải: Bay từ phải vào - Trễ 0.8s */}
        <div
          className="relative h-[400px] md:h-[550px] w-full rounded-sm overflow-hidden shadow-2xl border border-primary-800 group animate-slide-in-right"
          style={{ animationDelay: "0.8s" }}
        >
          <Image
            src="/about-1.jpg"
            alt="Nông trại cà phê"
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-110"
          />
        </div>
      </div>

      {/* SECTION 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center mb-32">
        {/* Ảnh bên trái (So le): Bay từ trái vào - Trễ 1.2s */}
        <div
          className="relative h-[400px] md:h-[550px] w-full rounded-sm overflow-hidden shadow-2xl border border-primary-800 group order-2 md:order-1 animate-slide-in-left"
          style={{ animationDelay: "1.2s" }}
        >
          <Image
            src="/about-2.jpg"
            alt="Pha chế cà phê chuyên nghiệp"
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-110"
          />
        </div>

        {/* Chữ bên phải: Bay từ phải vào - Trễ 1.6s */}
        <div
          className="flex flex-col justify-center order-1 md:order-2 animate-slide-in-right"
          style={{ animationDelay: "1.6s" }}
        >
          <span className="text-sm uppercase tracking-[0.3em] text-primary-400 mb-4">
            Kỹ thuật
          </span>
          <h2 className="text-3xl md:text-4xl text-primary-50 font-semibold mb-6 uppercase tracking-wide leading-tight">
            Nghệ thuật pha chế thủ công
          </h2>
          <p className="text-primary-200 text-lg leading-relaxed mb-10 text-justify font-light">
            Các Barista của chúng tôi không ngừng sáng tạo để mang đến trải
            nghiệm hương vị đột phá nhưng vẫn giữ nét mộc mạc nguyên thủy. Từng
            giọt cà phê chắt lọc là sự tỉ mỉ, căn chỉnh nhiệt độ và thời gian
            hoàn hảo.
          </p>

          <div className="grid grid-cols-2 gap-8 border-t border-primary-800 pt-8">
            <div>
              <span className="text-5xl font-bold text-accent-400 block mb-2">
                5
              </span>
              <span className="text-xs md:text-sm uppercase tracking-[0.2em] text-primary-300">
                Vùng trồng
              </span>
            </div>
            <div>
              <span className="text-5xl font-bold text-accent-400 block mb-2">
                12
              </span>
              <span className="text-xs md:text-sm uppercase tracking-[0.2em] text-primary-300">
                Món Signature
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* CALL TO ACTION CUỐI TRANG: Trượt từ dưới lên - Trễ 2.0s */}
      <div
        className="text-center mt-20 md:mt-32 border-t border-primary-900 pt-20 animate-slide-up"
        style={{ animationDelay: "2s" }}
      >
        <h3 className="text-2xl md:text-3xl text-primary-50 mb-10 uppercase tracking-widest font-semibold">
          Bắt đầu hành trình vị giác của bạn
        </h3>
        <Link
          href="/menu"
          className="inline-block bg-accent-500 text-primary-900 font-bold px-10 py-5 uppercase tracking-widest hover:bg-accent-600 transition-all shadow-lg active:scale-95"
        >
          Khám phá thực đơn
        </Link>
      </div>
    </div>
  );
}
