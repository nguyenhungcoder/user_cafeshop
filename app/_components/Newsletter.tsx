import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

export default function Newsletter() {
  return (
    // Mình giữ lại pt-20 để tạo khoảng cách phía trên
    <section className="bg-primary-950 pt-20 px-8 text-primary-200 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center mb-20">
        <h2 className="text-3xl md:text-4xl font-bold tracking-[0.2em] mb-4 uppercase text-primary-50">
          Newsletter
        </h2>
        <p className="mb-8 text-primary-200">
          Đăng ký nhận bản tin để cập nhật những hương vị cà phê mới và ưu đãi
          đặc biệt!
        </p>
        <form className="flex w-full max-w-lg border border-primary-800 rounded-sm overflow-hidden focus-within:border-accent-500 transition-colors">
          <input
            type="email"
            placeholder="Email Address"
            className="bg-transparent flex-1 px-6 py-3 outline-none text-primary-100 placeholder:text-primary-600"
            required
          />
          <button
            type="submit"
            className="px-6 py-3 border-l border-primary-800 flex items-center gap-2 hover:bg-primary-900 transition-colors text-primary-50"
          >
            Subscribe <PaperAirplaneIcon className="w-5 h-5 -rotate-45" />
          </button>
        </form>
      </div>
    </section>
  );
}
