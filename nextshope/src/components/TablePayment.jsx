import { userPaymentTHeads } from "@/constants/userPaymentTHeads";
import React from "react";
import { formatPrice } from "utils/priceFornater";


function TablePayment({ payments }) {
  return (
    <div className="overflow-x-auto w-full rounded-lg shadow-md border border-gray-200"> 
      <table className="min-w-full bg-white border-collapse text-sm md:text-base"> 

        <thead>
          <tr>
            {userPaymentTHeads.map((item) => (
              <th 
                className="py-3 px-2 md:px-4 text-right bg-gray-100 text-gray-700 uppercase font-semibold text-xs md:text-sm tracking-wider border-b border-gray-300" 
                key={item.id}
              >
                {item.title}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {payments.map((item, index) => (
            <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200" key={item._id}>
              <td className="py-2 px-2 md:px-4 text-right">{formatPrice(index + 1)}</td>
              
              <td className="py-2 px-2 md:px-4 text-right whitespace-nowrap overflow-hidden text-ellipsis max-w-[80px] md:max-w-[120px]">
                {item.invoiceNumber}
              </td>
              
              <td className="py-2 px-2 md:px-4 text-right whitespace-nowrap overflow-hidden text-ellipsis max-w-[100px] md:max-w-[150px]">
                {item.description}
              </td>
              
              <td className="py-2 px-2 md:px-4 text-right">
                {item.cart.productDetail.map((product) => (
                  <div 
                    key={product._id} 
                    className="whitespace-nowrap overflow-hidden text-ellipsis max-w-[80px] md:max-w-none"
                  >
                    {product.title}
                  </div>
                ))}
              </td>
              
              <td className="py-2 px-2 md:px-4 text-right">{formatPrice(item.amount)}</td>
              
              <td className="py-2 px-2 md:px-4 text-right whitespace-nowrap">
                {new Date(item.createdAt).toLocaleDateString("fa-IR")}
              </td>
              
              <td className="py-2 px-2 md:px-4 text-right whitespace-nowrap">
                {item.status === "COMPLETED" ? (
                  <span className="text-green-600 font-semibold">موفق</span>
                ) : (
                  <span className="text-red-600 font-semibold">ناموفق</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablePayment;