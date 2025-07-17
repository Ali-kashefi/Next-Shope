"use client";
import Button from "@/components/ui/Buttone";
import Spiner from "@/components/ui/Spiner";
import useGetUser from "@/hook/useGetUser";
import { useMutatecontroler } from "@/hook/useMutatecontriler";
import { addToCartAPI } from "@/service/ServicesMethode";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

function AddtoCart({ product }) {
  const { user } = useGetUser();
  const { error, mutate, isLoading } = useMutatecontroler({
    Api: addToCartAPI,
  });

  const router = useRouter();
  const queryclient = useQueryClient();

  const addToCarthandler = async () => {
    if (!user) {
      toast.error("لطفا ابتدا وارد شوید");
      router.push("/signup");
      return;
    }
    try {
      const { message } = await mutate(product._id);
      toast.success(message);
      queryclient.invalidateQueries({ queryKey: ["get-user"] });
    } catch (err) {
      if (error?.response?.data) {
        toast.error(error.response.data.message);
      }
    }
  };
  const isCart = (user, product) => {
    if (!user) return false;
    return user.cart?.products.some((p) => p.productId === product._id);
  };

  return (
    <div>
      {isCart(user, product) ? (
        <Link href="/cart">
          <Button
            isLoading={isLoading}
            children="سبد خرید"
            className=" bg-primary-800 w-full sm:w-auto px-6 py-3 rounded-lg text-white font-semibold transition-colors duration-300"
          />
        </Link>
      ) : (
        <Button
          isLoading={isLoading}
          onClick={addToCarthandler}
          btnType="btn"
          children={product.countInStock > 0 ? "افزودن به سبد خرید" : "ناموجود"}
          className={`w-full sm:w-auto px-6 py-3 rounded-lg text-white font-semibold transition-colors duration-300 ${
            product.countInStock > 0
              ? " bg-primary-800"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        />
      )}
    </div>
  );
}

export default AddtoCart;
