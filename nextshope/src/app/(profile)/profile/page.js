"use client"
import Spiner from '@/components/ui/Spiner'
import useGetUser from '@/hook/useGetUser'
import React from 'react'

function Page() {
  const { user, data,error,isLoading } = useGetUser()
if (isLoading) {
  return <Spiner/>
  
}
  return (
    <div>
    
    <h1> {user.name } خوش امدی  </h1>
    <p>

      <span>تاریخ عضویت :</span>
      <span>
        {new Date(user.createdAt).toLocaleDateString('fa-IR')}
      </span>
    </p>
    
    
    </div>
  )
}
export default Page