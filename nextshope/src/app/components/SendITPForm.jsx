import React from 'react';
import TextField from './ui/TextField';
import Button from './ui/Buttone';


function SendITPForm({ phoneNumber, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-4 items-center">
        <TextField
          label="شماره موبایل"
          placeholder="شماره موبایل را وارد کنید"
          name="mobile"
          type="text"
          onChange={onChange}
          value={phoneNumber}

        />
        <Button  btnType="submit" className="w-lg sm:w-sm md:w-md h-12">
          ارسال
        </Button>
      </div>
    </form>
  );
}

export default SendITPForm;
