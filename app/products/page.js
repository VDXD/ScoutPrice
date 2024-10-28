import SearchBar from "@/components/SearchBar";
import { getAllProduct } from "@/lib/action";
import ProductCard from "@/components/ProductCard";

export default async function ProductPage() {
  const allProducts = await getAllProduct();

  const latestProduct = allProducts?.[allProducts.length - 1];

  return (
    <>
      <section className="flex items-center justify-center px-6 md:px-20 pt-24 pb-6 text-center">
        <div className="flex flex-col gap-6 max-xl:flex-col">
          <h1 className="mt-4 text-6xl leading-[72px] font-bold tracking-[-1.2px] text-white">
            Find the{" "}
            <span className="animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent">
              Best Deals
            </span>{" "}
            in Seconds
          </h1>
          <p className="mt-6">
            Start your search below to discover unbeatable prices and stay
            updated with the latest discounts.
          </p>
          <SearchBar />
          <p className="mt-3">
            Your searched product will appear below. Please enter a product link
            to get started!
          </p>
        </div>
      </section>

      {latestProduct ? (
        <section className="flex flex-col items-center justify-center px-6 md:px-20 py-2 text-center bg-gradient-to-b from-neutral-950 to-slate-900">
          <h2 className="text-white text-[32px] font-semibold">
            Searched Product
          </h2>
          <div className="flex justify-center mt-8 w-full">
            <ProductCard product={latestProduct} />
          </div>
        </section>
      ) : (
        <section className="flex flex-col items-center justify-center px-6 md:px-20 py-2 text-center bg-gradient-to-b from-neutral-950 to-slate-900">
          <h2 className="text-white text-[32px] font-semibold">
            No recent product
          </h2>
        </section>
      )}

      {allProducts && (
        <section className="flex flex-col items-center justify-center px-6 md:px-20 py-16 text-center bg-slate-900">
          <h2 className="text-white text-[32px] font-semibold">
            Recent Searched Products
          </h2>
          <div className="flex flex-wrap justify-center gap-x-8 mt-8 gap-y-16 w-full">
            {allProducts
              ?.slice(0, -1)
              .reverse()
              .map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
        </section>
      )}
    </>
  );
}
