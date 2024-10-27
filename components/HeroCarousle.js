"use client";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";

const heroImages = [
  { imgUrl: "/assets/images/hero-1.svg", alt: "smart watch" },
  { imgUrl: "/assets/images/hero-2.svg", alt: "bag" },
  { imgUrl: "/assets/images/hero-3.svg", alt: "lamp" },
  { imgUrl: "/assets/images/hero-4.svg", alt: "air fryer" },
  { imgUrl: "/assets/images/hero-5.svg", alt: "chair" },
];

export default function HeroCarousel() {
  return (
    <>
      <div className="relative sm:px-6 py-4 sm:py-8 pb-4 max-w-[400px] h-[500px] w-full bg-[#F2F4F7] rounded-[20px] sm:mx-auto">
        <Carousel
          showThumbs={false}
          autoPlay
          infiniteLoop
          interval={2000}
          showArrows={false}
          showStatus={false}
        >
          {heroImages.map((image) => (
            <Image
              src={image.imgUrl}
              alt={image.alt}
              width={350}
              height={350}
              className="object-contain"
              key={image.alt}
            />
          ))}
        </Carousel>

        <Image
          src="assets/icons/hand-drawn-arrow.svg"
          alt="arrow"
          width={175}
          height={175}
          className="max-xl:hidden absolute -right-[40%] -rotate-45 -top-[20%]"
        />
      </div>
    </>
  );
}
