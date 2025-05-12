const btntype = {
    primary: "bg-primary-900  hover:bg-primary-600",
    secondary: "bg-gray-400  rounded-md",
    outline: "border border-blue-400 text-blue-400  rounded-md",
    danger: "bg-red-500 text-white  rounded-md",
  };
  
  function Button({ children, btnType, onClick, disabled, className, ...props }) {
    return (
      <button
        className={`  ${btntype[btnType]} bg-primary-900  hover:bg-primary-600  rounded-md  ${className}`}
        onClick={onClick}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
  
  export default Button;
  