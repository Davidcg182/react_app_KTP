import React, { useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

    let user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
    }, [])

    const handleLogOut = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <>
       {
        user && (
        <div className="flex min-h-screen">
            <aside className="w-64 bg-gray-800 text-white">
                <div className="p-4">
                    <h2 className="text-2xl font-semibold">Panel general</h2>
                </div>
                <nav className="flex flex-col p-4">
                    <Link to="/" className="mb-2 px-4 py-2 hover:bg-gray-700 rounded">Tickets</Link>
                    <Link to="/employees" className="mb-2 px-4 py-2 hover:bg-gray-700 rounded">Empleados</Link>
                    <Link to="/userinfo" className="mb-2 px-4 py-2 hover:bg-gray-700 rounded">Mi Información</Link>
                </nav>
            </aside>
            <div className="flex-1 flex flex-col">
                <header className="bg-gray-900 text-white p-4 flex justify-between items-center">
                    <span>Bienvenido, {user.name}</span>
                    <button
                        className="px-4 py-2 text-white bg-red-500 rounded"
                        onClick={handleLogOut}
                    >
                        Cerrar sesion
                    </button>
                </header>
                <main className="flex-1 p-4">
                    <Outlet />
                </main>
            </div>
        </div>
    )}
    </>
    );
};

export default Dashboard;
