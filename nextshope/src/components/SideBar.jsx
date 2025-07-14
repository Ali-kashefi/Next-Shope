"use client";
import { logoutAPI } from "@/service/ServicesMethode";
import Link from "next/link";
import React from "react";

function SideBar() {
  const handlelogout = async () => {
    await logoutAPI();

    window.location.href = "/";
  };

  return (
    <div
      className="
     flex flex-col h-full 
      
      p-4 md:p-8 
      rounded-2xl md:rounded-3xl 
      shadow-lg md:shadow-2xl
      
      bg-white 
      //  text-secondary-800
      
      transition-all duration-300 ease-in-out 
 
    "
    >
      <h2 className="text-2xl md:text-3xl font-extrabold mb-6 md:mb-8 text-blue-200">
        پنل کاربری
      </h2>
      <ul className="flex flex-col space-y-3 md:space-y-4 flex-grow">
        <li className="group">
          <Link
            href="/"
            className="
              flex items-center p-2 md:p-3 rounded-lg
              hover:bg-blue-600 hover:bg-opacity-70 
              transition-all duration-200 ease-in-out
              text-base md:text-lg font-semibold 
            "
          >
            صفحه اصلی
          </Link>
        </li>
        <li className="group">
          <Link
            href="/profile/me"
            className="
              flex items-center p-2 md:p-3 rounded-lg 
              hover:bg-blue-600 hover:bg-opacity-70
              transition-all duration-200 ease-in-out
              text-base md:text-lg font-semibold
            "
          >
            اطلاعات کاربر
          </Link>
        </li>
        <li className="group">
          <Link
            href="/profile/Peyment"
            className="
              flex items-center p-2 md:p-3 rounded-lg 
              hover:bg-blue-600 hover:bg-opacity-70
              transition-all duration-200 ease-in-out
              text-base md:text-lg font-semibold
            "
          >
            فاکتورها
          </Link>
        </li>
      </ul>

      <div className="mt-auto pt-4 md:pt-6 border-t border-blue-600">
        <button
          onClick={handlelogout}
          className="
            w-full flex items-center justify-center p-2 md:p-3 rounded-lg // پدینگ دکمه ریسپانسیو
            bg-red-600 hover:bg-red-700
            text-white text-base md:text-lg font-semibold // اندازه متن دکمه ریسپانسیو
            shadow-md hover:shadow-lg
            transition-all duration-200 ease-in-out
            cursor-pointer
          "
        >
          خروج
        </button>
      </div>
    </div>
  );
}

export default SideBar;
