import React from 'react';

const UserInfo = () => {
    //   const userName = localStorage.getItem('userName'); // Assuming userName is stored in localStorage
    //   const userEmail = localStorage.getItem('userEmail'); // Assuming userEmail is stored in localStorage
    //QUITAR
    //QUITAR
    //QUITAR
    //QUITAR
    //QUITAR
    //QUITAR
    //QUITAR
    //QUITAR
    //QUITAR
    //QUITAR
    //QUITAR
    const userName = 'David Castillejo Guisao'
    const userEmail = 'david@mail.com'

    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gray-100">
            <h2 className="text-2xl font-semibold mb-4">Mi Información</h2>
            <p className="text-lg"><strong>Nombre:</strong> {userName}</p>
            <p className="text-lg"><strong>Email:</strong> {userEmail}</p>
        </div>
    );
};

export default UserInfo;
