"use client";
import Radio from "@/components/ui/Radio";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
const optionSort = [
  { id: 1, value: "latest", lable: "جدیدترین " },
  { id: 2, value: "erarlist", lable: "قدیمی ترین" },
  { id: 3, value: "populer", lable: "محبوب ترین" },
];
function ProductSort() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [sort, setSort] = useState("");
  const craetQueryString = useCallback((name, value) => {
    const params = new URLSearchParams(searchParams);
    params.set(name, value);
    return params.toString();
  });
  const sortHandler = (e) => {
    const value = e.target.value;
    setSort(e.target.value);
    router.push(`${pathname}?${craetQueryString("sort", value)}`);
  };
  useEffect(() => {
    setSort(searchParams.get("sort") || "");
  }, [searchParams]);
  return (
    <div className="flex flex-col gap-y-4">
      <h2 className="text-sm font-bold">مرتب‌سازی</h2>
      <div className="space-y-2">
        {optionSort.map((i) => (
          <Radio
            key={i.id}
            id={i.id}
            value={i.value}
            label={i.lable}
            name="product-sort"
            checked={sort === i.value || ""}
            onChange={sortHandler}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductSort;
