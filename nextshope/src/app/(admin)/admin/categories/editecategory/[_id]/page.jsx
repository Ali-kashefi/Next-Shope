"use client"
import EditeCategoryForm, { categoryTypes } from "@/components/EditeCategoryForm";
import Spiner from "@/components/ui/Spiner";
import { useGetCategoryById } from "@/hook/useGetcategoryByid";
import { useMutatecontroler } from "@/hook/useMutatecontriler";
import { updateCategoryAPI } from "@/service/ServicesMethode";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { includeObj } from "utils/objectUtils";
const includesCategoryKey = ["title", "englishTitle", "description"];
function page() {
  const { _id:id } = useParams();
  const { data, isLoading: isLoadingCategory } = useGetCategoryById(id);
  const { category } = data || {};
  const [formData, setFormData] = useState({});
  const [selectedType, setSelectedType] = useState("");
  const { isLoading, mutate } = useMutatecontroler({
    Api:updateCategoryAPI
  });
  const router = useRouter();

  useEffect(() => {
    if (category) {
      setSelectedType(categoryTypes.find((c) => c.value === category.type));
      setFormData(includeObj(category, includesCategoryKey));
    }
  }, [data]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { message } = await mutate({
        data: {
          ...formData,
          type: selectedType.value,
        },
        id: category._id,
      });
      toast.success(message);
      router.push("/admin/categories");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  if (isLoadingCategory) return <Spiner />;
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-auto">
        <EditeCategoryForm
          category={formData}
          handleChange={handleChange}
          isLoading={isLoading}
          onSubmit={handleSubmit}
          selectedType={categoryTypes.find((c) => c.value === category.type)}
          setSelectedType={setSelectedType}
        />
      </div>
    </div>
  );
}

export default page;
