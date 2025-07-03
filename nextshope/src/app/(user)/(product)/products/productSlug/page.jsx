"use client";

import React from "react";

import ProductFillter from "./ProductFillter";
import ProductSort from "./ProductSort";


function CategorySideBar({ categories }) {
 

  return (
    <>
      <div className="
        w-full lg:w-64 xl:w-72
        bg-secondary-0
        rounded-lg
        shadow-lg
        p-6
        space-y-8
        border border-secondary-200
        overflow-y-auto
      ">
        <ProductFillter categories={categories} />
        <ProductSort />
      </div>
    </>
  );
}

export default CategorySideBar;