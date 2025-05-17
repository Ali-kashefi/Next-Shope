import React, { useState } from "react";
import OTPInput from "react-otp-input";
import Button from "./ui/Buttone";

function CheackOTP({ onSubmit, phonenumber, otp, setOtp }) {
  return (
    <div className="flex justify-center h-dvh pt-10 ">
      <form onSubmit={onSubmit}>
        <div className="flex pt-10 flex-col sha w-md items-center gap-6 shadow-lg p-6 md:gap-4 bg-white rounded-lg h-1/2 ">
          <p className="text-secondary-900 text-md t ">
            کد برای {phonenumber} ارسال شد
          </p>
          <p className="text-secondary-900  text-primery-50 text-md">
            کد ارسال شده را وارد کنید
          </p>
          
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
            ارسال
          </Button>
        </div>
      </form>
    </div>
  );
}
export default CheackOTP;
