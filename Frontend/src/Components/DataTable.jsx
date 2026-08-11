import React from 'react';

const DataTable = ({ columns, data, onEdit, onDelete }) => {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th key={column.key}>
                                {column.label}
                            </th>
                        ))}

                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            {columns.map((column) => (
                                <td key={column.key}>
                                    {item[column.key]}
                                </td>
                            ))}

                            <td>
                                <button onClick={() => onEdit(item)}>
                                    Edit
                                </button>

                                <button onClick={() => onDelete(item.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;