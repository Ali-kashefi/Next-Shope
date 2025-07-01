"use client";
import Link from "next/link";
import React from "react";
import {
  HomeIcon,
  ChartBarIcon,
  UsersIcon,
  ShoppingCartIcon,
  TagIcon,
  ClipboardIcon,
  GiftIcon,
  ArrowRightOnRectangleIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import { logoutAPI } from "@/service/ServicesMethode";

function AdminSidebar() {
  const handlelogout = async () => {
    await logoutAPI();
    document.location.href = "/";
  };
  return (
    <div className="w-72 fixed bg-gray-50 p-6 shadow-2xl rounded-l-3xl flex flex-col h-screen">
      {" "}

      <h1 className=" font-extrabold text-secondary-800 border-b border-gray-700 pb-2">
        پنل مدریت
      </h1>
      <ul className="flex flex-col space-y-3 flex-grow">
        <li className="group">
          <Link
            href="/"
            className="flex items-center p-3 rounded-xl hover:bg-primary-800 transition-all duration-200 transform hover:scale-105"
          >
            <HomeIcon className="w-6 h-6 ml-3 text-secondary-600 group-hover:text-secondary-400 transition-colors duration-200" />{" "}

            <span className="text-lg font-medium text-primary-800 group-hover:text-primary-200">
              صفحه اصلی
            </span>{" "}

          </Link>
        </li>

        <li className="group">
          <Link
            href="/admin/dashboard"
            className="flex items-center p-3 rounded-xl hover:bg-primary-800 transition-all duration-200 transform hover:scale-105"
          >
            <ChartBarIcon className="w-6 h-6 ml-3 text-secondary-500 group-hover:text-secondary-400 transition-colors duration-200" />
            <span className="text-lg font-medium text-primary-800 group-hover:text-primary-200">
              داشبورد
            </span>
          </Link>
        </li>

        <li className="group">
          <Link
            href="/admin/users"
            className="flex items-center p-3 rounded-xl hover:bg-primary-800 transition-all duration-200 transform hover:scale-105"
          >
            <UsersIcon className="w-6 h-6 ml-3 text-secondary-500 group-hover:text-secondary-400 transition-colors duration-200" />
            <span className="text-lg font-medium text-primary-800 group-hover:text-primary-200">
              کاربران
            </span>
          </Link>
        </li>

        <li className="group">
          <Link
            href="/admin/products"
            className="flex items-center p-3 rounded-xl hover:bg-primary-800 transition-all duration-200 transform hover:scale-105"
          >
            <ShoppingCartIcon className="w-6 h-6 ml-3 text-secondary-500 group-hover:text-secondary-400 transition-colors duration-200" />
            <span className="text-lg font-medium text-primary-800 group-hover:text-primary-200">
              محصولات
            </span>
          </Link>
        </li>

        <li className="group">
          <Link
            href="/admin/categories"
            className="flex items-center p-3 rounded-xl hover:bg-primary-800 transition-all duration-200 transform hover:scale-105"
          >
            <Squares2X2Icon className="w-6 h-6 ml-3 text-secondary-500 group-hover:text-secondary-400 transition-colors duration-200" />
            <span className="text-lg font-medium text-primary-800 group-hover:text-primary-200">
              دسته بندی ها
            </span>
          </Link>
        </li>

        <li className="group">
          <Link
            href="/admin/orders"
            className="flex items-center p-3 rounded-xl hover:bg-primary-800 transition-all duration-200 transform hover:scale-105"
          >
            <ClipboardIcon className="w-6 h-6 ml-3 text-secondary-500 group-hover:text-secondary-400 transition-colors duration-200" />
            <span className="text-lg font-medium text-primary-800 group-hover:text-primary-200">
              سفارشات
            </span>
          </Link>
        </li>

        <li className="group">
          <Link
            href="/admin/copun"
            className="flex items-center p-3 rounded-xl hover:bg-primary-800 transition-all duration-200 transform hover:scale-105"
          >
            <GiftIcon className="w-6 h-6 ml-3 text-secondary-500 group-hover:text-secondary-400 transition-colors duration-200" />
            <span className="text-lg font-medium text-primary-800 group-hover:text-primary-200">
              کد تخفیف
            </span>
          </Link>
        </li>

        <li className="mt-auto pt-4 border-t border-gray-700">
          <button
            onClick={handlelogout}
            className="flex items-center w-full p-3 rounded-xl bg-red-400 text-white font-bold text-lg hover:bg-red-800 transition-all duration-200 transform hover:scale-105"
          >
            <ArrowRightOnRectangleIcon className="w-6 h-6 ml-3 text-white" />
            <span className="text-lg">خروج</span>
          </button>
        </li>
      </ul>
    </div>
  );
}

export default AdminSidebar;
