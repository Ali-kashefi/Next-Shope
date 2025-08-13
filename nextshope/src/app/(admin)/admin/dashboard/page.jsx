import SalesChart from "@/components/ui/Chart";
import React from "react";
import { processPaymentsForSalesChart } from "utils/chartDataProcesso";
import { formatPrice } from "utils/priceFornater";
import { showCountData } from "utils/showcountData";

async function page() {
  const {
    numberOfOrder,
    numberOfPosts,
    numberOfUsers,
    lastThreePayments,
    allPayments,
  } = await showCountData();

  const chartPreparedData = processPaymentsForSalesChart(allPayments);

  let totalGrossPriceSum = 0;
  if (Array.isArray(allPayments)) {
    totalGrossPriceSum = allPayments.reduce((sum, payment) => {
      const price = payment?.cart?.payDetail?.totalPrice;

      if (typeof price === "number" && !isNaN(price)) {
        return sum + price;
      } else {
        return sum;
      }
    }, 0);
  }



  return (
    <div className="min-h-screen bg-app-background p-6 lg:p-8">
      <h1 className="text-3xl font-bold text-secondary-900 mb-6">داشبورد</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md border border-secondary-100 flex flex-col items-center justify-center">
          <p className="text-secondary-600 text-sm mb-2">کل محصولات</p>
          <p className="text-3xl font-bold text-primary-700">
            {formatPrice(numberOfPosts)}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-secondary-100 flex flex-col items-center justify-center">
          <p className="text-secondary-600 text-sm mb-2"> کل فاکتور ها</p>
          <p className="text-3xl font-bold text-primary-800">
            {formatPrice(numberOfOrder)}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-secondary-100 flex flex-col items-center justify-center">
          <p className="text-secondary-600 text-sm mb-2">کاربران فعال</p>
          <p className="text-3xl font-bold text-secondary-900">
            {formatPrice(numberOfUsers)}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-secondary-100 flex flex-col items-center justify-center">
          <p className="text-secondary-600 text-sm mb-2"> مجموع فروش</p>
          <p className="text-3xl font-bold text-secondary-900">
            {formatPrice(totalGrossPriceSum)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md border border-secondary-100">
          <h2 className="text-xl font-semibold text-secondary-800 mb-4">
            روند فروش (30 روز گذشته)
          </h2>
          <div className="h-64 bg-secondary-50 flex items-center justify-center text-secondary-400 rounded-md">
            <SalesChart
              chartData={chartPreparedData}
             
            />{" "}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-secondary-100">
          <h2 className="text-xl font-semibold text-secondary-800 mb-4">
            آخرین سفارشات
          </h2>
          <ul className="space-y-3 text-secondary-700">
            {lastThreePayments.map((order) => {
              return (
                <li
                  key={order._id}
                  className="flex justify-between items-center text-sm border-b pb-2 border-secondary-100 last:border-b-0 last:pb-0"
                >
                  <span>سفارش {order._id.slice(8, 15)}</span>
                  <span className="text-primary-600 font-medium">
                    {order.cart.payDetail.totalPrice } تومان
                  </span>
                </li>
              );
            })}
            <a href="/admin/orders">
              {" "}
              <li className="text-primary-800 text-sm">
                مشاهده تمام فاکتور ها
              </li>
            </a>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default page;
