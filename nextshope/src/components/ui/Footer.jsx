import React from "react";

function Footer() {
  return (
    <footer className="bg-secondary-900 text-secondary-100 py-6">
  <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
      <div className="text-xl font-bold text-primary-500"> نکست شاپ</div>
      <nav className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2">
        <a href="#" className="text-secondary-300 hover:text-primary-400 transition-colors duration-200">درباره ما</a>
        <a href="#" className="text-secondary-300 hover:text-primary-400 transition-colors duration-200">خدمات</a>
        <a href="#" className="text-secondary-300 hover:text-primary-400 transition-colors duration-200">تماس با ما</a>
        <a href="#" className="text-secondary-300 hover:text-primary-400 transition-colors duration-200">حریم خصوصی</a>
      </nav>
    </div>
    <div className="mt-8 pt-6 border-t border-secondary-700 text-center text-secondary-500 text-sm">
      &copy; 2024  نکست شاپ. تمامی حقوق محفوظ است.
    </div>
  </div>
</footer>
  );
}

export default Footer;
