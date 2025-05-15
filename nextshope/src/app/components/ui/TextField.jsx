import React from "react";

function TextField({
  rest,
  type,
  placeholder,
  className,
  onChange,
  name,
  error,
  label,value
}) {
  return (
    <>
      <label className="w-auto" htmlFor={name}>{label}</label>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        className={`focus:shadow-secondary-50 outline-none w-lg sm:w-sm md:w-md h-12 bg-primary-50 rounded-md text-secondary-900 text-center ${className}`}
        onChange={onChange}
        value={value}
        {...rest}
      />

      {error && <span className="text-red-700">{error.message}</span>}
    </>
  );
}

export default TextField;
