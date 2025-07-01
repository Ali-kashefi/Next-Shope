"use client"
import { logoutAPI } from "@/service/ServicesMethode";
import Link from "next/link";
import React from "react";

function SideBar() {
  const handlelogout = async () => {
    await logoutAPI();
    document.location.href = "/";
  };
  return (
    <div className="flex flex-col space-y-8 rounded-tl-4xl bg-fixed " >
      <ul className="flex flex-col space-y-8  text-primary-800 font-bold">
        <li>
          <Link href="/">صفحه اصلی</Link>
        </li>
        <li>
     
          <Link href="/profile/me">اطلاعات کاربر</Link>
        </li>
    <li>
     
          <Link href="/profile/Peyment"> فاکتور ها</Link>
        </li>
        <li onClick={handlelogout} className="text-red-600" >
        
         خروج 
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
