"use client";

import React, { Suspense } from "react";

import ProductFillter from "./ProductFillter";
import ProductSort from "./ProductSort";
import Spiner from "@/components/ui/Spiner";


function CategorySideBar({ categories }) {
 

  return (
    <>
      <div className="
        w-full 
        bg-secondary-0
        rounded-lg
        shadow-lg
        p-6
        space-y-8
        border border-secondary-200
        overflow-y-auto
      ">
        <Suspense fallback={<Spiner/>}>
        <ProductFillter categories={categories} />
        <ProductSort />
        </Suspense>
      </div>
    </>
  );
}

export default CategorySideBar;