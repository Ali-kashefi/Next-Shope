"use client";

import CheckBox from "@/components/ui/CheckBox";
import React, { useCallback, useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
function ProductFillter({ categories }) {
  const router = useRouter();
  const pathname = usePathname();
  const  searchParams = useSearchParams();
  const [selectedCategories, setSelectedCategories] = useState(
    searchParams.get("category")?.split(",") || []
  );

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const categoryHandler = (e) => {
    const value = e.target.value;

    if (selectedCategories.includes(value)) {
      const categories = selectedCategories.filter((c) => c !== value);

      setSelectedCategories(categories);
      router.push(pathname + "?" + createQueryString("category", categories));
    } else {
      setSelectedCategories([...selectedCategories, value]);
      router.push(
        pathname +
          "?" +
          createQueryString("category", [...selectedCategories, value])
      );
    }
  };
  return (
    <div className="flex flex-col gap-y-4">
      <h2 className="text-sm font-bold">دسته‌بندی</h2>
      <div className="space-y-2">
        {categories?.map((data) => (
          <CheckBox
            key={data._id}
            id={data._id}
            value={data.englishTitle}
            name="category-type"
            checked={selectedCategories.includes(data.englishTitle)}
            label={data.title}
            onChange={categoryHandler}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductFillter;
