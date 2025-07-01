"use client"
import TablePayment from '@/components/TablePayment';
import Spiner from '@/components/ui/Spiner'
import useGetUser from '@/hook/useGetUser'
import React from 'react'

function Page() {
  const { user, data,error,isLoading } = useGetUser();
  const {payments} = data|| {};
   
if (isLoading) {
  return <Spiner/>
  
}
const latestThreePayments = payments.sort((a,b)=>new Date(b.createdAt)- new Date(a.createdAt) ).slice(0, 3);
  return (
    <div>
    
    <h1><span className='text-primary-800' >{user.name }</span>  خوش امدی  </h1>
    <p>

      <span>تاریخ عضویت :</span>
      <span>
        {new Date(user.createdAt).toLocaleDateString('fa-IR')}
      </span>
    </p>
    <TablePayment  payments={latestThreePayments} />
    
    
    </div>
  )
}
export default Page