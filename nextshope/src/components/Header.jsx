"use client";
import useGetUser from "@/hook/useGetUser";

import Link from "next/link";
import React from "react";
// import { formatPrice } from "utils/priceFornater"; 

function Header() {
  const { user, isLoading, cart } = useGetUser();

  return (
    <>
      <header
        className={`
          shadow-xl sticky top-0 z-50 transition-all duration-300
          bg-gradient-to-r from-blue-600 to-purple-700
          text-white
          px-8 md:px-16 lg:px-24 py-4
          ${isLoading ? "blur-sm opacity-70" : "opacity-100 blur-0"}
        `}
      >
        <nav className="container mx-auto flex items-center justify-between h-full">
          <Link href="/">
            <span className="text-2xl font-extrabold tracking-wide hover:text-blue-200 transition-colors cursor-pointer">
              Next Shop
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8 lg:space-x-12 text-lg">
            <Link
              className="hover:text-blue-200 transition-colors duration-200"
              href="/products"
            >
              محصولات
            </Link>
            {!isLoading && user && user.role === "USER" && (
              <Link
                className="hover:text-blue-200 transition-colors duration-200"
                href="/profile"
              >
                پنل کاربر
              </Link>
            )}
            {!isLoading && user && user.role === "ADMIN" && (
              <Link
                className="hover:text-blue-200 transition-colors duration-200"
                href="/dashboared"
              >
                پنل ادمین
              </Link>
            )}
            <Link
              className="relative flex items-center hover:text-blue-200 transition-colors duration-200"
              href="/cart"
            >
              سبد خرید
              {cart && cart.payDetail.productIds.length > 0 && (
                <span className="ml-2 bg-primary-400 text-white text-xs font-bold px-2 py-0.5 rounded-full min-w-[24px] text-center">
                  {cart.payDetail.productIds.length}
                </span>
              )}
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <Link href="/profile">
                <span className="text-white hover:text-blue-200 font-semibold transition-colors cursor-pointer">
                  {user.name}
                </span>
              </Link>
            ) : (
              <Link
                className="bg-white text-blue-700 hover:bg-gray-100 px-4 py-2 rounded-full transition-all duration-200 font-semibold shadow-md"
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