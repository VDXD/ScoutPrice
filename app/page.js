"use client";

import Footer from "@/components/Footer";
import KeyFeatureSectionn from "@/components/KeyFeatureSection";
import WelcomeSection from "@/components/Welcome";

import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);

  const handleShopClick = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      window.location.href = "/products";
    }, 100);
  };

  return (
    <>
      <section className="flex items-center justify-center px-6 md:px-20 py-24">
        <div className="flex flex-col gap-6 max-xl:flex-col text-center">
          <h1 className="mt-4 text-6xl leading-[72px] font-bold tracking-[-1.2px] text-white">
            Unleash the Power of
            <br />
            <span className="animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent">
              ScoutPrice
            </span>
          </h1>
          <p className="mt-6">
            Discover amazing deals effortlessly with a powerful price tracker
            <br />
            that hunts down the best discounts and price drops, making shopping
            <br />
            smarter and saving easier every day.
          </p>

          <Link href="/products" passHref>
            <div
              onClick={handleShopClick}
              className="flex items-center justify-center cursor-pointer"
            >
              <div className="p-[3px] relative cursor-pointer max-w-sm">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
                <div className="px-8 py-2 bg-black rounded-[6px] font-bold relative group transition duration-200 text-white hover:bg-transparent">
                  {loading ? "Loading..." : "Shop Smarter"}
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      <WelcomeSection />

      <section className="flex flex-col items-center justify-center px-6 md:px-20 py-10 bg-slate-900">
        <div className="flex flex-col gap-6 text-center">
          <h1 className="mt-4 text-4xl leading-[72px] font-bold tracking-[-1.2px] text-white">
            Key Features of{" "}
            <span className="animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent">
              ScoutPrice
            </span>
          </h1>
        </div>
      </section>

      <KeyFeatureSectionn
        feature="Price Prediction"
        description="Unlock smarter shopping with a tool that not only tracks price
              drops but also predicts future price trends, helping you time your
              purchases for maximum savings."
        src="/assets/images/pricePrediction.svg"
        alt="PricePrediction"
        isImageOnLeft={false}
      />

      <KeyFeatureSectionn
        feature="Price Alert"
        description="Stay ahead of the game with real-time alerts that notify you when prices drop to your desired level, ensuring you never miss a great deal again."
        src="/assets/images/PriceAlert.svg"
        alt="PriceAlert"
        isImageOnLeft
      />

      <KeyFeatureSectionn
        feature="Price History"
        description="Gain insights into pricing trends with comprehensive price history data, allowing you to make informed decisions based on past fluctuations and anticipate future changes."
        src="/assets/images/priceHistory.svg"
        alt="PriceHistory"
        isImageOnLeft={false}
      />

      <KeyFeatureSectionn
        feature="Wishlist"
        description="Easily curate your favorite products in a personalized wishlist, and receive timely notifications when their prices drop, so you can snag them at the best deal."
        src="/assets/images/wishList.svg"
        alt="WishList"
        isImageOnLeft
      />

      <Footer />
    </>
  );
}
