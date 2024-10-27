export default function Footer() {
  return (
    // <section className="px-6 md:px-20 py-18 flex flex-col md:flex-row  items-center md:items-start space-y-6 md:space-y-0 bg-gradient-to-b from-slate-900 to-neutral-950">

    //   <div className="w-full md:w-1/3">
    //     <p className="text-xs md:text-sm tracking-[-1.2px] text-white">
    //       Unlock a world of savings with our powerful price tracker. With
    //       features like price predictions, alerts, and a wishlist, shopping
    //       smarter has never been easier or more rewarding. Start saving today!
    //     </p>
    //   </div>

    //   <div className="w-full md:w-1/3 flex flex-col">
    //     <h2 className="text-sm md:text-lg tracking-[-1.2px] text-white mb-2">
    //       Contact Us
    //     </h2>
    //     <p className="text-xs md:text-sm text-white">
    //       Email: support@scoutprice.com
    //       <br />
    //       Phone: (123) 456-7890
    //       <br />
    //       Address: 123 Price Lane, Savings City, SC 12345
    //     </p>
    //   </div>

    //   <div className="w-full md:w-1/3 flex justify-center items-center text-center md:text-left">
    //     <p className="text-xs md:text-sm tracking-[-1.2px] text-white">
    //       © 2024 ScoutPrice. All rights reserved. | Licensed under XYZ License
    //     </p>
    //   </div>
    // </section>

    <section className="flex items-center justify-center px-6 md:px-20 py-24 bg-gradient-to-b from-slate-900 to-neutral-950">
      <div className="flex flex-col gap-6 items-center text-center">
        <p className="text-lg md:text-xl tracking-[-1.2px] text-white max-w-xl">
          Unlock a world of savings with our powerful price tracker. With
          features like price predictions, alerts, and a wishlist, shopping
          smarter has never been easier or more rewarding. Start saving today!
        </p>

        <div className="flex flex-col items-center">
          <h2 className="text-sm md:text-lg tracking-[-1px] text-white mb-2">
            Contact Us
          </h2>
          <p className="text-xs md:text-sm text-white text-center">
            Email: support@scoutprice.com
            <br />
            Phone: (123) 456-7890
            <br />
            Address: 123 some place, Some City, Somewhere 1234
          </p>
        </div>

        <div className="flex justify-center items-center text-center">
          <p className="text-xs md:text-sm tracking-[-1px] text-white">
            © 2024 ScoutPrice. All rights reserved. | Licensed under XYZ License
          </p>
        </div>
      </div>
    </section>
  );
}
