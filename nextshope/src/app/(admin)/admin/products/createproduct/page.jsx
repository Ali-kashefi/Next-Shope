"use client";

import { useGetallcategory } from "@/hook/useGetallcategory";
import { useMutatecontroler } from "@/hook/useMutatecontriler";
import { createProductAPI } from "@/service/ServicesMethode";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import PrpductForm from "@/components/PrpductForm";
;

function page() {
  const [tags, setTags] = useState([]);
  const [categpries, setCategpries] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    slug: "",
    brand: "",
    price: 0,
    offPrice: 0,
    discount: 0,
    countInStock: 0,
    imageLink: "",
  });
  const {
    isLoading,
    error: errproduct,
    mutate,
  } = useMutatecontroler({
    Api: createProductAPI,
  });
  const { data, error } = useGetallcategory();
  const { categories: allcategories } = data || {};
  const handChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  useEffect(()=>{

  },[formData])
 
 

  const handleSubmite = async (e) => {
    e.preventDefault();

    try {
      const { message } = await mutate({
        ...formData,

        category: categpries?._id,
        tags,
      });
      toast.success(message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div>
      <PrpductForm
        allcategories={allcategories}
        categpries={categpries}
        setCategpries={setCategpries}
        setTags={setTags}
        tags={tags}
        productDataOnChange={handChange}
        productform={formData}
        submiteForm={handleSubmite}
        isLoading={isLoading}
      />
    </div>
  );
}

export default page;
