
"use client";

import dynamic from "next/dynamic";

const BannerSlider = dynamic(
  () => import("./BannerSlider"),
  {
    ssr: false,
    loading: () => (
      <section className="mx-auto max-w-7xl px-4 pt-6">
        <div className="min-h-[420px] rounded-2xl bg-[#173B57]"></div>
      </section>
    ),
  }
);

export default function Banner() {
  return <BannerSlider />;
}
