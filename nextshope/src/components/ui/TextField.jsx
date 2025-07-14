import React from "react";
// Ability to display errors and label dynamic value naming and editing
function TextField({
  type = "text",
  placeholder = "",
  className = "",
  onChange,
  name,
  error,
  label,
  value,
  readOnly,

  disabled,
}) {
  return (
    <>
      <label className="w-auto" htmlFor={name}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        readOnly={readOnly || false}
        
        className="  block
        
    w-full
    rounded-lg            
    border-none            
    shadow-md              
    text-center            
    text-lg                
    focus:outline-none     
    focus:ring-0          
    focus:shadow-lg        
    py-3 px-4             
    placeholder-gray-400   w-lg sm:w-sm md:w-md
    transition-all duration-200 ease-in-out"
      />
      {error && <span className="text-red-700">{error.message}</span>}
    </>
  );
}

export default TextField;
