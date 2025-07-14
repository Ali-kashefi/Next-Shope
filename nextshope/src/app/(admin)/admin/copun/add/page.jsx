"use client";
import Button from "@/components/ui/Buttone";
import Radio from "@/components/ui/Radio";
import { faIR } from "date-fns/locale/fa-IR";
import { useGetallproduct } from "@/hook/getAllProducts";
import { useMutatecontroler } from "@/hook/useMutatecontriler";
import { addNewCouponAPI } from "@/service/ServicesMethode";
import React, { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";




registerLocale("faIR", faIR);

function Page() {
  const { data } = useGetallproduct();
  const { products } = data || {};
  const [formData, setFormData] = useState({
    code: "",
    amount: "",
    usageLimit: "",
  });
  const [type, setType] = useState("percent");
  const [productIds, setProductIds] = useState([]);
  const [expireDate, setExpireDate] = useState(new Date());
  const { isLoading, mutate } = useMutatecontroler({
    Api: addNewCouponAPI,
  });
  const router = useRouter();

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        amount: Number(formData.amount),
    usageLimit: Number(formData.usageLimit), 
        type,
        expireDate: new Date(expireDate).toISOString(),
        productIds: productIds.map((p) => p._id),
      };

      const { message } = await mutate(payload);
      toast.success(message);
      router.push("/admin/copun");
    } catch (error) {
      toast.error(error?.response?.data?.message || "خطایی رخ داد.");
    }
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
            onChange={handleFormChange}
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
            مقدار
          </label>
          <input
            id="amount"
            name="amount"
            type="number"
            
            onChange={handleFormChange}
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
            type="number" 
    
            onChange={handleFormChange}
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
            <DatePicker
              locale="faIR"
              selected={expireDate}
              onChange={(date) => setExpireDate(date)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
            />
          </div>
        </div>

        <div className="mt-6">
          <Button
            isLoading={isLoading}
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

export default Page;