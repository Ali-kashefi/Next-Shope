"use client"; // Enables the Next.js component to run on the client side

// Import necessary components and hooks
import Button from "@/components/ui/Buttone"; // Button component
import TextField from "@/components/ui/TextField"; // Text input field component
import { useMutatecontroler } from "@/hook/useMutatecontriler"; // Custom mutation hook
import { completeProfileAPI } from "@/service/ServicesMethode"; // API endpoint for profile completion
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation"; // Next.js router hook for navigation
import React, { useState } from "react"; // React and useState hook for state management
import toast from "react-hot-toast"; // Toast notifications for success and error messages

function Page() {
  // 🔹 State variables for managing user inputs
  const [name, setName] = useState(""); // Stores the user's name input
  const [email, setEmail] = useState(""); // Stores the user's email input
  const queryclient = useQueryClient();
  const router = useRouter(); // Initialize the Next.js router for navigation

  // 🔹 Setting up API mutation
  const { isLoading, error, mutate } = useMutatecontroler({
    Api: completeProfileAPI, // API endpoint for completing profile
  });

  // Handler function for name input changes
  const nemaHndler = (e) => {
    setName(e.target.value);
  };

  // Handler function for email input changes
  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  // 🔹 Form submission handler
  const onSubmit = async (e) => {
    e.preventDefault(); // Prevents page reload on form submission

    // 🚀 Validate the name input
    if (name.length === 0) {
      toast.error("Please enter your full name");
    } else if (name.length < 6) {
      toast.error("Full name must be at least 6 characters");
    }

    // 🚀 Validate the email input
    if (email.length === 0) {
      toast.error("Please enter your email");
    } else if (email.length < 8) {
      toast.error("Invalid email address");
    }

    // 🚀 Ensure the input is valid before making API request
    if (name.length < 6) {
      return toast.error("Full name must be at least 6 characters");
    }

    if (email.length < 8) {
      return toast.error("Invalid email address");
    }

    try {
      // Make an API request to complete the profile
      const { message } = await mutate({ name, email });

      // Show success message using toast notification
      toast.success(message);

      // Redirect the user to the homepage
      router.push("/");
      queryclient.invalidateQueries({ queryKey: ["get-user"] });
    } catch (err) {
      // Display error message if API request fails
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex flex-row justify-center">
      <div className="flex flex-col items-center ">
        {/* 📌 Registration Form */}
        <form onSubmit={onSubmit}>
          <div className="form sm:w-sm lg:w-lg xl:w-xl 2xl:w-2xl">
            {/* 🔹 Name input field */}
            <TextField
              type="text"
              placeholder="Enter your name"
              label="نام:"
              name="name"
              value={name}
              onChange={nemaHndler}
            />

            {/* 🔹 Email input field */}
            <TextField
              className="bg-primary-50 "
              label="ایمیل:"
              placeholder="Enter your email"
              name="email"
              type="email"
              onChange={emailHandler}
              value={email}
            />

            {/* 🔹 Submit button */}
            <Button
              onClick={onSubmit}
              isloading={isLoading}
              className="h-12 w-full"
            >
              ارسال
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Page; // 📌 Exporting the `Page` component
