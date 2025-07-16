"use client";
import { HeartIcon } from "@heroicons/react/24/solid";
import React from "react";
import Button from "./Buttone";
import { useMutatecontroler } from "@/hook/useMutatecontriler";
import { likeAPI } from "@/service/ServicesMethode";
import toast from "react-hot-toast";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

function Like({ product }) {
   const pathname = usePathname();
  const searchParams = useSearchParams();
  const { isLoading, mutate } = useMutatecontroler({
    Api: likeAPI,
  });
  const queryclient = useQueryClient();
  const router = useRouter();
  const likeHandler = async () => {
    try {
      
      const { message } = await likeAPI(product._id);
      toast.success(message);
      router.refresh(pathname + "?" + searchParams.toString());
    

      
    } catch (error) {
      if (error?.response?.data) {
        toast.error(error.response.data.message);
      }
    }
  };
  
  return (
    <Button
    
    
    onClick={likeHandler}
    
    className="flex items-center justify-center p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors duration-200">
      <div className="rounded-full">
        {product.isLiked===false ? (
          

          <HeartIcon className="text-red-500 w-6 h-6" />
        ) : (
          <HeartIcon className="text-gray-400 w-6 h-6" />
        )}
      </div>
    </Button>
  );
}

export default Like;
