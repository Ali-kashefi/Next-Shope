"use client";
//Send the number to receive the verification code. If the number
//  is sent, it will go to the OTP check form. Without changing the URL
//  and the verification code sent, if it is correct, it will go to the profile
//  completion stage. Use two components for this: Step status to determine the stage
// in which the user is present. Use React Test to

import CheackOTP from "@/components/CheackOTP";
import SendITPForm from "@/components/SendITPForm";
import { useMutatecontroler } from "@/hook/useMutatecontriler";
import { cheackOTPAPI, sendOTPAPI } from "@/service/ServicesMethode";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function page() {
  const TIMER_BASE = 90;

  const [phoneNumber, setPhoneNumber] = useState("");
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");

  const [time, setTime] = useState(TIMER_BASE);
  const router = useRouter();

  const { data, error, isLoading, mutate } = useMutatecontroler({
    Api: sendOTPAPI,
  });

  const {
    data: dataotp,
    isLoading: otploading,
    mutate: otpmutate,
  } = useMutatecontroler({
    Api: cheackOTPAPI,
  });

  const phoneNumberHandler = (e) => {
    setPhoneNumber(e.target.value);
  };

  const sendOTP = async (e) => {
    e.preventDefault();
    try {
      const { data } = await mutate({ phoneNumber });

      toast.success(data.message);
      setStep(2);
      setTime(TIMER_BASE);
      setOtp("");
    } catch (err) {
      toast.error(error.data.message);
    }
  };

  const cheackOTP = async (e) => {
  e.preventDefault();

  if (!otp || otp.length < 6) {
    toast.error("کد نامعتبر است");
    return;
  }

  try {
    const response = await otpmutate({ otp, phoneNumber });

    if (response.isActive) {
      toast.success("کد تایید شد به نکست شاپ خوش آمدید");
      router.push("/"); 
    } else {
      toast.success("کد تایید شد. لطفاً اطلاعات پروفایل خود را تکمیل کنید.");
      router.push("/complete_profile"); 
    }

  } catch (error) {
    toast.error("کد اشتباه است");
    console.error("خطا در بررسی OTP:", error); 
  }
};

  const onBack = (e) => {
    e.preventDefault();
    setStep(1);
  };

  useEffect(() => {
    const timer = time > 0 && setInterval(() => setTime((t) => t - 1), 1000);
    return () => {
      timer && clearInterval(timer);
    };
  }, [time]);

  const steprender = () => {
    switch (step) {
      case 1:
        return (
          <SendITPForm
            isLoading={isLoading}
            onSubmit={sendOTP}
            phoneNumber={phoneNumber}
            onChange={phoneNumberHandler}
          />
        );
      case 2:
        return (
          <CheackOTP
            onSubmit={cheackOTP}
            otp={otp}
            setOtp={setOtp}
            phonenumber={phoneNumber}
            onback={onBack}
            time={time}
            onResend={sendOTP}
          />
        );
      default:
        return null;
    }
  };

  return <> {steprender()}</>;
}

export default page;
