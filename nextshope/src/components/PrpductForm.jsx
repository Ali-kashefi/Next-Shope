// "use client";
import React  from "react";
import TextField from "./ui/TextField";
import Button from "./ui/Buttone";
import Select from "react-select";
import { TagsInput } from "react-tag-input-component";


function PrpductForm({
  allcategories,
 categories,
  setCategpries,
  tags,
  setTags,
  productDataOnChange,
  productform,
   submiteForm,
   isLoading
}) {
 

  

  const ProductsFormData = [
    {
      id: 1,
      name: "title",
      lable: "عنوان",
      placeholder: "نام محصول",
      type: "text",
    },
    {
      id: 2,
      name: "description",
      lable: "توضیحات",
      placeholder: "توضیحات محصول",
      type: "text",
    },
    {
      id: 3,
      name: "slug",
      lable: "اسلاگ",
      placeholder: "اسلاگ محصول",
      type: "text",
    },
    {
      id: 4,
      name: "brand",
      lable: "برند",
      placeholder: "برند محصول",
      type: "text",
    },
    {
      id: 5,
      name: "price",
      lable: "قیمت",
      placeholder: "قیمت محصول",
      type: "text",
    },
    {
      id: 6,
      name: "discount",
      lable: "تخفیف",
      placeholder: "تخفیف محصول",
      type: "text",
    },
    {
      id: 7,
      name: "offPrice",
      lable: "قیمت روی تخفیف",
      placeholder: "قیمت تخفیف خورده",
      type: "text",
    },
    {
      id: 8,
      name: "countInStock",
      lable: " موجودی اولیه ",
      placeholder: "موجودی فعلی  ",
      type: "text",
    },
    {
      id: 9,
      name: "imageLink",
      lable: " عکس محصول ",
      placeholder: "  لینک عکس محصول را وارد کنید ",
      type: "text",
    },
  ];
  if(isLoading){
    return <div>loading</div>
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-700">
          ایجاد محصول جدید
        </h2>
        <form className="space-y-6" onSubmit={ submiteForm}>
          {ProductsFormData.map((item) => (
            <TextField
              key={item.id}
              label={item.lable}
              name={item.name}
              placeholder={ item.placeholder}
              value={productform[item.name]}
              onChange={  productDataOnChange}
              type={item.type}
              className="w-full px-4 py-3 text-right border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              labelClassName="block text-gray-700 text-sm font-medium mb-2"
            />
          ))}
          <label >دسته بندی </label>
          <Select
          value={categories}
            onChange={setCategpries}
            options={allcategories}
            getOptionLabel={(option) => option.title}
            getOptionValue={(option) => option._id}
            defaultValue={categories}
            placeholder="دسته بندی محصول "
            className="w-full text-center px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <label >تگ محصول </label>
          <TagsInput
            value={tags}
            onChange={setTags}
            
            name="tags"
            placeHolder="تگ محصول"
            classNames="w-full px-4 py-3  text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="flex justify-end">
            <Button 
            onClick={ submiteForm}
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              افزودن محصول
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PrpductForm;
