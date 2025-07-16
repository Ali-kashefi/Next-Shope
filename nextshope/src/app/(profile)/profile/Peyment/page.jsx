"use client";
import TablePayment from "@/components/TablePayment";
import Spiner from "@/components/ui/Spiner";

import useGetUser from "@/hook/useGetUser";
import React from "react";

function PeymentPage() {
  const { data, user, isLoading } = useGetUser();
  const { payments } = data || {};
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <Spiner />
      </div>
    );
  }
  return (
    <>
      <h1>فاکتور ها</h1>
     <TablePayment payments={payments}/>
    </>
  );
}

export default PeymentPage;
