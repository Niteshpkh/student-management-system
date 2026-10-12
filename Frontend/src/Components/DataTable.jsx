import React from 'react';

const DataTable = ({ columns = [], data = [], onEdit, onDelete }) => {
  const hasActions = Boolean(onEdit || onDelete);

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} className="border p-2 text-left">
                {column.label}
              </th>
            ))}
            {hasActions && (
              <th className="border p-2 text-center">Actions</th>
            )}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (hasActions ? 1 : 0)}
                className="border p-4 text-center text-gray-500"
              >
                No records found.
              </td>
            </tr>
          ) : (
            data.map((item, index) => {
              const itemId = item?.id || item?._id || index;

              return (
                <tr key={itemId} className="hover:bg-gray-50">
                  {columns.map((column) => (
                    <td key={column.key} className="border p-2">
                      {item[column.key] !== undefined && item[column.key] !== null
                        ? String(item[column.key])
                        : '-'}
                    </td>
                  ))}

                  {hasActions && (
                    <td className="border p-2 text-center space-x-2">
                      {onEdit && (
                        <button
                          type="button"
                          onClick={() => onEdit(item)}
                          className="px-2 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                        >
                          Edit
                        </button>
                      )}

                      {onDelete && (
                        <button
                          type="button"
                          onClick={() => onDelete(item?.id || item?._id)}
                          className="px-2 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;