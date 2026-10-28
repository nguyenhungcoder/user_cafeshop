"use client";
import { useState } from "react";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/solid";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  const faqs = [
    {
      q: "Quán có chỗ đỗ xe ô tô không?",
      a: "Dạ có, quán có bãi đỗ xe rộng rãi hoàn toàn miễn phí.",
    },
    {
      q: "Quán có bán hạt cà phê rang sẵn không?",
      a: "Dạ có, chúng tôi có các gói hạt 250g và 500g đã rang mộc.",
    },
  ];

  return (
    <section className="py-24 bg-primary-950 px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl text-accent-400 mb-10 text-center uppercase">
          Câu hỏi thường gặp
        </h2>
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border-b border-primary-800 py-4 cursor-pointer"
            onClick={() => setOpen(open === index ? null : index)}
          >
            <div className="flex justify-between items-center text-primary-100 text-xl">
              <span>{faq.q}</span>
              {open === index ? (
                <MinusIcon className="h-6 w-6" />
              ) : (
                <PlusIcon className="h-6 w-6" />
              )}
            </div>
            {open === index && (
              <p className="text-primary-400 mt-4 leading-relaxed">{faq.a}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
