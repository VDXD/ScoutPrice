// import Image from "next/image";
// import Link from "next/link";
// import { redirect } from "next/navigation";

// import { formatNumber } from "@/lib/utils";
// import { getProductById, getSimilarProducts } from "@/lib/action";
// import PriceInfo from "@/components/PriceInfoCard";
// import ProductCard from "@/components/ProductCard";
// import Modal from "@/components/Modal";

// export default async function ProductDetails({ params: { id } }) {
//   const product = await getProductById(id);

//   const similarProducts = await getSimilarProducts(id);

//   if (!product) {
//     redirect("/");
//   }

//   return (
//     <>
//       <div className="flex flex-col gap-16 flex-wrap px-6 md:px-20 py-24">
//         <div className="flex gap-28 xl:flex-row flex-col">
//           <div className="flex-grow xl:max-w-[50%] max-w-full py-16 bg-white border border-[#CDDBFF] rounded-[17px]">
//             <Image
//               src={product.image}
//               alt={product.title}
//               width={580}
//               height={400}
//               className="mx-auto"
//             />
//           </div>

//           <div className="flex-1 flex flex-col">
//             <div className="flex justify-between items-start gap-5 flex-wrap pb-6">
//               <div className="flex flex-col gap-3">
//                 <p className="text-[28px] text-white font-semibold">
//                   {product.title}
//                 </p>
//                 <Link
//                   href={product.url}
//                   target="_blank"
//                   className="text-base text-white opacity-50"
//                 >
//                   Visit Product
//                 </Link>
//               </div>

//               <div className="flex items-center gap-3">
//                 <div className="flex items-center gap-2 px-3 py-2 rounded-10">
//                   <Image
//                     src="/assets/icons/red-heart.svg"
//                     alt="like"
//                     width={20}
//                     height={20}
//                   />
//                   <p className="text-base font-semibold text-[#D46F77]">
//                     {product.reviewsCount}
//                   </p>
//                 </div>
//                 <div className="p-2 rounded-10">
//                   <Image
//                     src="/assets/icons/bookmark.svg"
//                     alt="bookmark"
//                     width={20}
//                     height={20}
//                   />
//                 </div>
//                 <div className="p-2 rounded-10">
//                   <Image
//                     src="/assets/icons/share.svg"
//                     alt="share"
//                     width={20}
//                     height={20}
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="flex items-center flex-wrap gap-10 py-6 border-y border-y-[#E4E4E4]">
//               <div className="flex flex-col gap-2">
//                 <p className="text-[34px] text-white font-bold">
//                   {product.currency} {formatNumber(product.currentPrice)}
//                 </p>
//                 <p className="text-[21px] text-white opacity-50 line-through">
//                   {product.currency} {formatNumber(product.originalPrice)}
//                 </p>
//               </div>
//               <div className="flex flex-col gap-4">
//                 <div className="flex gap-3">
//                   <div className="flex items-center gap-2 px-3 py-2 rounded-[27px]">
//                     <Image
//                       src="/assets/icons/star.svg"
//                       alt="star"
//                       width={16}
//                       height={16}
//                     />
//                     <p className="text-sm text-orange-400 font-semibold">
//                       {product.stars || "25"}
//                     </p>
//                   </div>

