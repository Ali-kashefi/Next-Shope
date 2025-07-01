import React from "react";
import Button from "@/components/ui/Buttone";
import TextField from "@/components/ui/TextField";

import Select from "react-select";
export const categoryTypes = [
  {
    id: 1,
    label: "محصول",
    value: "product",
  },
  {
    id: 2,
    label: "پست",
    value: "post",
  },
  {
    id: 3,
    label: "تیکت",
    value: "ticket",
  },
  {
    id: 4,
    label: "نظرات",
    value: "comment",
  },
];
function EditeCategoryForm({
  onSubmit,
  category,
  handleChange,
  selectedType = "",
  setSelectedType,
  isLoading,
}) {
  return (
    <div>
      <form className="space-y-6" onSubmit={onSubmit}>
        <TextField
          label="عنوان"
          name="title"
          className="w-full px-4 py-3 text-right border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          labelClassName="block text-gray-700 text-sm font-medium mb-2"
          value={category.title || ""}
          onChange={handleChange}
        />
        <TextField
          label="عنوان به انگلیسی"
          className="w-full px-4 py-3 text-right border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          labelClassName="block text-gray-700 text-sm font-medium mb-2"
          name="englishTitle"
          onChange={handleChange}
          value={category.englishTitle || ""}
        />
        <TextField
          label="  توضیحات"
          name="description"
          className="w-full px-4 py-3 text-right border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          labelClassName="block text-gray-700 text-sm font-medium mb-2"
          onChange={handleChange}
          value={category.description || ""}
        />
        <div>
          <label htmlFor="type" className="mb-2 block">
            نوع
          </label>
          <Select
            instanceId="type"
            onChange={setSelectedType}
            options={categoryTypes}
            defaultValue={selectedType}
          />
        </div>
        <div className="flex justify-end">
          <Button
            onClick={onSubmit}
            type="submit"
            isLoading={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            ویرایش
          </Button>
        </div>
      </form>
    </div>
  );
}

export default EditeCategoryForm;
