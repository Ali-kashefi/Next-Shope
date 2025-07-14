"use client";
import Search from "@/components/Search";
import Spiner from "@/components/ui/Spiner";
import Table from "@/components/ui/Table";
import { useGetAllorder } from "@/hook/useGetAllorder";
import React, { useState } from "react";
import { ConvertToPersianCalendar } from "utils/ConvertToPersianCalendar";
import { formatPrice } from "utils/priceFornater";

function page() {
  const [searchquery, setSearchQuery] = useState("");

  const { data, error, isLoading } = useGetAllorder();
  const { payments } = data || {};

  const filteredorders =
    payments?.filter((order) => {
      if (!searchquery) {
        return true;
      }
      const lowerCaseQuery = searchquery.toLowerCase();
      return (
        order.user.name.toLowerCase().includes(lowerCaseQuery) ||
        String(order.amount.toLowerCase().includes(lowerCaseQuery)) ||
        String(order.paymentDate.toLowerCase().includes(lowerCaseQuery))
      );
    }) || [];

  const TableHeader = [
    "#",
    "کاربر",
    "شماره فاکتور",
    "محصولات",
    "مبلغ کل",
    "تاریخ",
    "وضعیت",
  ];

  console.log(filteredorders);

  const TableBody = filteredorders.map((order, index) => {
    const { user } = order || {};
    return [
      formatPrice(index + 1),
      user.name,
      order.invoiceNumber,
      order.description,
      formatPrice(order.amount),
      ConvertToPersianCalendar(order.updatedAt),
      order.status === "COMPLETED" ? (
        <span className="text-green-600 font-semibold">موفق</span>
      ) : (
        <span className="text-red-600 font-semibold">ناموفق</span>
      ),
    ];
  });

  if (isLoading) {
    <Spiner />;
  }
  return (
    <div className="gap-2 flex w-auto flex-col pt-8 pb-8 justify-between ">
      <Search
        placeholder="جستجوی فاکتور"
        value={searchquery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <Table tHeader={TableHeader} tBody={TableBody} />
    </div>
  );
}

export default page;
