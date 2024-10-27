import Image from "next/image";

export default function KeyFeatureSectionn({
  feature,
  description,
  src,
  alt,
  isImageOnLeft,
}) {
  return (
    <>
      <section className="flex items-center justify-center px-6 md:px-20 py-10 bg-slate-900">
        <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-screen-lg">
          {isImageOnLeft && (
            <div className="w-full md:w-1/2 flex justify-center items-center mb-8 md:mb-0">
              <div className="relative sm:px-6 py-4 sm:py-8 pb-4 max-w-[250px] md:max-w-[350px] h-auto w-full bg-[#F2F4F7] rounded-[20px]">
                <Image
                  src={src}
                  alt={alt}
                  width={350}
                  height={350}
                  className="object-contain"
                />
              </div>
            </div>
          )}

          <div className="w-full md:w-1/2 flex flex-col gap-6 text-center md:text-left">
            <h1 className="text-4xl leading-[48px] md:leading-[72px] font-bold tracking-[-1.2px] text-white">
              {feature}
            </h1>
            <p className="text-sm md:text-2xl font-bold tracking-[-1.2px] text-white">
              {description}
            </p>
          </div>

          {!isImageOnLeft && (
            <div className="w-full md:w-1/2 flex justify-center items-center mt-8 md:mt-0">
              <div className="relative sm:px-6 py-4 sm:py-8 pb-4 max-w-[250px] md:max-w-[350px] h-auto w-full bg-[#F2F4F7] rounded-[20px]">
                <Image
                  src={src}
                  alt={alt}
                  width={350}
                  height={350}
                  className="object-contain"
                />
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
