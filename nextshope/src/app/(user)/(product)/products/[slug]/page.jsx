import { getOneproductBySlugAPI } from "@/service/ServicesMethode";
import React, { Suspense } from "react";
import AddtoCart from "./AddtoCart";
import Image from "next/image";
import Spiner from "@/components/ui/Spiner";

async function Productslug({ params }) {
  const { slug } = params;
  const { product } = await getOneproductBySlugAPI(slug);

  const hasDiscount =
    product.discount > 0 &&
    product.offPrice &&
    product.offPrice < product.price;
  const finalPrice = hasDiscount ? product.offPrice : product.price;

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl overflow-hidden max-w-4xl w-full flex flex-col md:flex-row">
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

        <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
              {product.title}
            </h1>
            <p className="text-gray-600 text-sm mb-2">
              برند: <span className="font-semibold">{product.brand}</span>
            </p>
            <p className="text-gray-600 text-sm mb-4">
              دسته‌بندی:{" "}
              <span className="font-semibold">
                {product.category?.title || "نامشخص"}
              </span>
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              {product.description}
            </p>

            <div className="mb-6 flex items-baseline">
              {hasDiscount && (
                <span className="text-gray-500 line-through text-lg ml-3">
                  {product.price.toLocaleString("fa-IR")} تومان
                </span>
              )}
              <span className="text-primary-700 text-3xl font-bold">
                {finalPrice.toLocaleString("fa-IR")} تومان
              </span>
              {product.offPrice && (
                <span className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded-full mr-2">
                  %{product.offPrice} تخفیف!
                </span>
              )}
            </div>

            <div className="text-gray-700 mb-4">
              <p>
                موجود در انبار:{" "}
                <span className="font-semibold">
                  {product.countInStock > 0
                    ? `${product.countInStock} عدد`
                    : "ناموجود"}
                </span>
              </p>
              <p>
                امتیاز: <span className="font-semibold">{product.rating}</span>{" "}
                ({product.numReviews} نظر)
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <Suspense fallback={<Spiner/>}>
            <AddtoCart product={product} />
            </Suspense>
            <button className="w-full sm:w-auto px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition-colors duration-300">
              افزودن به لیست علاقه‌مندی
            </button>
          </div>

          <div className="mt-4 text-xs text-gray-500">
            <p>
              تاریخ انتشار:{" "}
              {new Date(product.createdAt).toLocaleDateString("fa-IR")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Productslug;
