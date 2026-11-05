
"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";



export default function BannerSlider() {
  const slides = [
    {
      title: "Discover Your Next Favorite Book",
      description:
        "Explore thousands of stories, discover new authors and find the perfect book for your next reading adventure.",
      image: "/images/banners/banner1.jpg",
    },
    {
      title: "Every Book Opens a New World",
      description:
        "From exciting mysteries to inspiring stories, there is always something wonderful waiting for you.",
      image: "/images/banners/banner2.jpg",
    },
    {
      title: "Your Next Chapter Starts Here",
      description:
        "Discover, borrow and enjoy your favorite books with a simple and convenient library experience.",
      image: "/images/banners/banner3.jpg",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 pt-6">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        className="rounded-2xl overflow-hidden"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative flex min-h-[420px] items-center bg-cover bg-center px-8 py-16 md:px-16"
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
            >
              <div className="absolute inset-0 bg-black/55"></div>

              <div className="relative z-10 max-w-2xl text-white">
                <p className="mb-4 font-medium uppercase tracking-[3px] text-[#F2C879]">
                  Welcome to BookNook
                </p>

                <h1 className="mb-5 text-3xl font-bold leading-tight md:text-5xl">
                  {slide.title}
                </h1>

                <p className="mb-8 max-w-xl text-sm leading-7 text-gray-200 md:text-base">
                  {slide.description}
                </p>

                <Link
                  href="/all-books"
                  className="btn border-none bg-[#D9A65A] px-8 text-white hover:bg-white hover:text-[#173B57]"
                >
                  Browse Books
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
