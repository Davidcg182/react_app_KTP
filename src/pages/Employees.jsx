// src/pages/Employees.jsx
import React, { useEffect, useState } from 'react';
import EmployeeCard from '../components/EmployeeCard';
import ConfirmationModal from '../components/ConfirmationModal';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

const Employees = () => {
    const [employees, setEmployees] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState(null);
    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        contract_date: '',
        salary: ''
    });
    const [employeeToDelete, setEmployeeToDelete] = useState(null);
    const resultsPerPage = 3;
    const navigate = useNavigate();

    const fetchEmployees = async (page) => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        try {
            const response = await fetch(`https://node-app-ktp.onrender.com/users?page=${page}&&results_per_page=${resultsPerPage}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (data.status === 'fail') {
                navigate('/login');
            } else {
                setEmployees(data.data);

                // const total = data.data.total
                const total = 10
                setTotalPages(Math.ceil(total / resultsPerPage));
            }
        } catch (error) {
            console.error('Error fetching employees:', error);
            navigate('/login');
        }
    };

    useEffect(() => {
        fetchEmployees(currentPage);
    }, [currentPage, navigate]);

    const handleAddEmployee = (newEmployee) => {
        setEmployees([...employees, newEmployee]);
    };

    const handleUpdateEmployee = (updatedEmployee) => {
        setEmployees(employees.map(employee => employee.id === updatedEmployee.id ? updatedEmployee : employee));
    };

    const handleDeleteEmployee = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        try {
            const response = await fetch(`https://node-app-ktp.onrender.com/users/delete/${employeeToDelete}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                // setEmployees(employees.filter(employee => employee.id !== employeeToDelete));
                setEmployeeToDelete(null);
                setIsConfirmModalOpen(false);
            } else {
                console.error('Error deleting employee');
            }
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleEditClick = (employee) => {
        setEditingEmployee(employee);
        setFormValues({
            name: employee.name,
            email: employee.email,
            contract_date: employee.contract_date,
            salary: employee.salary,
        });
        setIsModalOpen(true);
    };

    const handleFormChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        try {
            const response = await fetch(`https://node-app-ktp.onrender.com/users/update/${editingEmployee.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(formValues),
            });

            const data = await response.json();

            if (data.status === 'success') {
                // handleUpdateEmployee(data.data.user);
                setIsModalOpen(false);
            } else {
                console.error('Error updating employee:', data.message);
            }
        } catch (error) {
            console.error('Error updating employee:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen w-full">
            <div className="flex flex-wrap justify-center w-full">
                {employees.map(employee => (
                    <EmployeeCard
                        key={employee.id}
                        employee={employee}
                        onUpdateEmployee={handleEditClick}
                        onDeleteEmployee={(id) => {
                            setEmployeeToDelete(id);
                            setIsConfirmModalOpen(true);
                        }}
                    />
                ))}
            </div>
            <div className="flex justify-center mt-4">
                <button
                    className="px-3 py-1 mx-1 bg-blue-500 text-white rounded"
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    Previous
                </button>
                <span className="px-3 py-1 mx-1 text-gray-700">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    className="px-3 py-1 mx-1 bg-blue-500 text-white rounded"
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    Next
                </button>
            </div>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                className="bg-white p-6 rounded shadow-md w-80"
            >
                <h2 className="mb-4 text-2xl font-semibold text-center">Edit Employee</h2>
                <form onSubmit={handleFormSubmit}>
                    <div className="mb-4">
                        <label className="block mb-1 text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            className="w-full px-3 py-2 border rounded"
                            value={formValues.name}
                            onChange={handleFormChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1 text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="w-full px-3 py-2 border rounded"
                            value={formValues.email}
                            onChange={handleFormChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1 text-gray-700">Contract Date</label>
                        <input
                            type="date"
                            name="contract_date"
                            className="w-full px-3 py-2 border rounded"
                            value={formValues.contract_date}
                            onChange={handleFormChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1 text-gray-700">Salary</label>
                        <input
                            type="number"
                            name="salary"
                            className="w-full px-3 py-2 border rounded"
                            value={formValues.salary}
                            onChange={handleFormChange}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className={`w-full px-3 py-2 text-white bg-blue-500 rounded ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Loading...' : 'Update'}
                    </button>
                </form>
            </Modal>
            <ConfirmationModal
                isOpen={isConfirmModalOpen}
                onRequestClose={() => setIsConfirmModalOpen(false)}
                onConfirm={handleDeleteEmployee}
                onCancel={() => setIsConfirmModalOpen(false)}
                message="Are you sure you want to delete this employee?"
            />
        </div>
    );
};

export default Employees;
