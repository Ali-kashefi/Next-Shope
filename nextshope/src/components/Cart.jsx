"use client";
//User shopping cart and calculating discount price and final price.
//  Use of mutation controller which is a custom hook and is used to send information to the server and process errors.
//  Use of image component to make the component dynamic.
import React from "react";
import Image from "next/image";
import { formatPrice } from "utils/priceFornater";
import { useMutatecontroler } from "@/hook/useMutatecontriler";
import {
  addToCartAPI,
  removeproductfromcartbyIdAPI,
} from "@/service/ServicesMethode";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function CartItem({ product }) {


  const { isLoading: removeloading, mutate: mutateremovefromcart } =
    useMutatecontroler({
      Api: removeproductfromcartbyIdAPI,
    });
  const { mutate: mutateaddtocart } = useMutatecontroler({
    Api: addToCartAPI,
  });
  const queryclient = useQueryClient();

  const removecarthandler = async () => {
    try {
      const { message } = await mutateremovefromcart(product._id);
      toast.success(message);
      queryclient.invalidateQueries({ queryKey: ["get-user"] });
    } catch (error) {
      if (error?.response?.data) {
        toast.error(error.response.data.message);
      }
    }
  };

  const addcarthandler = async () => {
    try {
      const { message } = await mutateaddtocart(product._id);
      toast.success(message || `${product.title} به سبد خرید اضافه شد`);
      queryclient.invalidateQueries({ queryKey: ["get-user"] });
    } catch (error) {
      if (error?.response?.data) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-secondary-200 py-4 last:border-b-0 gap-4">
      <div className="flex flex-col sm:flex-row items-start gap-4 flex-1 min-w-0 w-full sm:w-auto">
        <div className="relative w-16 h-16 sm:w-24 sm:h-24 flex-shrink-0 rounded-lg overflow-hidden">
          <Image
            src={product.imageLink}
            alt={product.title}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
            quality={100}
          />
        </div>
        <div className="flex flex-col flex-grow mt-2 sm:mt-0">
          <h3 className="font-semibold text-secondary-800 text-base sm:text-xl truncate">
            {product.title}
          </h3>
          {product.discount !== undefined && product.discount !== null && (
            <span
              className={
                product.discount === 0
                  ? `hidden`
                  : `text-error font-medium text-xs sm:text-base`
              }
            >
              {formatPrice(product.discount)}% تخفیف
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col items-start sm:flex-row sm:items-center sm:gap-6 text-sm sm:text-base whitespace-nowrap w-full sm:w-auto mt-4 sm:mt-0 justify-between">
        <div className="flex items-center gap-2 mb-2 sm:mb-0 bg-secondary-100 rounded-lg p-1">
          <button
            onClick={removecarthandler}
            className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-md bg-secondary-200 text-secondary-800 font-bold text-base sm:text-lg hover:bg-secondary-300 transition-colors duration-200"
            aria-label={`کاهش تعداد ${product.title}`}
          >
            -
          </button>
          <span className="font-medium text-secondary-900 text-sm sm:text-base w-6 sm:w-8 text-center">
            {formatPrice(product.quantity)}
          </span>
          <button
            onClick={addcarthandler}
            className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-md bg-primary-700 text-secondary-50 font-bold text-base sm:text-lg hover:bg-secondary-300 transition-colors duration-200"
            aria-label={`افزایش تعداد ${product.title}`}
          >
            +
          </button>
        </div>
        {product.offPrice < 0 ? (
          <div className="flex flex-col items-start sm:items-start mb-2 sm:mb-0">
            <span className="text-secondary-500 line-through text-sm">
              {formatPrice(product.price)}
              <span className="text-xs"> تومان</span>
            </span>

            <span className="font-bold text-primary-800 text-base">
              {formatPrice(product.offPrice)}
              <span className="text-xs"> تومان</span>
            </span>
          </div>
        ) : null}
      </div>

      <div className="flex flex-col items-start sm:items-end text-base font-bold text-secondary-900 w-full sm:w-auto mt-4 sm:mt-0">
        <span>
          {formatPrice(product.price)}
          <span className="text-sm"> تومان</span>
        </span>
      </div>
    </div>
  );
}
