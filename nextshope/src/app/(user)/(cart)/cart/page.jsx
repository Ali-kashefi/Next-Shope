"use client";

import CartItem from "@/components/Cart";
import Spiner from "@/components/ui/Spiner";
import useGetUser from "@/hook/useGetUser";
import { useMutatecontroler } from "@/hook/useMutatecontriler";
import { createpeymentAPI } from "@/service/ServicesMethode";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";
import { formatPrice } from "utils/priceFornater";

function CartPage() {
  const { user, data, isLoading } = useGetUser();
  const { isLoading: ispeymenting, mutate: peymentmutate } = useMutatecontroler(
    { Api: createpeymentAPI }
  );
  const queryclient = useQueryClient();

  const { cart } = data || {};
  const createpeymenthandler = async () => {
    try {
      const { message } = await peymentmutate();
      toast.success(message);
      queryclient.invalidateQueries({ queryKey: ["get-user"] });
    } catch (error) {
      if (error?.response?.data) {
        toast.error(error.response.data.message);
      }
    }
  };
  if (isLoading) {
    return <Spiner />;
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center mt-12">
        <h1 className="text-secondary-900 font-bold">ابتدا وارد سایت شوید</h1>
        <Link href="/signup">
          <p className="text-primary-800 font-bold">ثبت نام</p>
        </Link>
      </div>
    );
  }

  if (!user.cart || user.cart.products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-12">
        <h1 className="text-secondary-900 font-bold"> سبد خرید خالی است</h1>
        <Link href="/products">
          <p className="text-primary-800 font-bold"> صفحه محصولات</p>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-background-app-rgb rounded-xl shadow-lg border border-secondary-100">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-secondary-900 mb-6 border-b pb-4">
        سبد خرید شما
      </h2>

      {cart &&
        cart.productDetail.map((item) => (
          <div key={item._id} className="space-y-4">
            <CartItem product={item} />
          </div>
        ))}

      <div className="mt-8 pt-6 border-t border-secondary-200 flex flex-col sm:flex-row justify-between items-center">
        <div className="flex flex-col items-end sm:items-start mb-4 sm:mb-0">
          <span className="text-secondary-500 line-through text-base sm:text-lg mb-1">
            {formatPrice(cart.payDetail.totalGrossPrice)} تومان
          </span>

          <span className="text-error font-medium text-sm sm:text-base mb-1">
            {formatPrice(cart.payDetail.totalOffAmount)} تومان تخفیف
          </span>

          <h3 className="font-bold text-primary-900 text-2xl sm:text-3xl">
            مجموع کل:
            <span className="mr-2">
              {cart?.payDetail ? formatPrice(cart.payDetail.totalPrice) : "---"}
              <span className="text-base sm:text-lg mr-1">تومان</span>
            </span>
          </h3>
        </div>

        <button
          onClick={createpeymenthandler}
          className="mt-6 sm:mt-0 px-8 py-3 bg-primary-700 text-white rounded-lg font-semibold hover:bg-primary-800 transition-colors duration-300 shadow-md"
        >
          نهایی کردن خرید
        </button>
      </div>
    </div>
  );
}

export default CartPage;