//                   <div className="flex items-center gap-2 px-3 py-2 bg-white-200 rounded-[27px]">
//                     <Image
//                       src="/assets/icons/comment.svg"
//                       alt="comment"
//                       width={16}
//                       height={16}
//                     />
//                     <p className="text-sm text-white font-semibold">
//                       {product.reviewsCount} Reviews
//                     </p>
//                   </div>
//                 </div>
//                 <p className="text-sm text-white opactiy-50">
//                   <span className="text-green-500 font-semibold">90% </span>
//                   buyers have recommeded this.
//                 </p>
//               </div>
//             </div>
//             <div className="my-7 flex flex-col gap-5">
//               <div className="flex gap-5 flex-wrap">
//                 <PriceInfo
//                   title="Current Price"
//                   iconSrc="/assets/icons/price-tag.svg"
//                   value={`${product.currency} ${formatNumber(
//                     product.currentPrice
//                   )}`}
//                 />
//                 <PriceInfo
//                   title="Average Price"
//                   iconSrc="/assets/icons/chart.svg"
//                   value={`${product.currency} ${formatNumber(
//                     product.averagePrice
//                   )}`}
//                 />
//                 <PriceInfo
//                   title="Highest Price"
//                   iconSrc="/assets/icons/arrow-up.svg"
//                   value={`${product.currency} ${formatNumber(
//                     product.highestPrice
//                   )}`}
//                 />
//                 <PriceInfo
//                   title="Lowest Price"
//                   iconSrc="/assets/icons/arrow-down.svg"
//                   value={`${product.currency} ${formatNumber(
//                     product.lowestPrice
//                   )}`}
//                 />
//               </div>
//             </div>
//             <Modal productId={id} />
//           </div>
//         </div>

//         <div className="flex flex-col gap-16">
//           <div className="flex flex-col gap-5">
//             <h3 className="text-2xl text-white font-semibold">
//               Product Description
//             </h3>

//             <div className="flex flex-col gap-4">
//               {product.description.split("\n")}
//             </div>
//           </div>

//           <button className="p-[3px] relative min-w-[200px] mx-auto">
//             <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-[30px]" />
//             <div className="py-4 px-4 bg-black hover:bg-opacity-70 rounded-[30px] text-white text-lg font-semibold w-full flex items-center justify-center gap-3 relative group transition duration-200 hover:bg-transparent">
//               <Image
//                 src="/assets/icons/bag.svg"
//                 alt="bag"
//                 width={22}
//                 height={22}
//               />
//               <Link
//                 href="/"
//                 className="text-base text-white group-hover:text-white"
//               >
//                 Buy Now
//               </Link>
//             </div>
//           </button>
//         </div>
//         {similarProducts && similarProducts?.length > 0 && (
//           <div className="py-14 flex flex-col gap-2 w-full">
//             <p className="text-white text-[32px] font-semibold">
//               Similar Products
//             </p>

//             <div className="flex flex-wrap gap-10 mt-7 w-full">
//               {similarProducts.map((product) => (
//                 <ProductCard key={product._id} product={product} />
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { formatNumber } from "@/lib/utils";
import { getProductById, getSimilarProducts } from "@/lib/action";
import PriceInfo from "@/components/PriceInfoCard";
import ProductCard from "@/components/ProductCard";
import Modal from "@/components/Modal";

