"use client"
import { logoutAPI } from "@/service/ServicesMethode";
import Link from "next/link";
import React from "react";

function SideBar() {
  const handlelogout = async () => {
    await logoutAPI();
   
    window.location.href = "/";    
  };

  return (
    <div className="
      flex flex-col h-full 

      bg-gradient-to-br from-blue-700 to-purple-800
       
      text-white
      rounded-3xl shadow-2xl
      p-6 md:p-8
      transition-all duration-300 ease-in-out 
    ">
      <h2 className="text-3xl font-extrabold mb-8 text-blue-200">
        پنل کاربری
      </h2>
      <ul className="flex flex-col space-y-4 flex-grow"> 
        <li className="group"> 
          <Link 
            href="/" 
            className="
              flex items-center p-3 rounded-lg 
              hover:bg-blue-600 hover:bg-opacity-70 
              transition-all duration-200 ease-in-out
              text-lg font-semibold
            "
          >
            صفحه اصلی
          </Link>
        </li>
        <li className="group">
          <Link 
            href="/profile/me" 
            className="
              flex items-center p-3 rounded-lg 
              hover:bg-blue-600 hover:bg-opacity-70
              transition-all duration-200 ease-in-out
              text-lg font-semibold
            "
          >
            اطلاعات کاربر
          </Link>
        </li>
        <li className="group">
          <Link 
            href="/profile/Peyment" 
            className="
              flex items-center p-3 rounded-lg 
              hover:bg-blue-600 hover:bg-opacity-70
              transition-all duration-200 ease-in-out
              text-lg font-semibold
            "
          >
            فاکتورها
          </Link>
        </li>
      </ul>

      <div className="mt-auto pt-6 border-t border-blue-600"> 
        <button 
          onClick={handlelogout} 
          className="
            w-full flex items-center justify-center p-3 rounded-lg 
            bg-red-600 hover:bg-red-700
            text-white text-lg font-semibold
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