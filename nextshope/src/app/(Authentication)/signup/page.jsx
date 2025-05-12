import Buttone from "app/components/ui/Buttone";
import TextField from "app/components/ui/TextField";
import React from "react";

function page() {
  
  return (
    <>
      <form action="">
        <div className="flex flex-col gap-4 items-center">
          <TextField
            label="شماره موبایل"
            placeholder="شماره موبایل را وارد کنید"
            name="mobile"
            type="text"
          />
          <Buttone btnType=" primary" className="w-lg sm:w-sm md:w-md h-12">ارسال</Buttone>
        </div>
      </form>
    </>
  );
}

export default page;
