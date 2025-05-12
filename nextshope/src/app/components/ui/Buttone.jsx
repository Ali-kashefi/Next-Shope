
  
  function Button({ children, btnType, onClick, disabled, className, ...props }) {
    return (
      <button
        className={`   bg-primary-900  hover:bg-primary-600  rounded-md  ${className}`}
        onClick={onClick}
        disabled={disabled}
        {...props}
        type={btnType}
      >
        {children}
      </button>
    );
  }
  
  export default Button;
  