"use client";

import Button from "@/components/ui/Buttone";
import TextField from "@/components/ui/TextField";
import { useMutatecontroler } from "@/hook/useMutatecontriler";
import { completeProfileAPI } from "@/service/ServicesMethode";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

function Page() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const queryclient = useQueryClient();
  const router = useRouter();

  const { isLoading, error, mutate } = useMutatecontroler({
    Api: completeProfileAPI,
  });

  const nemaHndler = (e) => {
    setName(e.target.value);
  };

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (name.length === 0) {
      toast.error("لطفاً نام کامل خود را وارد کنید");
    } else if (name.length < 6) {
      toast.error("نام کامل باید حداقل ۶ کاراکتر باشد");
    }

    if (email.length === 0) {
      toast.error("لطفاً ایمیل خود را وارد کنید");
    } else if (email.length < 8) {
      toast.error("آدرس ایمیل نامعتبر است");
    }

    if (name.length < 6) {
      return toast.error("نام کامل باید حداقل ۶ کاراکتر باشد");
    }

    if (email.length < 8) {
      return toast.error("آدرس ایمیل نامعتبر است");
    }

    try {
      const { message } = await mutate({ name, email });

      toast.success(message);

      router.push("/");
      queryclient.invalidateQueries({ queryKey: ["get-user"] });
    } catch (err) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex flex-row justify-center">
      <div className="flex flex-col items-center ">
        <form onSubmit={onSubmit}>
          <div className="form sm:w-sm lg:w-lg xl:w-xl 2xl:w-2xl">
            <TextField
              type="text"
              placeholder="نام خود را وارد کنید"
              label="نام:"
              name="name"
              value={name}
              onChange={nemaHndler}
            />

            <TextField
              className="bg-primary-50 "
              label="ایمیل:"
              placeholder="ایمیل خود را وارد کنید"
              name="email"
              type="email"
              onChange={emailHandler}
              value={email}
            />

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

export default Page;