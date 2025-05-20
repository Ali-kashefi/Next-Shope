import React, { useState } from "react";
import OTPInput from "react-otp-input"; // Library for handling OTP input
import Button from "@/components/ui/Buttone"; // Custom button component
import { ArrowLeftIcon } from "@heroicons/react/24/solid"; // Icon for back navigation

// Component for OTP verification
function CheackOTP({
  onSubmit, // Function to submit OTP
  phonenumber, // User's phone number
  otp, // OTP input value
  setOtp, // State function to update OTP
  onback, // Function to go back to previous step
  time, // Countdown timer for OTP expiration
  onResend, // Function to resend OTP
}) {
  return (
    <div className="flex justify-center h-dvh pt-10">
      {/* Form for OTP verification */}
      <form
        onSubmit={onSubmit}
        className="flex flex-col items-center gap-6"
      >
        <div className="flex pt-10 flex-col w-md items-center gap-6 shadow-lg p-6 md:gap-4 bg-white rounded-lg h-1/2">
          {/* Message showing the phone number where OTP was sent */}
          <p className="text-secondary-900 text-md">
            OTP sent to {phonenumber}
          </p>
          <p className="text-secondary-900 text-md">
            Please enter the received OTP
          </p>

          {/* Option to go back if phone number is incorrect */}
          <div className="flex flex-row-reverse">
            <p className="text-xs">Is this number incorrect?</p>
            <button onClick={onback} className="text-primary-800">
              <ArrowLeftIcon
                width={15}
                height={15} // Fixed typo: "hanging" → "height"
                color="rgb(--color-primary-800)"
              />
            </button>
          </div>

          {/* OTP Input Field */}
          <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={6} // Expecting a 6-digit OTP
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

          {/* Submit button to verify OTP */}
          <Button onClick={onSubmit} className="w-lg sm:w-sm md:w-sm h-12">
            Submit
          </Button>

          {/* Countdown timer for OTP resend */}
          <div>
            {time > 0 ? (
              <p>({time}) seconds remaining for OTP resend</p>
            ) : (
              <button onClick={onResend}>Resend OTP</button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default CheackOTP; // Exporting the OTP verification component
