import { userPaymentTHeads } from "@/constants/userPaymentTHeads";
import React from "react";
import { formatPrice } from "utils/priceFornater";


function TablePayment({ payments }) {
  return (

    <div className="overflow-x-auto w-full rounded-lg shadow-sm">
      <table className="min-w-full bg-white border-collapse">

        <thead>
          <tr>
            {userPaymentTHeads.map((item) => (
              <th className="table___th" key={item.id}>
                {item.title}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {payments.map((item, index) => (
      
            <tr className="table___tr hover:bg-gray-50 transition-colors duration-200" key={item._id}>
              <td className="table___td">{formatPrice(index + 1)}</td>
              <td className="table___td whitespace-nowrap truncate max-w-[120px]">
               
                {item.invoiceNumber}
              </td>
              <td className="table___td whitespace-nowrap truncate max-w-[150px]">
                {item.description}
              </td>
              <td className="table___td">
                {item.cart.productDetail.map((product) => {
           
                  return (
                    <div key={product._id} className="whitespace-nowrap">
                      {product.title}
                    </div>
                  );
                })}
              </td>
              <td className="table___td">{formatPrice(item.amount)}</td>
              <td className="table___td whitespace-nowrap">
                {new Date(item.createdAt).toLocaleDateString("fa-IR")}
              </td>
              <td className="table___td whitespace-nowrap">
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