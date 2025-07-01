"use client";
import Spiner from "@/components/ui/Spiner";
import Table from "@/components/ui/Table";
import { useGetAllcopun } from "@/hook/useGetAllcopun";
import Link from "next/link";
import React from "react";
import { ConvertToPersianCalendar } from "utils/ConvertToPersianCalendar";
import { formatPrice } from "utils/priceFornater";
import { HiEye, HiTrash } from "react-icons/hi";
import { RiEdit2Line } from "react-icons/ri";
import Button from "@/components/ui/Buttone";
function page() {
  const { data, isLoading } = useGetAllcopun();
  const { coupons } = data || {};
  const TableHeader = [
    "#",
    "کد",
    "نوع",
    "مقدار",
    "شامل محصولات",
    "مقدار مصرفی",
    "ظرفیت",
    "تاریخ انقضا",

    "عملیات",
  ];
  const TableBody = coupons?.map((coupon, index) => {
    return [
      formatPrice(index + 1),
      coupon.type,
      coupon.amount,
      coupon.productIds?.map((p) => {
        return <span className="badge badge--secondary">{p.title}</span>;
      }),
      coupon.usageCount,
      coupon.usageLimit,
      ConvertToPersianCalendar(coupon.expireDate),
      <div className="flex items-center gap-x-4">
        <Link href={`/admin/coupons/${coupon._id}`}>
          <HiEye className="text-primary-900 w-6 h-6" />
        </Link>
        <button>
          <HiTrash className="text-rose-600 w-6 h-6" />
        </button>
        <Link href={`/admin/coupons/edit/${coupon._id}`}>
          <RiEdit2Line className="w-6 h-6 text-secondary-600" />
        </Link>
      </div>,
    ];
  });

  if (isLoading) {
    <Spiner />;
  }
  return (
    <div>
      <div className="gap-2 flex w-auto flex-row pt-8 pb-8 justify-between">
        {/* <Modal
          onClose={onCloseModal}
          accept="بله، حذف کن"
          open={isModalOpen}
          reject="خیر، انصراف"
          title="آیا از حذف این محصول اطمینان دارید؟ این عمل غیر قابل بازگشت است."
          onConfirm={RemoveProduct}
        /> */}
        <Link href={`/admin/copun/add`}>
          <Button className="w-44 h-12">افزودن محصول</Button>
        </Link>

        {/* <Search
          placeholder="جستجوی محصولات"
          value={searchquery}
          onChange={(e) => setSearchQuery(e.target.value)} 
        /> */}
      </div>
      <Table tHeader={TableHeader} tBody={TableBody}/>
    </div>
  );
}

export default page;
