"use client";
import React from "react";
import { createPortal } from "react-dom";
import { ExclamationCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";

function Modal({ title, reject, accept, open, onClose, onConfirm }) {
  if (!open) return null;

  return createPortal(
    <>
      <div
        className="fixed inset-0  bg-opacity-10 backdrop-blur-sm z-40"
        onClick={onClose}
      ></div>

      <div
        id="popup-modal"
        tabIndex="-1"
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 p-4 w-full max-w-md max-h-full"
      >
        <div className="relative bg-white rounded-lg p-4 shadow-lg">
          <button
            type="button"
            className="absolute top-3 end-2.5 text-gray-500 bg-transparent hover:bg-gray-100 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
            onClick={onClose}
          >
            <XMarkIcon className="w-4 h-4" />
            <span className="sr-only">بستن مودال</span>
          </button>
          <div className="p-4 md:p-5 text-center">
            <ExclamationCircleIcon className="mx-auto mb-4 text-yellow-500 w-12 h-12" />
            <h3 className="mb-5 text-lg font-semibold text-gray-700">
              {title}
            </h3>
            <button
              type="button"
              className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
              onClick={onConfirm}
            >
              {accept}
            </button>
            <button
              type="button"
              className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-700 focus:outline-none bg-gray-100 rounded-lg border border-gray-300 hover:bg-gray-200 hover:text-gray-900 focus:z-10 focus:ring-4 focus:ring-gray-200"
              onClick={onClose}
            >
              {reject}
            </button>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}

export default Modal;