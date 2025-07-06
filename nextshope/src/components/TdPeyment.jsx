"use client";

import React from 'react'

function TdPeyment({payments}) {
    
  return (
    <>
     {payments.map((item, index) => (
            <tr key={item._id}>
              <td>{formatPrice(index + 1)}</td>
              <td>{item.invoiceNumber}</td>
              <td>{item.description}</td>
              <td>
                {item.cart.productDetail.map((item) => {
                  return <div key={item._id}> {item.title}</div>;
                })}
              </td>
              <td>{formatPrice( item.amount)}</td>
              <td>{new Date(item.createdAt).toLocaleDateString('fa-IR')}</td>
              <td>{item.status==="COMPLETED"?"موفق":"ناموفق"}</td>
            </tr>

          ))}
          </>
  )
}

export default TdPeyment