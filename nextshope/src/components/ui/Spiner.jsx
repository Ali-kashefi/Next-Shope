import React from "react";

function Spiner() {
  return (
     <>
      <div className="flex items-center justify-center p-4"> 
        <div className="relative inline-flex">
     
          <div className="w-12 h-12 rounded-full border-4 border-t-4 border-gray-200 animate-spin-fast"></div>
 
          <div className="w-8 h-8 rounded-full border-4 border-b-4 border-blue-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin-slow"></div>
        </div>
        <span className="sr-only">لطفاً منتظر بمانید...</span> 
      </div>
    </>
  );
}

export default Spiner;
