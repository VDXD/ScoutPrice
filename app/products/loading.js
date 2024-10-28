export default function ProductSearchLoadingPage() {
  return (
    <>
      <section className="flex items-center justify-center px-6 md:px-20 pt-24 pb-6 text-center animate-pulse">
        <div className="flex flex-col gap-6 max-xl:flex-col w-full">
          <div className="h-10 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mx-auto mb-4"></div>
          <div className="h-8 bg-gray-200 rounded-full dark:bg-gray-700 w-80 mx-auto mb-2.5"></div>
          <div className="h-10 bg-gray-200 rounded-full dark:bg-gray-700 w-full max-w-xl mx-auto mb-4"></div>
          <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-60 mx-auto mb-2"></div>
        </div>
      </section>

      <section className="flex flex-col items-center justify-center px-6 md:px-20 py-2 text-center bg-gradient-to-b from-neutral-950 to-slate-900 animate-pulse">
        <div className="h-8 bg-gray-200 rounded-full dark:bg-gray-700 w-40 mb-4"></div>
        <div className="flex justify-center mt-8 w-full">
          <div className="h-60 bg-gray-300 rounded dark:bg-gray-700 w-full max-w-sm"></div>
        </div>
      </section>

      <section className="flex flex-col items-center justify-center px-6 md:px-20 py-16 text-center bg-slate-900 animate-pulse">
        <div className="h-8 bg-gray-200 rounded-full dark:bg-gray-700 w-64 mb-4"></div>
        <div className="flex flex-wrap justify-center gap-x-8 mt-8 gap-y-16 w-full">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-60 bg-gray-300 rounded dark:bg-gray-700 w-full max-w-xs"
            ></div>
          ))}
        </div>
      </section>
    </>
  );
}
