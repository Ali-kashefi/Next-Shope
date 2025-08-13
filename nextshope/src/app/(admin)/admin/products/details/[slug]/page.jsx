"use client";
import React, { useEffect } from "react";
import Spiner from "@/components/ui/Spiner";
import { getOneproductBySlugAPI } from "@/service/ServicesMethode";
import Image from "next/image";
import { formatPrice } from "utils/priceFornater";
import { useMutatecontroler } from "@/hook/useMutatecontriler";
import { useParams } from "next/navigation";
function ProductDetailsPage({ params }) {
  const { slug } = useParams();
  const { data, error, isLoading, mutate } = useMutatecontroler({
    Api: getOneproductBySlugAPI,
  });
  useEffect(() => {
    const res = async () => {
      await mutate(slug);
    };
    res();
  }, [slug]);
  const { product } = data || {};
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary-50">
        <Spiner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary-50 text-red-600 text-lg">
        {error}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary-50 text-secondary-700 text-lg">
        محصولی با این مشخصات یافت نشد.
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-primary-50 p-4 md:p-8 flex flex-col items-center">
      <div className="bg-white rounded-lg shadow-xl p-6 md:p-10 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
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

        <div className="flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-primary-900 mb-4">
            {product.title}
          </h1>
          <p className="text-secondary-700 text-lg mb-6 leading-relaxed">
            {product.description}
          </p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-secondary-600">
              <span className="font-semibold text-primary-800">برند:</span>{" "}
              {product.brand}
            </div>
            <div className="text-secondary-600">
              <span className="font-semibold text-primary-800">دسته‌بندی:</span>{" "}
              {product.category?.title || "نامشخص"}
            </div>
            <div className="text-secondary-600">
              <span className="font-semibold text-primary-800">موجودی:</span>{" "}
              {formatPrice(product.countInStock)} عدد
            </div>
            <div className="text-secondary-600">
              <span className="font-semibold text-primary-800">امتیاز:</span>{" "}
              {product.rating} از ۵
            </div>
          </div>

          <div className="flex flex-col space-y-2 mb-8">
            <div className="text-2xl font-bold text-secondary-900">
              قیمت:{" "}
              <span
                className={
                  product.discount > 0 ? "line-through text-secondary-500" : ""
                }
              >
                {formatPrice(product.price)} تومان
              </span>
            </div>
            {product.discount > 0 && (
              <div className="text-3xl font-extrabold text-primary-700">
                قیمت با تخفیف: {formatPrice(product.offPrice)} تومان
              </div>
            )}
            {product.discount > 0 && (
              <div className="text-lg font-semibold text-red-600">
                {formatPrice(product.discount)}% تخفیف
              </div>
            )}
          </div>

          <div className="mt-auto pt-4 border-t border-secondary-200">
            <h4 className="text-lg font-semibold text-primary-800 mb-2">
              برچسب‌ها:
            </h4>
            <div className="flex flex-wrap gap-2">
              {product.tags && product.tags.length > 0 ? (
                product.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-primary-100 text-primary-700 text-sm px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))
              ) : (
                <span className="text-secondary-500">برچسبی موجود نیست.</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;
