"use client";
import Button from "@/components/ui/Buttone";
import Radio from "@/components/ui/Radio";
import TextField from "@/components/ui/TextField";
import { useGetallproduct } from "@/hook/getAllProducts";
import { useMutatecontroler } from "@/hook/useMutatecontriler";
import { addNewCouponAPI } from "@/service/ServicesMethode";
import React, { useState } from "react";
import Select from "react-select";

function page() {
  const { data } = useGetallproduct();
  const { isLoading, mutate } = useMutatecontroler({ Api: addNewCouponAPI });
  const [productIds, setProductIds] = useState([]);
  const [expireDate, setExpireDate] = useState(new Date());
  const [formData, setFormData] = useState({
    code: "",
    amount: "",
    usageLimit: "",
  });
  const { products } = data || {};
  const [type, setType] = useState("percent");
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { message } = await mutate({
        ...formData,
        type,
        productIds: productIds.map((id) => {
          id._id;
        }),
        expireDate: new Date(expireDate).toISOString(),
      });
    } catch (error) {}
  };
  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">
        افزودن کد تخفیف
      </h1>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label
            className="block text-gray-600 text-sm font-medium mb-2"
            htmlFor="code"
          >
            کد
          </label>
          <input
            id="code"
            name="code"
            onChange={onChange}
            value={formData.code}
            placeholder="کد تخفیف را وارد کنید"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
          />
        </div>

        <div>
          <label
            className="block text-gray-600 text-sm font-medium mb-2"
            htmlFor="amount"
          >
            تعداد
          </label>
          <input
            id="amount"
            name="amount"
            onChange={onChange}
            value={formData.amount}
            placeholder="مثلاً 10"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
          />
        </div>

        <div>
          <label
            className="block text-gray-600 text-sm font-medium mb-2"
            htmlFor="usageLimit"
          >
            ظرفیت
          </label>
          <input
            id="usageLimit"
            name="usageLimit"
            onChange={onChange}
            value={formData.usageLimit}
            placeholder="مثلاً 50"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
          />
        </div>

        <div>
          <label className="block text-gray-600 text-sm font-medium mb-2">
            محصولات مرتبط
          </label>
          <Select
            options={products}
            isMulti
            getOptionLabel={(option) => option.title}
            getOptionValue={(option) => option._id}
            className="w-full"
            instanceId="product-select"
            onChange={setProductIds}
          />
        </div>

        <div>
          <p className="mb-2 block text-gray-700 font-medium">نوع کد تخفیف</p>
          <div className="flex space-x-8">
            <label className="flex items-center space-x-2 cursor-pointer">
              <Radio
                id="percent-type"
                name="type"
                value="percent"
                checked={type === "percent"}
                onChange={(e) => setType(e.target.value)}
                className="form-radio border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700">درصد</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <Radio
                id="fixedProduct-type"
                name="type"
                value="fixedProduct"
                checked={type === "fixedProduct"}
                onChange={(e) => setType(e.target.value)}
                className="form-radio border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700">قیمت ثابت</span>
            </label>
          </div>
          <div>
            <span className="mb-2 block">تاریخ انقضا</span>
            {/* <DatePicker
              inputClass="textField__input w-[330px]"
              value={expireDate}
              format="YYYY/MM/DD"
              calendar={persian}
              locale={persian_fa}
              calendarPosition="bottom-left"
              onChange={(date) => setExpireDate(date)}
            /> */}
          </div>
        </div>

        <div className="mt-6">
          <Button
            isLoading={isLoading}
            onClick={handleSubmit}
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-200"
          >
            افزودن کد تخفیف
          </Button>
        </div>
      </form>
    </div>
  );
}

export default page;
