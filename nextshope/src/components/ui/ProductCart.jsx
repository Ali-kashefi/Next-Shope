import Image from "next/image";
import React from "react";
import LikeComponent from "./LikeComponent";
import Link from "next/link";

function ProductCart({ src, title, description, price, date, product }) {
  return (
    <div className="p-4 rounded-lg bg-white shadow-md w-72 h-96 flex flex-col">
      <div className="relative h-3/5 rounded-lg overflow-hidden mb-4">
        <Link href={`/products/${product.slug}`}>
         <div className="flex justify-center items-center p-4">
                  <Image
                    src={product.imageLink || "/placeholder-image.png"}
                    alt={product.title}
                    width={400}
                    height={400}
                    layout="responsive"
                    objectFit="contain"
                    className="rounded-lg border border-primary-200"
                    quality={100}
                  />
                </div>
        </Link>

        <div className="absolute top-2 right-2 z-10">
          <LikeComponent product={product} />
        </div>
      </div>
      <Link href={`/products/${product.slug}`}>
        <div className="flex flex-col flex-grow p-3 bg-gray-50 rounded-lg">
          <h2 className="font-bold text-lg mb-1 text-gray-800">{title}</h2>
          <p className="text-sm text-gray-600 mb-2 line-clamp-2">
            {description}
          </p>
          <p className="font-bold text-blue-600 text-xl mt-auto">
            {price.toLocaleString("fa-IR")} تومان
          </p>
          <input type="hidden" readOnly value={date} />
        </div>
      </Link>
    </div>
  );
}

export default ProductCart;
