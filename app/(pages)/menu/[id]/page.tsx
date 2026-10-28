import ProductDetail from "@/app/_components/ProductDetail";

// Hàm gọi API
async function getDrink(id: string) {
  try {
    const res = await fetch(`http://localhost:8081/api/products/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Sửa lại cách nhận params bằng 'any' để dễ xử lý
export default async function Page({ params }: any) {
  // 1. Phải await params đối với các bản Next.js mới
  const resolvedParams = await params;

  // 2. MẸO XỬ LÝ: Lấy thẳng giá trị đầu tiên (số 101) bên trong params
  // Dù thư mục bạn tên là [id] hay [productId] thì nó vẫn chạy đúng!
  const realId = Object.values(resolvedParams)[0] as string;

  // In ra Terminal để kiểm tra xem đã bắt đúng số 101 chưa
  console.log("Đã bắt được ID chính xác truyền lên Backend là:", realId);

  // Gọi API với ID chuẩn
  const drink = await getDrink(realId);

  if (!drink) {
    return (
      <div className="max-w-7xl mx-auto py-24 px-8 text-center min-h-screen">
        <h1 className="text-3xl text-primary-200">Không tìm thấy sản phẩm.</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <ProductDetail drink={drink} />
    </div>
  );
}
