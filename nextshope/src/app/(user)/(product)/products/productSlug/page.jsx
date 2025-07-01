"use client";

import React from "react";

import ProductFillter from "./ProductFillter";
import ProductSort from "./ProductSort";


function CategorySideBar({ categories }) {
 
  const nam="maede "
  console.log(nam);
  

  return (
    <>
      <div className="border-2 border-secondary-100 rounded-tl-4xl overflow-y-auto shadow-md p-4">
        <ProductFillter categories={categories}/>
        <ProductSort/>
      </div>
    </>
  );
}

export default CategorySideBar;