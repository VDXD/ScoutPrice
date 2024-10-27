import Image from "next/image";
import Link from "next/link";

const navIcons = [
  { src: "/assets/icons/search.svg", atl: "searchIcon" },
  { src: "/assets/icons/black-heart.svg", atl: "blackHeart" },
  { src: "/assets/icons/user.svg", atl: "user" },
];

export default function NavBar() {
  return (
    <header className="w-full">
      <nav className="flex justify-between items-center px-6 md:px-20 py-4">
        <Link href="/" className="flex items-center gap-1">
          <p className="font-poppins text-[26px] text-white font-bold">
            Scout<span className="text-blue-700">Price</span>
          </p>
        </Link>
        <div className="flex items-center gap-5">
          {navIcons.map((icon) => (
            <Image
              key={icon.atl}
              src={icon.src}
              alt={icon.alt}
              width={28}
              height={28}
            />
          ))}
        </div>
      </nav>
    </header>
  );
}
