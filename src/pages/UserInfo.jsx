import React from 'react';

const UserInfo = () => {

    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gray-100">
            <h2 className="text-2xl font-semibold mb-4">Mi Información</h2>
            <p className="text-lg"><strong>Nombre:</strong> {user.name}</p>
            <p className="text-lg"><strong>Email:</strong> {user.email}</p>
            <p className="text-lg"><strong>Fecha de inicio de contrato:</strong> {!user.contract_date ? '' : user.contract_date.split('T')[0]}</p>
            <p className="text-lg"><strong>Salario:</strong> {user.salary}</p>
            <p className="text-lg"><strong>Rol:</strong> {user.userType === '0' ? 'Administrador' : 'Normal'}</p>
        </div>
    );
};

export default UserInfo;
