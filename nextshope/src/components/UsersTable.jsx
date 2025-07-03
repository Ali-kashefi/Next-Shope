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
  const [usersListError, setUsersListError] = useState(null); 


  useEffect(() => {
    if (currentUserRole === "ADMIN" && !hasFetchedUsers && !isUserLoading) {
      const fetchUsersData = async () => {
        setUsersListError(null);
        try {
          const { data } = await getallusersAPI();
          console.log(data);
          setUsers(data.users || []);
          setHasFetchedUsers(true);
        } catch (err) {
          console.error("Error fetching users list:", err);
          setUsersListError(err.message || "خطا در دریافت لیست کاربران"); 
        }
      };
      fetchUsersData();
    }
  }, [currentUserRole, hasFetchedUsers, isUserLoading]);
 
  if (isUserLoading) {
    return <Spiner />;
  }

 
  if (currentUserRole !== "ADMIN") {
    return (
      <div className="text-red-500 text-center mt-8">
        شما دسترسی به این بخش را ندارید.
      </div>
    );
  }


  if (usersListError) {
    return <div className="text-red-500 text-center mt-8">خطا در بارگذاری لیست کاربران: {usersListError}</div>;
  }


  if (!hasFetchedUsers) { 
    return <Spiner />; 
  }
   
  if (users.length === 0) {
    return (
      <div className="text-gray-600 text-center mt-8">
        نتیجه‌ای یافت نشد.
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