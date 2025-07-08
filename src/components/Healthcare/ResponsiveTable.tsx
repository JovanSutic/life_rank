interface TableHeaders {
  name: string;
  field: string;
}

const ResponsiveTable = <T,>({
  headers = [],
  data = [],
}: {
  headers: TableHeaders[];
  data: T[];
}) => {
  const keysList = headers.map((item) => item.field);
  return (
    <div className="w-full">
      {/* Desktop Table */}
      <div className="hidden lg:block py-2 px-4 max-h-[450px] overflow-y-auto rounded-md shadow-md bg-white">
        <table className="w-full table-auto border-separate border-spacing-y-2">
          <thead>
            <tr className="text-left text-sm text-gray-600">
              {headers.map((header, i) => (
                <th key={i} className="pb-2">
                  {header.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-t border-gray-200">
                {keysList.map((key) => (
                  <td
                    key={row[key as keyof typeof row] as string}
                    className="py-3 pr-4 text-sm text-gray-800 break-words"
                  >
                    {row[key as keyof typeof row] as string}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="lg:hidden space-y-1 max-h-[486px] overflow-y-auto p-2 rounded-md shadow-md bg-white">
        {data.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={`${rowIndex < data.length - 1 && 'border-b border-gray-200'} py-4 space-y-1 text-sm`}
          >
            {headers.map((header) => (
              <div className="flex justify-between mb-2" key={`${header.name}${rowIndex}`}>
                <span className="font-semibold text-gray-800">{header.name}</span>
                <span className="text-gray-800 text-right break-words max-w-[70%]">
                  {row[header.field as keyof typeof row] as string}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResponsiveTable;
