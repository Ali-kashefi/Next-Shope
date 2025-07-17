"use client";

import React, { useEffect, useState } from "react";
import PrpductForm from "@/components/PrpductForm";
import Spiner from "@/components/ui/Spiner";
import { useGetallcategory } from "@/hook/useGetallcategory";
import { useGetproductByid } from "@/hook/useGetproducts";
import {} from "utils/priceFornater";

import { useMutatecontroler } from "@/hook/useMutatecontriler";
import { updateProductAPI } from "@/service/ServicesMethode";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";


function ProductEditPage({ params }) {
  const { _id } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    slug: "",
    brand: "",
    price: "",
    offPrice: "",
    discount: "",
    countInStock: "",
    imageLink: "",
  });
  const [tags, setTags] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [offprice, setOfprice] = useState(0);

  const {
    data: productData,
    error: productError,
    isLoading: isProductLoading,
  } = useGetproductByid(_id);

  const product = productData?.product;

  const { data: categoriesData, error: categoriesError } = useGetallcategory();
  const allCategories = categoriesData?.categories;
  const { mutate: patchmutate, isLoading: patchIsloding } = useMutatecontroler({
    Api: updateProductAPI,
  });
const router=useRouter();
  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title || "",
        description: product.description || "",
        slug: product.slug || "",
        brand: product.brand || "",
        price: product.price,
        offPrice: product.offPrice || 0,
        discount: product.discount,
        countInStock: product.countInStock,
        imageLink: product.imageLink || "",
      });

      setTags(product.tags || []);
      setSelectedCategory(product.category || null);
    }
  }, [product]);

 
  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      offPrice: offprice,
    }));
  }, [offprice]);

  if (isProductLoading) {
    return <Spiner />;
  }

  if (productError) {
    return (
      <div className="text-red-500 text-center py-4">
        خطا در بارگذاری محصول: {productError.message}
      </div>
    );
  }

  if (!product && !isProductLoading) {
    return (
      <div className="text-center py-4">محصولی با این شناسه یافت نشد.</div>
    );
  }
  const handleSubmite = async (e) => {
    e.preventDefault();
    try {
      const { message } = await patchmutate({
        productId: product._id,
        data: {
          ...formData,
          tags,
          category: selectedCategory._id,
        },
      });
      toast.success(message);
      router.push("/admin/products");
    } catch (error) {
      console.error("خطا در ارسال فرم:", error);
      toast.error(error?.response?.data?.message);
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <PrpductForm
        isloadind={patchIsloding}
        submiteForm={handleSubmite}
        allcategories={allCategories}
        categories={selectedCategory}
        setCategpries={setSelectedCategory}
        setTags={setTags}
        tags={tags}
        productform={formData}
        productDataOnChange={handleChange}
      />
    </div>
  );
}

export default ProductEditPage;
