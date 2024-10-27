import HeroCarousel from "./HeroCarousle";

export default function WelcomeSection() {
  return (
    <section className="px-6 md:px-20 py-18 flex flex-col md:flex-row justify-around items-center md:items-center space-y-6 md:space-y-0 bg-gradient-to-b from-neutral-950 to-slate-900">
      <div className="w-full md:w-1/2">
        <HeroCarousel />
      </div>
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <p className="text-2xl md:text-3xl font-bold tracking-[-1.2px] text-white text-center">
          Welcome to{" "}
          <span className="animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent">
            ScoutPrice
          </span>
          , your go-to tool for tracking product prices. Compare deals, set
          price alerts, and never miss out on savings. Simplify your shopping
          experience and save more with every purchase!
        </p>
      </div>
    </section>
  );
}
