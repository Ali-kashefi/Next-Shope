"use client";
import SearchProduct from "@/components/Search";
import Button from "@/components/ui/Buttone";
import Spiner from "@/components/ui/Spiner";
import Table from "@/components/ui/Table";
import useGetallusers from "@/hook/useGetallusers";
import React, { useState } from "react";
import { formatPrice } from "utils/priceFornater";
function Page() {
  const { data, error, isLoading } = useGetallusers();
  const { users: allUsers } = data || {};

  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers =
    allUsers?.filter((user) => {
      if (!searchQuery) {
        return true;
      }
      const lowerCaseQuery = searchQuery.toLowerCase();
      return (
        user.name.toLowerCase().includes(lowerCaseQuery) ||
        user.email.toLowerCase().includes(lowerCaseQuery)||
         user.phoneNumber.toLowerCase().includes(lowerCaseQuery)

      );
    }) || [];

  if (isLoading) {
    return <Spiner />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-lg">
        خطا در دریافت اطلاعات کاربران: {error.message || "خطای نامشخص"}
      </div>
    );
  }

  const tHeader = [
    "#",
    "نام کاربر",
    "ایمیل",
    "موبایل",
    "تاریخ ثبت نام",
    "وضعیت",
   
  ];

  const tBody = filteredUsers.map((user, index) => {
    return [
      formatPrice(index + 1),
      user.name,
      user.email,
      user.phoneNumber,
      new Date(user.createdAt).toLocaleDateString("fa-IR"),
      user.role === "ADMIN" ? "ادمین" : "کاربر عادی",
     
    ];
  });

  return (
    <div className="flex flex-col w-full container">
      <div className="flex w-auto flex-row pt-8 pb-8 justify-between items-center">
        <SearchProduct
          placeholder="جستجوی کاربران (نام، ایمیل)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button className="w-36 text-primary-50" onClick={() => {}}>
          جستجو
        </Button>
      </div>
      {filteredUsers.length > 0 ? (
        <Table tHeader={tHeader} tBody={tBody} />
      ) : (
        <div className="text-center text-secondary-600 text-lg mt-8">
          کاربری با این مشخصات یافت نشد.
        </div>
      )}
    </div>
  );
}

export default Page;