export default async function ProductDetails({ params: { id } }) {
  const product = await getProductById(id);
  const similarProducts = await getSimilarProducts(id);

  if (!product) {
    redirect("/");
  }

  return (
    <>
      <div className="flex flex-col gap-10 md:gap-16 px-4 sm:px-6 md:px-20 py-12 md:py-24">
        <div className="flex flex-col xl:flex-row gap-8 xl:gap-28">
          <div className="flex-grow xl:max-w-[50%] bg-white border border-[#CDDBFF] rounded-[17px] p-6 sm:p-8">
            <Image
              src={product.image}
              alt={product.title}
              width={580}
              height={400}
              className="mx-auto"
            />
          </div>

          <div className="flex-1 flex flex-col">
            <div className="flex justify-between items-start gap-3 md:gap-5 flex-wrap pb-4 md:pb-6">
              <div className="flex flex-col gap-2 md:gap-3">
                <p className="text-xl md:text-[28px] text-white font-semibold">
                  {product.title}
                </p>
                <Link
                  href={product.url}
                  target="_blank"
                  className="text-sm md:text-base text-white opacity-50"
                >
                  Visit Product
                </Link>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-2 rounded-10">
                  <Image
                    src="/assets/icons/red-heart.svg"
                    alt="like"
                    width={20}
                    height={20}
                  />
                  <p className="text-sm md:text-base font-semibold text-[#D46F77]">
                    {product.reviewsCount}
                  </p>
                </div>
                <div className="p-2 rounded-10">
                  <Image
                    src="/assets/icons/bookmark.svg"
                    alt="bookmark"
                    width={20}
                    height={20}
                  />
                </div>
                <div className="p-2 rounded-10">
                  <Image
                    src="/assets/icons/share.svg"
                    alt="share"
                    width={20}
                    height={20}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center flex-wrap gap-5 md:gap-10 py-4 md:py-6 border-y border-y-[#E4E4E4]">
              <div className="flex flex-col gap-1 md:gap-2">
                <p className="text-2xl md:text-[34px] text-white font-bold">
                  {product.currency} {formatNumber(product.currentPrice)}
                </p>
                <p className="text-base md:text-[21px] text-white opacity-50 line-through">
                  {product.currency} {formatNumber(product.originalPrice)}
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex gap-3">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-[27px]">
                    <Image
                      src="/assets/icons/star.svg"
                      alt="star"
                      width={16}
                      height={16}
                    />
                    <p className="text-sm text-orange-400 font-semibold">
                      {product.stars || "25"}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 px-3 py-2 bg-white-200 rounded-[27px]">
                    <Image
                      src="/assets/icons/comment.svg"
                      alt="comment"
                      width={16}
                      height={16}
                    />
                    <p className="text-sm text-white font-semibold">
                      {product.reviewsCount} Reviews
                    </p>
                  </div>
                </div>
                <p className="text-sm text-white opacity-50">
                  <span className="text-green-500 font-semibold">90% </span>
                  buyers have recommended this.
                </p>
              </div>
            </div>

            <div className="my-5 md:my-7 flex flex-col gap-5">
              <div className="flex gap-3 md:gap-5 flex-wrap">
                <PriceInfo
                  title="Current Price"
                  iconSrc="/assets/icons/price-tag.svg"
                  value={`${product.currency} ${formatNumber(
                    product.currentPrice
                  )}`}
                />
                <PriceInfo
                  title="Average Price"
                  iconSrc="/assets/icons/chart.svg"
                  value={`${product.currency} ${formatNumber(
                    product.averagePrice
                  )}`}
                />
                <PriceInfo
                  title="Highest Price"
                  iconSrc="/assets/icons/arrow-up.svg"
                  value={`${product.currency} ${formatNumber(
                    product.highestPrice
                  )}`}
                />
                <PriceInfo
                  title="Lowest Price"
                  iconSrc="/assets/icons/arrow-down.svg"
                  value={`${product.currency} ${formatNumber(
                    product.lowestPrice
                  )}`}
                />
              </div>
            </div>

            <Modal productId={id} />
          </div>
        </div>

        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-5">
            <h3 className="text-xl md:text-2xl text-white font-semibold">
              Product Description
            </h3>
            <div className="flex flex-col gap-2 md:gap-4">
              {product.description.split("\n")}
            </div>
          </div>

          <button className="relative min-w-[160px] md:min-w-[200px] mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-[30px]" />
            <div className="py-4 px-4 bg-black hover:bg-opacity-70 rounded-[30px] text-white text-lg font-semibold w-full flex items-center justify-center gap-3 relative group transition duration-200 hover:bg-transparent">
              <Image
                src="/assets/icons/bag.svg"
                alt="bag"
                width={22}
                height={22}
              />
              <Link
                href="/"
                className="text-base text-white group-hover:text-white"
              >
                Buy Now
              </Link>
            </div>
          </button>
        </div>

        {similarProducts && similarProducts?.length > 0 && (
          <div className="py-8 md:py-14 flex flex-col gap-2 w-full">
            <p className="text-xl md:text-[32px] text-white font-semibold">
              Similar Products
            </p>

            <div className="flex flex-wrap gap-5 md:gap-10 mt-5 md:mt-7 w-full">
              {similarProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
