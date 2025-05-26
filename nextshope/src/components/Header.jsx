"use client";
import useGetUser from "@/hook/useGetUser";

import Link from "next/link";
import React from "react";

function Header() {
 
  const {user,isLoading,cart}=useGetUser()

  return (
    <>
    <header
  className={`shadow-lg sticky top-0 transition-all duration-300 bg-white px-8 md:px-16 lg:px-24 ${
    isLoading ? "blur-sm opacity-70" : "opacity-100 blur-0"
  }`}
>
  <nav className="container mx-auto">
    <ul className="flex items-center justify-between py-3 text-secondary-900 font-medium">
      
      {/* Left side - Logo/Home */}
      <li className="text-lg font-bold text-primary-600 hover:text-primary-700 transition-all">
        <Link href="/">خانه</Link>
      </li>

      {/* Middle - Navigation links */}
      <div className="hidden md:flex space-x-8">
        <li>
          <Link className="hover:text-primary-600 transition-all" href="/products">
            محصولات
          </Link>
        </li>
        <li>
          <Link className="hover:text-primary-600 transition-all" href="/profile">
            پنل کاربر
          </Link>
        </li>
        <li>
          <Link className="hover:text-primary-600 transition-all" href="/dashboared">
            پنل ادمین
          </Link>
        </li>
        <li>
          <Link className="relative flex items-center hover:text-primary-600 transition-all" href="/cart">
            سبد خرید
            {cart && cart.payDetail.productIds.length > 0 && (
              <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {cart.payDetail.productIds.length}
              </span>
            )}
          </Link>
        </li>
      </div>

      {/* Right Side - User/Login */}
      <li className="flex items-center space-x-4">
        {user ? (
       
          <Link href="/profile">   <span className="text-primary-800 font-semibold">{user.name}</span></Link>
        ) : (
          <Link className="hover:text-primary-600 transition-all" href="/auth">
            ورود
          </Link>
        )}
      </li>

    </ul>
  </nav>
</header>


    </>
  );
}

export default Header;
