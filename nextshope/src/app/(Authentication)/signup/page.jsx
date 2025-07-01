"use client"; // Enables the Next.js component to run on the client side

// Import necessary components and hooks
import CheackOTP from "@/components/CheackOTP"; // OTP verification component
import SendITPForm from "@/components/SendITPForm"; // OTP sending form component
import { useMutatecontroler } from "@/hook/useMutatecontriler"; // Custom mutation hook for API calls
import { cheackOTPAPI, sendOTPAPI } from "@/service/ServicesMethode"; // API endpoints for sending and checking OTP
import { useRouter } from "next/navigation"; // Next.js router for navigation
import React, { useEffect, useState } from "react"; // React hooks for state and effects
import toast from "react-hot-toast"; // Toast notifications for success and error messages

function page() {
  const TIMER_BASE = 90; // Default timer duration in seconds

  // 🔹 State variables for managing OTP process
  const [phoneNumber, setPhoneNumber] = useState(""); // Stores the user's phone number input
  const [step, setStep] = useState(1); // Tracks the current step in the OTP process
  const [otp, setOtp] = useState(""); // Stores the entered OTP code
  const [time, setTime] = useState(TIMER_BASE); // Timer for OTP expiration countdown
  const router = useRouter(); // Initialize the Next.js router for navigation

  // 🔹 Setting up API mutation for sending OTP
  const { data, error, isLoading, mutate } = useMutatecontroler({
    Api: sendOTPAPI, // API call to send OTP
  });

  // 🔹 Setting up API mutation for checking OTP
  const {
    data: dataotp,
    isLoading: otploading,
    mutate: otpmutate,
  } = useMutatecontroler({
    Api: cheackOTPAPI, // API call to verify OTP
  });

  // Handler function for phone number input changes
  const phoneNumberHandler = (e) => {
    setPhoneNumber(e.target.value);
  };

  // 🔹 Function to send OTP
  const sendOTP = async (e) => {
    e.preventDefault();
    try {
      const res = await mutate({ phoneNumber }); // API call to send OTP

      toast.success(res.message); // Show success message
      setStep(2); // Move to the OTP verification step
      setTime(TIMER_BASE); // Reset timer
      setOtp(""); // Clear OTP input
      console.log(res);
    } catch (err) {
      toast.error(error.response.data.message); // Display error message
    }
  };

  // 🔹 Function to check OTP validity
  const cheackOTP = async (e) => {
    e.preventDefault();

    // Validate OTP input before sending request
    if (!otp || otp.length < 6) {
      toast.error("Invalid OTP code!");
      return;
    }

    try {
      const response = await otpmutate({ otp, phoneNumber }); // API call to check OTP
      toast.success(response.message); // Show success message

      // Redirect user based on OTP verification result
      response.isActive ? router.push("/") : router.push("/complete_profile");
    } catch (error) {
      console.log(error?.response.data.message); // Log any errors
    }
  };

  // 🔹 Function to go back to phone number entry step
  const onBack = (e) => {
    e.preventDefault();
    setStep(1); // Reset step to phone number entry
  };

  // 🔹 Timer effect to count down from `TIMER_BASE`
  useEffect(() => {
    const timer = time > 0 && setInterval(() => setTime((t) => t - 1), 1000);
    return () => {
      timer && clearInterval(timer); // Clear timer interval when component unmounts
    };
  }, [time]); // Runs whenever `time` changes

  // 🔹 Render step-based UI
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
        return null; // Ensures no undefined return
    }
  };

  return <> {steprender()}</>; // Renders the appropriate step UI
}

export default page; // 📌 Exporting the `page` component
