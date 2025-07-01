"use client";
import Search from "@/components/Search";
import Button from "@/components/ui/Buttone";
import EditeButune from "@/components/ui/EditeButune";
import Modal from "@/components/ui/Modal";
import Spiner from "@/components/ui/Spiner";
import Table from "@/components/ui/Table";
import { useMutatecontroler } from "@/hook/useMutatecontriler";
import {
  getallProductsAPI,
  removeProductbyIdAPI,
} from "@/service/ServicesMethode";


import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { formatPrice } from "utils/priceFornater";

function page() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const {
    mutate,

 
  } = useMutatecontroler({ Api: removeProductbyIdAPI });
  const [searchquery, setSearchQuery] = useState("");
  const products = data?.products;
  const filteredProducts =
    products?.filter((product) => {
      if (!searchquery) {
        return true;
      }
      const lowerCaseQuery = searchquery.toLowerCase();
      return (
        product.title.toLowerCase().includes(lowerCaseQuery) ||
        product.slug.toLowerCase().includes(lowerCaseQuery) ||
      
        String(product.price).toLowerCase().includes(lowerCaseQuery) ||
        String(product.offPrice).toLowerCase().includes(lowerCaseQuery) ||
        product.brand.toLowerCase().includes(lowerCaseQuery)
      );
    }) || [];
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const responseData = await getallProductsAPI();
        setData(responseData);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (isLoading) {
    return <Spiner />;
  }
  if (!products || products.length === 0) {
    return (
      <div className="text-gray-600 text-center mt-8">هیچ محصولی یافت نشد.</div>
    );
  }

  const RemoveProduct = async () => {
    try {
      const { message } = await mutate({ productId: selectedProductId });
      toast.success(message);
      setIsModalOpen(false);
     
      
      const responseData = await getallProductsAPI();
      setData(responseData);

    } catch (error) {
      console.log(error);
      toast.error("خطا در حذف محصول."); 
    }
  };

  const handleOpenModal = (productId) => {
    setSelectedProductId(productId);
    setIsModalOpen(true);
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProductId(null);
  };

 

  const TableHeader = [
    "#",
    "نام محصول",
    "قیمت",
    "تخفیف",
    "قیمت با تخفیف",
    "تعداد",
    "دسته بندی",
    "جزییات",
    "ویرایش",
  ];

  const TableBody = filteredProducts.map((product, index) => {
    return [
      formatPrice(index + 1),
      product.title,
      formatPrice(product.price),
      formatPrice(product.discount),
      formatPrice(product.offPrice),
      formatPrice(product.countInStock),
      product.category.title,
      <Link
        key={`details-${product._id}`}
        href={`/admin/products/details/${product.slug}`}
        className="text-primary-700"
      >
        مشاهده
      </Link>,
      <EditeButune key={`edit-${product._id}`} id={product._id} oprnModal={() => handleOpenModal(product._id)} editepage={`/admin/products/edite/${product._id}`} />,
    ];
  });

  return (
    <div>
      <div className="gap-2 flex w-auto flex-row pt-8 pb-8 justify-between">
        <Modal
          onClose={onCloseModal}
          accept="بله، حذف کن"
          open={isModalOpen}
          reject="خیر، انصراف"
          title="آیا از حذف این محصول اطمینان دارید؟ این عمل غیر قابل بازگشت است."
          onConfirm={RemoveProduct}
        />
        <Link href={`/admin/products/createproduct`}>
          <Button className="w-44 h-12">افزودن محصول</Button>
        </Link>

        <Search
          placeholder="جستجوی محصولات"
          value={searchquery}
          onChange={(e) => setSearchQuery(e.target.value)} 
        />
      </div>
      <Table tHeader={TableHeader} tBody={TableBody} />
    </div>
  );
}

export default page;