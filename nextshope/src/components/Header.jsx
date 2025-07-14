"use client";
import useGetUser from "@/hook/useGetUser";

import Link from "next/link";
import React from "react";

function Header() {
  const { user, isLoading, cart } = useGetUser();

  return (
    <>
      <header
        className={`
          shadow-md sticky top-0 z-50 transition-all duration-300
          bg-white 
          text-gray-800 
          px-4 md:px-8 lg:px-12 py-3 
          ${isLoading ? "blur-sm opacity-70" : "opacity-100 blur-0"}
        `}
      >
        <nav className="container mx-auto flex items-center justify-between h-full">
          <Link href="/">
            <span className="text-2xl font-extrabold tracking-wide text-blue-700 hover:text-blue-500 transition-colors cursor-pointer">
              Next Shop
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-6 lg:space-x-8 text-lg font-medium"> 

            <Link
              className="hover:text-blue-700 transition-colors duration-200"
              href="/products"
            >
              محصولات
            </Link>
            {!isLoading && user && user.role === "USER" && (
              <Link
                className="hover:text-blue-700 transition-colors duration-200"
                href="/profile"
              >
                پنل کاربر
              </Link>
            )}
            {!isLoading && user && user.role === "ADMIN" && (
              <Link
                className="hover:text-blue-700 transition-colors duration-200"
                href="/dashboared"
              >
                پنل ادمین
              </Link>
            )}
            <Link
              className="relative flex items-center hover:text-blue-700 transition-colors duration-200"
              href="/cart"
            >
              سبد خرید
              {cart && cart.payDetail.productIds.length > 0 && (
                <span className="ml-2 bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-full min-w-[20px] h-5 flex items-center justify-center"> {/* ابعاد و رنگ بهبود یافته برای نشان سبد خرید */}
                  {cart.payDetail.productIds.length}
                </span>
              )}
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <Link href="/profile">
                <span className="text-blue-700 hover:text-blue-500 font-semibold transition-colors cursor-pointer"> {/* رنگ متن نام کاربری */}
                  {user.name}
                </span>
              </Link>
            ) : (
              <Link
                className="bg-blue-600 text-white hover:bg-blue-700 px-5 py-2.5 rounded-full transition-all duration-200 font-semibold shadow-md" // دکمه ورود/ثبت‌نام با رنگ اصلی و افکت هاور جذاب
                href="/signup"
              >
                ورود / ثبت‌نام
              </Link>
            )}
          </div>
        </nav>
      </header>
    </>
  );
}

export default Header;