import React from "react";
// At the entrance of this table,
//  two representations of the header and body of this table are received,
//  which do not require any arguments and all the work is done here.
function Table({ tHeader, tBody }) {
  return (
    <div className="overflow-x-auto rounded-lg shadow-md">
      <table className="w-full divide-y divide-gray-200 block md:table">
        <thead className="block md:table-header-group">
          <tr className="block md:table-row bg-gray-50">
            {tHeader?.map((item, index) => (
              <th
                key={index}
                className="px-6 py-3 text-right text-sm font-bold text-secondary-700 uppercase tracking-wider block md:table-cell"
              >
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className=" md:table-row-group font-bold text-center flex justify-center">
          {tBody?.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="block md:table-row border border-gray-200 mb-3 rounded-lg overflow-hidden bg-white md:border-none md:mb-0 md:rounded-none md:overflow-visible"
            >
              {row?.map((item, itemIndex) => (
                <td
                  key={itemIndex}
                  className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900 block relative md:table-cell md:static md:w-auto md:p-4 md:text-right md:text-sm md:text-gray-900 before:content-[attr(data-label)] before:absolute before:right-0 before:top-0 before:w-1/2 before:h-full before:p-4 before:font-bold before:text-gray-600 before:bg-gray-100 before:flex before:items-center before:border-b before:border-gray-200 md:before:content-none"
                >
                  {item}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
