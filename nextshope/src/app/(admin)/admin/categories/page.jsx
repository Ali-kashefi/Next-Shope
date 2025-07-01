"use client";
import Search from "@/components/Search";
import Button from "@/components/ui/Buttone";
import EditeButune from "@/components/ui/EditeButune";
import Modal from "@/components/ui/Modal";
import Spiner from "@/components/ui/Spiner";
import Table from "@/components/ui/Table";
import { useGetallcategory } from "@/hook/useGetallcategory";
import { useMutatecontroler } from "@/hook/useMutatecontriler";
import { removeCategoryAPI } from "@/service/ServicesMethode";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { ConvertToPersianCalendar } from "utils/ConvertToPersianCalendar";
import { formatPrice } from "utils/priceFornater";

function categoriespage() {
  const [searchquery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedcategoriesId, setSelectedcategoriesId] = useState(null);
  const { data, error, isLoading } = useGetallcategory();
  const { mutate } = useMutatecontroler({
    Api: removeCategoryAPI,
  });

  const { categories } = data || {};
  const headerTable = [
    "#",
    "عنوان ",
    "توضیحات",
    "تاریخ ایجاد ",
    " تاریخ به روز رسانی ",
    "ویرایش",
  ];
  if (isLoading) {
    return <Spiner />;
  }
  const filteredCategories =
    categories?.filter((category) => {
      if (!searchquery) {
        return true;
      }
      const lowerCaseQuery = searchquery.toLowerCase();
      return category.title.toLowerCase().includes(lowerCaseQuery);
    }) || [];

  const bodyTable = filteredCategories.map((categories, index) => {
    return [
      formatPrice(index + 1),
      categories.title,
      categories.description,
      ConvertToPersianCalendar(categories.createdAt),
      ConvertToPersianCalendar(categories.updatedAt),

      <EditeButune
        key={`category-${categories._id}`}
        id={categories._id}
        oprnModal={() => handleOpenModal(categories._id)}
        editepage={`/admin/categories/editecategory/${categories._id}`}
      />,
    ];
  });
  const handleOpenModal = (categoriesId) => {
    setSelectedcategoriesId(categoriesId);
    setIsModalOpen(true);
    console.log(categoriesId);
    
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
    setSelectedcategoriesId(null);
  };
  const Removecategories = async () => {
 
    try {
      const { message } = await mutate({ id: selectedcategoriesId });
      toast.success(message);
 
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <div>
      <h1>دسته بندی ها</h1>
      <div className="gap-2 flex w-auto flex-row pt-8 pb-8 justify-between">
        <Modal
          onClose={onCloseModal}
          accept="بله، حذف کن"
          open={isModalOpen}
          reject="خیر، انصراف"
          title="آیا از حذف این دسته بندی اطمینان دارید؟ این عمل غیر قابل بازگشت است."
          onConfirm={Removecategories}
        />
        <Link href={`/admin/categories/createcategory`}>
          <Button className="w-44 h-12">افزودن دسته بندی</Button>
        </Link>

        <Search
          placeholder="جستجوی محصولات"
          value={searchquery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Table tHeader={headerTable} tBody={bodyTable} />
    </div>
  );
}

export default categoriespage;
