"use client";
import React, { useState, useEffect } from "react";
import Table from "./ui/Table";
import { formatPrice } from "utils/priceFornater";
import { getallusersAPI } from "@/service/ServicesMethode";
import useGetUser from "@/hook/useGetUser";
import Spiner from "./ui/Spiner";

function UsersTable() {
  // --- تمام هوک‌ها باید اینجا، در بالاترین سطح کامپوننت، قرار بگیرند ---
  const { data: currentUserData, isLoading: isUserLoading } = useGetUser();
  const currentUserRole = currentUserData?.user?.role;

  const [users, setUsers] = useState([]);
  const [hasFetchedUsers, setHasFetchedUsers] = useState(false);
  const [usersListError, setUsersListError] = useState(null); // اضافه کردن این برای نمایش خطا

  // --- useEffect هم باید اینجا باشه ---
  useEffect(() => {
    // این `useEffect` فقط وقتی `currentUserRole` ادمین شد و هنوز داده‌ها فچ نشده بودند، اجرا میشه.
    // `!isUserLoading` رو هم اضافه کردیم که مطمئن بشیم اطلاعات نقش کاربر کاملاً لود شده.
    if (currentUserRole === "ADMIN" && !hasFetchedUsers && !isUserLoading) {
      const fetchUsersData = async () => {
        setUsersListError(null); // پاک کردن خطاهای قبلی قبل از فچ جدید
        try {
          const { data } = await getallusersAPI();
          console.log(data);
          setUsers(data.users || []);
          setHasFetchedUsers(true);
        } catch (err) {
          console.error("Error fetching users list:", err);
          setUsersListError(err.message || "خطا در دریافت لیست کاربران"); // ذخیره پیام خطا
        }
      };
      fetchUsersData();
    }
  }, [currentUserRole, hasFetchedUsers, isUserLoading]); // وابستگی‌ها رو دقیق مشخص کنید

  // --- حالا می‌توانید منطق رندرینگ مشروط را قرار دهید ---

  // 1. اگر هنوز اطلاعات کاربر لود نشده باشد، اسپینر را نمایش دهید.
  if (isUserLoading) {
    return <Spiner />;
  }

  // 2. اگر کاربر ادمین نباشد، پیام عدم دسترسی را نمایش دهید.
  if (currentUserRole !== "ADMIN") {
    return (
      <div className="text-red-500 text-center mt-8">
        شما دسترسی به این بخش را ندارید.
      </div>
    );
  }

  // 3. اگر خطایی در واکشی لیست کاربران داشتیم، پیام خطا را نمایش دهید.
  if (usersListError) {
    return <div className="text-red-500 text-center mt-8">خطا در بارگذاری لیست کاربران: {usersListError}</div>;
  }

  // 4. اگر هنوز داده‌ها فچ نشده و لیست کاربران خالی است (یعنی در حال لود شدن لیست کاربران هستیم)
  if (!hasFetchedUsers) { 
    return <Spiner />; // یا هر پیام لودینگ دیگری برای لیست کاربران
  }
  
  // 5. اگر داده‌ها فچ شده ولی لیست کاربران خالی است (یعنی نتیجه‌ای یافت نشد)
  if (users.length === 0) {
    return (
      <div className="text-gray-600 text-center mt-8">
        نتیجه‌ای یافت نشد.
      </div>
    );
  }

  // --- آماده‌سازی داده‌ها برای جدول (فقط اگر کاربران وجود داشتند) ---
  const tHeader = [
    "#",
    "نام کاربر",
    "ایمیل",
    "موبایل",
    "تاریخ ثبت نام",
    "وضعیت",
  ];
  const tBody = users.map((user, index) => {
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
    <div>
      <Table tBody={tBody} tHeader={tHeader} />
    </div>
  );
}

export default UsersTable;