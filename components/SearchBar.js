"use client";

import { scrapAndStoreProduct } from "@/lib/action";
import { useState } from "react";

function isValidAmazonProductLink(url) {
  try {
    const parsedURL = new URL(url);
    const hostname = parsedURL.hostname;

    if (
      hostname.includes("amazon.com") ||
      hostname.includes("amazon.") ||
      hostname.includes("amazon")
    ) {
      return true;
    }
  } catch (error) {
    return false;
  }

  return false;
}

export default function SearchBar() {
  const [searchPrompt, setSearchPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handelSumbit(event) {
    event.preventDefault();

    const isValidLink = isValidAmazonProductLink(searchPrompt);

    if (isValidLink) {
      alert("Please provide valid amazon link");
    }

    try {
      setIsLoading(true);

      const product = await scrapAndStoreProduct(searchPrompt);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form className="flex flex-wrap gap-4 mt-12" onSubmit={handelSumbit}>
      <input
        type="text"
        value={searchPrompt}
        onChange={(event) => setSearchPrompt(event.target.value)}
        placeholder="Enter Product link"
        className="flex-1 min-w-[200px] w-full p-3 border border-gray-300 rounded-lg shadow-xs text-base text-black focus:outline-none placeholder-gray-600"
      />

      <button
        type="submit"
        className="p-[3px] relative"
        disabled={searchPrompt === ""}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
        <div className="px-8 py-2  bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent">
          {isLoading ? "Searching..." : "Search"}
        </div>
      </button>
    </form>
  );
}
