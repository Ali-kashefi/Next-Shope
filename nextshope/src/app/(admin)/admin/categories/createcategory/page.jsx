"use client";
import EditeCategoryForm from "@/components/EditeCategoryForm";
import { useMutatecontroler } from "@/hook/useMutatecontriler";
import { addNewCategoryAPI } from "@/service/ServicesMethode";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function page() {
  const [category, setCategory] = useState({
    title: "",
    description: "",
    englishTitle: "",
  });
  const router = useRouter();
  const [selectedType, setSelectedType] = useState("");
  const { isLoading, mutate } = useMutatecontroler({
    Api: addNewCategoryAPI,
  });
  const handleChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { message } = await mutate({
        ...category,
        type: selectedType.value,
      });
      toast.success(message);
      router.push("/admin/categories");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-auto">
        <EditeCategoryForm
          category={category}
          handleChange={handleChange}
          isLoading={isLoading}
          onSubmit={handleSubmit}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />
      </div>
    </div>
  );
}

export default page;
