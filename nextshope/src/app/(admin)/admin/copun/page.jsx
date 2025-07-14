"use client";
import Spiner from "@/components/ui/Spiner";
import Table from "@/components/ui/Table";
import { useGetAllcopun } from "@/hook/useGetAllcopun";
import Link from "next/link";
import React, { useState } from "react";
import { ConvertToPersianCalendar } from "utils/ConvertToPersianCalendar";
import { formatPrice } from "utils/priceFornater";

import Button from "@/components/ui/Buttone";
import EditeButune from "@/components/ui/EditeButune";
import Modal from "@/components/ui/Modal";
import { useMutatecontroler } from "@/hook/useMutatecontriler";
import { deleteCouponAPI } from "@/service/ServicesMethode";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
function page() {
  const { data, isLoading } = useGetAllcopun();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate } = useMutatecontroler({
    Api: deleteCouponAPI,
  });
  const [selectedcopunId, setSelectedcopunId] = useState(null);
  const { coupons } = data || {};
  const router = useRouter();
  const RemoveCopun = async () => {
    try {
      const { message } = await mutate({ id: selectedcopunId });
      toast.success(message);
      router.refresh();
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("خطا در حذف محصول.");
    }
  };
  const handleOpenModal = (copunId) => {
    setSelectedcopunId(copunId);
    setIsModalOpen(true);
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
    setSelectedcopunId(null);
  };
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
      coupon.code,
      coupon.type,
      coupon.amount,
      coupon.productIds?.map((p) => {
        return <span className="badge badge--secondary">{p.title}</span>;
      }),
      coupon.usageCount,
      coupon.usageLimit,
      ConvertToPersianCalendar(coupon.expireDate),
      <EditeButune
        key={`edit-${coupon._id}`}
        id={coupon._id}
        oprnModal={() => handleOpenModal(coupon._id)}
        editepage={`/admin/copun/edite/${coupon._id}`}
      />,
    ];
  });

  if (isLoading) {
    <Spiner />;
  }
  return (
    <div>
      <Modal
        onClose={onCloseModal}
        accept="بله، حذف کن"
        open={isModalOpen}
        reject="خیر، انصراف"
        title="آیا از حذف این تخفیف اطمینان دارید؟ این عمل غیر قابل بازگشت است."
        onConfirm={RemoveCopun}
      />
      <div className="gap-2 flex w-auto flex-row pt-8 pb-8 justify-between">
        <Link href={`/admin/copun/add`}>
          <Button className="w-44 h-12">افزودن تخفیف</Button>
        </Link>
      </div>
      <Table tHeader={TableHeader} tBody={TableBody} />
    </div>
  );
}

export default page;
