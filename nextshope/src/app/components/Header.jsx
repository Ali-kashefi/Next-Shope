import Link from "next/link";
import React from "react";

function Header() {
  return (
    <>
      <header className="shadow-md mb-10">
        <nav >
            <ul className="flex w-full bg-primary-50 text-secondary-900 px-20 justify-between items-center py-4 container xl:max-w-screen-xl   ">
          <Link href="/">
         
            <li>خانه</li>
          </Link>
          <Link href="/">
       
            <li>محصولات</li>
          </Link>
          <Link href="/signup">
            <li>ورود</li>
          </Link>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Header;
