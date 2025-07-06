import React from "react";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-gray-200 py-8 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div className="text-2xl font-extrabold text-blue-400">
            نکست شاپ
          </div>
          <nav className="flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-3 text-lg">
            <a href="#" className="hover:text-blue-300 transition-colors duration-200">درباره ما</a>
            <a href="#" className="hover:text-blue-300 transition-colors duration-200">خدمات</a>
            <a href="#" className="hover:text-blue-300 transition-colors duration-200">تماس با ما</a>
            <a href="#" className="hover:text-blue-300 transition-colors duration-200">حریم خصوصی</a>
          </nav>
        </div>
        <div className="mt-10 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} نکست شاپ. تمامی حقوق محفوظ است.
        </div>
      </div>
    </footer>
  );
}

export default Footer;