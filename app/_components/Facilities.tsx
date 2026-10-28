import {
  WifiIcon,
  MapPinIcon,
  BeakerIcon,
  ClockIcon,
  ComputerDesktopIcon,
  CakeIcon,
  CreditCardIcon,
  BuildingStorefrontIcon,
} from "@heroicons/react/24/outline";

export default function Facilities() {
  // Mình đã thêm 4 tiện ích mới cho đủ bộ 8 món, xếp thành 2 hàng cực đẹp
  const facilities = [
    {
      name: "Bãi đỗ xe",
      icon: (
        <MapPinIcon
          className="w-14 h-14 mb-4 text-primary-50"
          strokeWidth={1}
        />
      ),
    },
    {
      name: "Wifi tốc độ cao",
      icon: (
        <WifiIcon className="w-14 h-14 mb-4 text-primary-50" strokeWidth={1} />
      ),
    },
    {
      name: "Pha chế thủ công",
      icon: (
        <BeakerIcon
          className="w-14 h-14 mb-4 text-primary-50"
          strokeWidth={1}
        />
      ),
    },
    {
      name: "Không gian làm việc",
      icon: (
        <ComputerDesktopIcon
          className="w-14 h-14 mb-4 text-primary-50"
          strokeWidth={1}
        />
      ),
    },
    {
      name: "Mở cửa 24/7",
      icon: (
        <ClockIcon className="w-14 h-14 mb-4 text-primary-50" strokeWidth={1} />
      ),
    },
    {
      name: "Bánh ngọt mỗi ngày",
      icon: (
        <CakeIcon className="w-14 h-14 mb-4 text-primary-50" strokeWidth={1} />
      ),
    },
    {
      name: "Khu vực ngoài trời",
      icon: (
        <BuildingStorefrontIcon
          className="w-14 h-14 mb-4 text-primary-50"
          strokeWidth={1}
        />
      ),
    },
    {
      name: "Thanh toán thẻ",
      icon: (
        <CreditCardIcon
          className="w-14 h-14 mb-4 text-primary-50"
          strokeWidth={1}
        />
      ),
    },
  ];

  return (
    <section className="py-24 px-8 max-w-7xl mx-auto">
      {/* PHẦN TIÊU ĐỀ & MÔ TẢ (Giống hệt trang mẫu) */}
      <div className="text-center mb-20 max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl text-primary-50 uppercase font-semibold tracking-[0.2em] mb-6">
          Dịch vụ & Tiện ích
        </h2>
        <p className="text-primary-200 text-lg leading-relaxed">
          Tận hưởng không gian lý tưởng với Wifi tốc độ cao, khu vực làm việc
          yên tĩnh và cà phê đặc sản được pha chế thủ công. Mọi chi tiết tại
          Nghiêm Lập Trình Coffee đều được thiết kế để nâng tầm trải nghiệm của
          bạn.
        </p>
      </div>

      {/* PHẦN GRID ICON */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-y-16 gap-x-8">
        {facilities.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center group"
          >
            {/* Sử dụng group-hover để icon nảy lên một chút khi di chuột vào */}
            <div className="transform transition-transform duration-300 group-hover:-translate-y-2">
              {item.icon}
            </div>
            <span className="text-primary-100 font-medium text-lg tracking-wide group-hover:text-accent-400 transition-colors">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
