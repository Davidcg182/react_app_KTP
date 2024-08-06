import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const EmployeeCard = ({ employee, onUpdateEmployee, onDeleteEmployee }) => {
  return (
    <div className="bg-white p-4 rounded shadow-md m-2 w-80">
      <h3 className="text-lg font-semibold mb-2">{employee.name}</h3>
      <p className="text-gray-700 mb-1">Email: {employee.email}</p>
      <p className="text-gray-700 mb-1">Contract Date: {employee.contract_date}</p>
      <p className="text-gray-700 mb-1">Salary: {employee.salary}</p>
      <div className="flex justify-end mt-4">
        <button
          className="text-blue-500 hover:text-blue-700 mx-2"
          onClick={() => onUpdateEmployee(employee)}
        >
          <FaEdit />
        </button>
        <button
          className="text-red-500 hover:text-red-700 mx-2"
          onClick={() => onDeleteEmployee(employee.id)}
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default EmployeeCard;
