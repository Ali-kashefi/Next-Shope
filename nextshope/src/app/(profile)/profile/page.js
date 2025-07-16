"use client";
import TablePayment from '@/components/TablePayment';
import Spiner from '@/components/ui/Spiner';
import useGetUser from '@/hook/useGetUser';
import React from 'react';

function Page() {
  const { user, data, error, isLoading } = useGetUser();
  const { payments } = data || {};

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spiner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-lg p-4">
        خطا در بارگذاری اطلاعات کاربر: {error.message || 'خطای ناشناخته'}
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-700 text-lg p-4">
        اطلاعات کاربری یافت نشد.
      </div>
    );
  }

  if (!payments || payments.length === 0) {
    return (
      <div className="container mx-auto p-4 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">
          <span className="text-primary-800">{user.name}</span> عزیز، خوش آمدید!
        </h1>
        <p className="text-lg text-gray-600 mb-2">
          <span className="font-semibold">تاریخ عضویت: </span>
          <span>{new Date(user.createdAt).toLocaleDateString('fa-IR')}</span>
        </p>
        <p className="text-xl md:text-2xl text-primary-800 mt-6">
          فاکتوری یافت نشد.
        </p>
      </div>
    );
  }

 

  return (
    <div className="container mx-auto p-4 md:p-8 ">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">
        <span className="text-primary-800">{user.name}</span> عزیز، خوش آمدید!
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        <span className="font-semibold">تاریخ عضویت: </span>
        <span>{new Date(user.createdAt).toLocaleDateString('fa-IR')}</span>
      </p>

      <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-700">
        لیست تمام فاکتورهای شما:
      </h2>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
        <TablePayment payments={payments} />
      </div>
    </div>
  );
}

export default Page;