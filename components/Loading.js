"use client";

import { useState } from "react";

export default function Loading() {
  const [loading, setLoading] = useState(false);

  function handelLoading() {
    setLoading(true);
  }

  return <div onClick={handelLoading}>{loading ? "Loading" : ""}</div>;
}
