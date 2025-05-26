import Spiner from "./Spiner";

function Button({ children, btnType, onClick, disabled, className, props,isLoading }) {
  
  return (
    <button
      className={`   bg-primary-900  hover:bg-primary-600  rounded-lg  text-primary-50  ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
      type={btnType}
    >
      {children}
       {isLoading && <Spiner />}
    </button>
  );
}

export default Button;
