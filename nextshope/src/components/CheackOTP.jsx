import React, { useState } from "react";
import OTPInput from "react-otp-input";
import Button from "@/components/ui/Buttone"; 
import { ArrowLeftIcon } from "@heroicons/react/24/solid"; 


function CheackOTP({
  onSubmit,
  phonenumber, 
  otp, 
  setOtp, 
  onback, 
  time,
  onResend, 
}) {
  return (
    <div className="flex justify-center h-dvh pt-10">
      
      <form
        onSubmit={onSubmit}
        className="flex flex-col items-center gap-6"
      >
        <div className="flex pt-10 flex-col w-md items-center gap-6 shadow-lg p-6 md:gap-4 bg-white rounded-lg h-1/2">
    
          <p className="text-secondary-900 text-md">
            کد تایید به شماره {phonenumber} ارسال شد.
          </p>
          <p className="text-secondary-900 text-md">
            لطفاً کد دریافتی را وارد کنید.
          </p>

      
          <div className="flex flex-row-reverse">
            <p className="text-xs">شماره اشتباه است؟</p>
            <button onClick={onback} className="text-primary-800">
              <ArrowLeftIcon
                width={15}
                height={15} 
                color="rgb(--color-primary-800)"
              />
            </button>
          </div>

    
          <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={6} 
            renderSeparator={<span>-</span>}
            renderInput={(props) => <input {...props} />}
            inputStyle={{
              width: "2.5rem",
              padding: "0.5rem 0.2rem",
              borderRadius: "0.5rem",
              border: "1px solid rgb(--color-primary-300)",
            }}
            containerStyle="flex gap-x-2 justify-center"
          />

      
          <Button onClick={onSubmit} className="w-lg sm:w-sm md:w-sm h-12">
            تایید
          </Button>


          <div>
            {time > 0 ? (
              <p>({time}) ثانیه تا ارسال مجدد کد</p>
            ) : (
              <button onClick={onResend}>ارسال مجدد کد</button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default CheackOTP; 