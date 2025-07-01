import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import React from "react";

function Search({ value, onChange,placeholder }) {
  return (
    <div className="relative flex w-2/5  border-gray-200 border-2 rounded-lg">
      <input
        value={value}
        onChange={onChange}
        type="text"
        placeholder={placeholder}
        className="w-full border-none text-secondary-500 rounded-r-lg py-2 px-4 focus:outline-none focus:border-primary-500"
      />
      <span className="bg-secondary-200 border-none w-12 flex items-center justify-center">
        <MagnifyingGlassIcon
          width={20}
          height={20}
          className="text-secondary-600"
        />
      </span>
    </div>
  );
}

export default Search;
